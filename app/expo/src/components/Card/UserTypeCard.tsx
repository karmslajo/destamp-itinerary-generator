import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TravelGroupCardProps {
  selectedIcon?: React.ReactNode;
  unselectedIcon?: React.ReactNode;
  title: string;
  isSelected: boolean;
  onPress: () => void;
}

export default function UserTypeCard({
  selectedIcon,
  unselectedIcon,
  title,
  isSelected,
  onPress,
}: TravelGroupCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        className={`mb-6 mt-2 h-[70] w-[150] items-center justify-center rounded-xl border-2 ${
          isSelected ? 'border-orange-500' : 'border-gray-300'
        } `}
      >
        {isSelected ? selectedIcon : unselectedIcon}
        <Text
          className={`font-poppins-medium text-xs ${
            isSelected ? 'text-orange-500' : 'text-gray-400'
          }`}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
