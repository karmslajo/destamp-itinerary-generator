import { Dimensions, Text, View } from 'react-native';

import { amountFormatter } from '~/utils/utils';
import Attraction from '../../../../assets/images/attraction.svg';
import Food from '../../../../assets/images/food.svg';
import Transportation from '../../../../assets/images/transportation.svg';

interface DayExpenseCardProps {
  attractionCost: number;
  foodCost: string;
  transportationCost: number;
  totalCost: number;
}

interface DayExpenseTextProps {
  value: string;
}

export default function DayExpenseCard({
  attractionCost,
  foodCost,
  transportationCost,
  totalCost,
}: DayExpenseCardProps) {
  const formatCurrency = (amount: number): string =>
    `₱${amountFormatter(amount)}`;

  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      className="mt-5 h-[75] rounded-2xl bg-pink-100 p-2"
      style={{ width: screenWidth / 1.13 }}
    >
      <View className="flex-row ">
        <Text className="m-1 font-poppins text-base text-gray-500">
          Day Expenses
        </Text>
        <Text className="absolute left-[260] m-1  font-poppins-medium text-base text-[#F65A82]">
          Total
        </Text>
      </View>
      <View className="flex-row items-center">
        <Attraction height={18} width={18} style={{ marginLeft: 3 }} />
        <DayExpenseText value={formatCurrency(attractionCost)} />
        <Food height={18} width={18} />
        <DayExpenseText value={foodCost} />
        <Transportation height={18} width={18} />
        <DayExpenseText value={formatCurrency(transportationCost)} />
        <Text className="absolute left-[265] font-poppins-medium text-base font-medium text-[#F65A82]">
          {formatCurrency(totalCost)}
        </Text>
      </View>
    </View>
  );
}

const DayExpenseText = ({ value }: DayExpenseTextProps) => {
  return (
    <Text className=" mx-2 font-poppins text-base text-gray-500 ">{value}</Text>
  );
};
