import { PointOfInterest } from '.';
import { NexusGenInputs } from '../../graphql/generated/nexus';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { Chromosome as Chrom } from './types';
import { calculateAveragePrice } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

const POPULATION_SIZE = 2;
const MAX_ITERATIONS = 15; // max number of iterations

export function generatePopulation(
  isPremium: boolean,
  hasPreference: boolean,
  input: CreateTripInput,
  pois: PointOfInterest[],
  duration: number,
  desiredTravelHours: number,
) {
  const { budget, travelerCount, isFoodIncluded } = input;

  const rate = getBudgetAllocation(input)!;

  const dailyBudget = budget / duration;

  const accommdationCostThreshold = dailyBudget * rate.ACCOMMODATION;
  const transportationCostThreshold = dailyBudget * rate.TRANSPORT;

  const estimatedTravelDuration = desiredTravelHours * rate.TRANSPORT;

  const targetCost =
    dailyBudget - (accommdationCostThreshold + transportationCostThreshold);
  const targetDuration = desiredTravelHours - estimatedTravelDuration;

  const newPopulation: Chrom[] = []; // placeholder for initialized population

  let restaurants = pois.filter((poi) => poi.restaurant);
  let attractions = pois.filter((poi) => poi.isAttraction);

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let totalDuration = 0;
    let totalCost = 0;

    const chromosome: PointOfInterest[] = []; // list of destinations within budget and timeframe

    while (
      totalDuration <= targetDuration &&
      totalCost <= targetCost &&
      chromosome.length < MAX_ITERATIONS
    ) {
      const attraction = pickPOI(
        attractions,
        isPremium,
        hasPreference,
      ).pickedPOI;
      const restaurant = pickPOI(
        restaurants,
        isPremium,
        hasPreference,
      ).pickedPOI;

      attractions = pickPOI(
        attractions,
        isPremium,
        hasPreference,
      ).remainingPOIs;
      restaurants = pickPOI(
        restaurants,
        isPremium,
        hasPreference,
      ).remainingPOIs;

      if (!restaurant && !attraction) {
        break;
      }

      if (restaurant) {
        if (isFoodIncluded) {
          const foodCost =
            calculateAveragePrice(restaurant.price) * travelerCount;
          const poiDuration = restaurant.visitDuration / 60;

          totalCost += foodCost;
          totalDuration += poiDuration;
          chromosome.push(restaurant);
        }
      }

      if (attraction) {
        const attractionCost = parseFloat(attraction.price) * travelerCount;
        const poiDuration = attraction.visitDuration / 60;

        totalCost += attractionCost;
        totalDuration += poiDuration;
        chromosome.push(attraction);
      }

      if (totalCost > targetCost && totalDuration > targetDuration) {
        break;
      }
    }

    newPopulation.push({
      chrom: new Chromosome(chromosome),
      fitnessScore: 0,
      travelDuration: 0,
      travelExpenses: 0,
      travelDistances: [],
      travelDurations: [],
    });

    totalDuration = 0;
    totalCost = 0;
  }
  return newPopulation;
}

function pickPOI(
  pois: PointOfInterest[],
  isPremium: boolean,
  hasPreference: boolean,
) {
  const poisCopy = [...pois];
  let pickedPOI;
  if (isPremium && hasPreference) {
    pickedPOI = poisCopy[0];
    poisCopy.splice(0, 1);
  } else {
    const randomIndex = Math.floor(Math.random() * pois.length);
    pickedPOI = poisCopy.splice(randomIndex, 1)[0];
  }
  return { pickedPOI, remainingPOIs: poisCopy };
}
