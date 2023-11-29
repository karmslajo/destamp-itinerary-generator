import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import BusinessHourSelector from '~/components/BusinessOperator/OperatingHours/TimeSelector';
import OpeningHourCheckbox from './OpeningHourCheckBox';

interface BusinessDayItemProps {
  day: string;
  id: number;
  onDelete: (id: number) => void;
}

const BusinessDayItem: React.FC<BusinessDayItemProps> = ({
  day,
  id,
  onDelete,
}) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null,
  );

  const handleStatusSelect = (status: string | null) => {
    console.log('Selected Status:', status);
    setSelectedStatus(status);
  };
  const handleDelete = () => {
    onDelete(id);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      }}
    >
      <View style={{ justifyContent: 'flex-start' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{ fontFamily: 'Poppins', fontSize: 18, color: '#FFBD59' }}
          >
            {day}
          </Text>
        </View>

        <OpeningHourCheckbox
          options={['24 HOURS OPEN', 'CLOSED']}
          onSelect={handleStatusSelect}
        />

        {/* Check the selected status before rendering BusinessHourSelector */}
        {selectedStatus !== '24 HOURS OPEN' && selectedStatus !== 'CLOSED' && (
          <BusinessHourSelector />
        )}
      </View>

      <View style={{ alignItems: 'center', marginLeft: 10 }}>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialIcons name="delete" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BusinessDayItem;
