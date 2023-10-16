import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { tripDuration } from '../utils';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { calculateAveragePrice, getTotalDesiredTravelHours } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type Place = NexusGenObjects['Place'];

export const crossover = (
  chromosome1: Chromosome,
  chromosome2: Chromosome,
  tripInput: CreateTripInput,
) => {
  if (chromosome1.genes.length <= 1 || chromosome2.genes.length <= 1) {
    const chrom1 = chromosome1.genes;
    const chrom2 = chromosome2.genes;

    return { chrom1, chrom2 };
  }

  const middleIndex1 = Math.floor(chromosome1.genes.length / 2);
  const middleIndex2 = Math.floor(chromosome2.genes.length / 2);

  // combine two parents
  const firstParentHead = chromosome1.genes.slice(0, middleIndex1);
  const secondParentHead = chromosome2.genes.slice(0, middleIndex2);
  const firstParentTail = chromosome1.genes.slice(middleIndex1);
  const secondParentTail = chromosome2.genes.slice(middleIndex2);

  const newParent1 = firstParentHead.concat(secondParentTail);
  const newParent2 = secondParentHead.concat(firstParentTail);

  // evaluate crossovered parent
  const chrom1 = crossoverEval(newParent1, tripInput);
  const chrom2 = crossoverEval(newParent2, tripInput);

  return { chrom1, chrom2 };
};

export const crossoverEval = (spots: Place[], tripInput: CreateTripInput) => {
  const { budget, adultCount, childCount } = tripInput;

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  const rate = getBudgetAllocation(tripInput)!;

  const accommodationThreshold = budget * rate.ACCOMMODATION;
  const transporationThreshold = budget * rate.TRANSPORT;
  const foodThreshold = budget * rate.FOOD;

  const totalDesiredTravelHours = getTotalDesiredTravelHours(
    tripInput.preferredTime,
  );

  const estimatedTranspoDuration = tripInput.isTransportationIncluded
    ? duration * (totalDesiredTravelHours * rate.TRANSPORT)
    : 0;

  const totalTravelers = (adultCount || 0) + (childCount || 0);
  const durationThreshold =
    duration * totalDesiredTravelHours - estimatedTranspoDuration;

  const foodMaxDuration = durationThreshold * 0.3;

  let foodDuration = 0;
  let totalCost = 0;
  let totalDuration = 0;

  const budgets = {
    food: 0,
  };

  const chromosome: Place[] = [];

  for (const spot of spots) {
    if (
      totalDuration >= durationThreshold ||
      totalCost >= budget - (accommodationThreshold + transporationThreshold)
    ) {
      return chromosome;
    } else {
      if (spot.type === PlaceType.ATTRACTION) {
        const attractionCost = parseFloat(spot.price) * totalTravelers;
        const spotDuration = spot.visitDuration / 60;

        totalDuration += spotDuration;
        totalCost += attractionCost;
        chromosome.push(spot);
      }

      if (spot.type === PlaceType.RESTAURANT) {
        const averagePrice = calculateAveragePrice(spot.price);
        const foodCost = averagePrice * totalTravelers;
        const spotDuration = spot.visitDuration / 60;

        if (
          budgets.food + averagePrice <= foodThreshold &&
          foodDuration + spotDuration <= foodMaxDuration
        ) {
          budgets.food += foodCost;
          foodDuration += spotDuration;
          totalCost += foodCost;
          totalDuration += spotDuration;
          chromosome.push(spot);
        }
      }
    }
  }
  return chromosome;
};
