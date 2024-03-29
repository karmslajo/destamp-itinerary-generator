import { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Moment } from 'moment';

import { dateFormmater } from '~/utils/utils';

interface DateRangePickerProps {
  onDateChange: (startDate: Moment | null, endDate: Moment | null) => void;
  maxDuration: number;
}

export default function DateRangePicker({
  maxDuration,
  onDateChange,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const minDate = new Date();

  const handleChange = (date: Moment, type: 'START_DATE' | 'END_DATE') => {
    if (type === 'END_DATE') {
      setEndDate(date);
      onDateChange(startDate, date);
    } else {
      setStartDate(date);
      setEndDate(null);
      onDateChange(date, endDate);
    }
  };

  const daysDifference = endDate ? endDate.diff(startDate, 'days') + 1 : 1;

  const screenWidth = Dimensions.get('window').width;

  return (
    <View className="flex-row items-center justify-between">
      <View className="mr-10 flex-1" style={{ height: screenWidth / 1.2 }}>
        <CalendarPicker
          minDate={minDate}
          maxRangeDuration={maxDuration}
          allowRangeSelection={true}
          onDateChange={handleChange}
          todayBackgroundColor="#F6CAD4"
          scaleFactor={340}
          selectedDayColor="#FC8040"
          selectedDayTextColor="#FFFFFF"
          previousTitleStyle={{ fontSize: 14, marginLeft: 18 }}
          nextTitleStyle={{ fontSize: 14, marginRight: 18 }}
          width={screenWidth / 1.4}
          height={350}
        />
        <View className="top-2 flex-row justify-center">
          <Text className="font-poppins text-base text-gray-600">
            {endDate && startDate && !startDate.isSame(endDate)
              ? `${dateFormmater(startDate?.toISOString())} - ${dateFormmater(
                  endDate.toISOString(),
                )}`
              : startDate && (!endDate || startDate.isSame(endDate))
              ? dateFormmater(startDate.toISOString())
              : ''}
          </Text>
          <Text className="font-poppins text-base text-gray-600">
            {startDate
              ? ` • ${daysDifference} ${daysDifference! > 1 ? 'days' : 'day'}`
              : ''}
          </Text>
        </View>
      </View>
    </View>
  );
}
