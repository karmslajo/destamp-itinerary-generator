import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useMutation } from '@apollo/client';
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import {
  ExpenseCategory,
  GetTripExpensesDocument,
  UpdateExpenseDocument,
} from '~/graphql/generated';
import { confirmationAlert } from '~/utils/utils';

interface TransactionsListItemProps {
  tripId: number;
  id: number;
  category: ExpenseCategory;
  date: string;
  note?: string | null;
  amount: number;
}

const TransactionsListItem = ({
  tripId,
  id,
  date,
  note,
  category,
  amount,
}: TransactionsListItemProps) => {
  const [expanded, setExpanded] = useState(false);

  const initial = {
    amount: amount.toString(),
  };
  const [isEditting, setIsEditting] = useState(false);
  const [value, setValue] = useState(initial);

  const handleEdittable = () => setIsEditting(true);

  const [updateAmount] = useMutation(UpdateExpenseDocument);

  const handleUpdateExpense = async (
    itineraryId: number,
    id: number,
    amount: string,
    category: ExpenseCategory,
    date: string,
    note: string,
  ) => {
    await updateAmount({
      variables: {
        expenseId: id,
        data: {
          amount: parseFloat(amount),
          category: category,
          dateSpent: new Date(date),
          note: note,
        },
      },
      onCompleted: () => {
        setIsEditting(false);
      },
      refetchQueries: [
        {
          query: GetTripExpensesDocument,
          variables: {
            tripId: tripId,
          },
        },
      ],
      onError: (err) => {
        setIsEditting(false);
        console.log(err.message);
      },
    });
  };

  const handleOnBlur = () => {
    if (initial.amount !== value.amount) {
      confirmationAlert(
        'Update amount',
        'Are you sure you want to save this changes?',
        'Yes',
        'Cancel',
        async () =>
          await handleUpdateExpense(
            tripId,
            id,
            value.amount,
            category,
            date,
            note || '',
          ),
      );
    } else {
      setIsEditting(false);
    }
  };

  return (
    <>
      <View className="flex-row items-center justify-between bg-[#ffffff] px-9 py-3">
        <View className="justify-center">
          <View className="flex-row">
            <View
              className="h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: categoryIcon[category]?.color }}
            >
              {categoryIcon[category]?.icon}
            </View>
            <TouchableOpacity
              className="flex-row"
              onPress={() => setExpanded(!expanded)}
            >
              <Text className="ml-2.5 mt-1 font-poppins text-base text-gray-600">
                {category.charAt(0) + category.slice(1).toLowerCase()}
              </Text>
              <View className="ml-2 mt-2">
                {expanded ? (
                  <AntDesign name="up" size={14} color="black" />
                ) : (
                  <AntDesign name="down" size={14} color="black" />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View className="ml-10 mt-1">
          {isEditting ? (
            <TextInput
              className="w-20 justify-center rounded-lg border border-gray-300 px-1 pb-1 text-right font-poppins text-lg text-gray-700"
              onBlur={handleOnBlur}
              onChangeText={(value) => setValue({ amount: value })}
              value={value.amount}
              inputMode="numeric"
            ></TextInput>
          ) : (
            <Text
              className="font-poppins text-lg text-gray-600"
              onPress={handleEdittable}
            >
              -₱{amount}
            </Text>
          )}
        </View>
      </View>
      {expanded ? (
        <Text className="ml-20 mr-8 bg-[#ffffff] text-xs text-gray-500">
          {note == '' || !note ? 'No note provided.' : note}
        </Text>
      ) : (
        <></>
      )}
    </>
  );
};

interface CategoryIcon {
  [key: string]: {
    color: string;
    icon: React.JSX.Element;
  };
}

const categoryIcon: CategoryIcon = {
  ACCOMMODATION: {
    color: '#C79BFF',
    icon: <Ionicons name="bed-outline" size={20} color="#FFFFFF" />,
  },
  FOOD: {
    color: '#FCA172',
    icon: <MaterialIcons name="local-dining" size={20} color="#FFFFFF" />,
  },
  SIGHTSEEING: {
    color: '#7EC2DF',
    icon: <Ionicons name="camera-outline" size={20} color="#FFFFFF" />,
  },
  TRANSPORTATION: {
    color: '#DF7E96',
    icon: <Ionicons name="bus-outline" size={20} color="#FFFFFF" />,
  },
  SHOPPING: {
    color: '#C2C38A',
    icon: (
      <MaterialCommunityIcons
        name="shopping-outline"
        size={20}
        color="#FFFFFF"
      />
    ),
  },
  ACTIVITY: {
    color: '#30E96D',
    icon: <MaterialIcons name="local-activity" size={20} color="#FFFFFF" />,
  },
  OTHER: {
    color: '#BE7B75',
    icon: <MaterialIcons name="receipt" size={20} color="#FFFFFF" />,
  },
};

export default TransactionsListItem;
