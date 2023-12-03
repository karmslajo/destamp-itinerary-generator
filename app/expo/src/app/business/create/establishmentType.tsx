import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Questions from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import EstablishmentTypeButton from '~/components/Button/EstablishmentTypeButton';

const EstablishmentType = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
  };
  const handleContinue = () => {
    if (!selectedType) {
      return;
    }

    if (selectedType === 'Accommodation') {
      router.push('/business/create/accommodationFacilities');
      console.log('Redirect to accommodation facilities');
    } else if (selectedType === 'Attraction') {
      router.push('/business/create/attractionActivities');
      console.log('Redirect to attraction activities');
    } else if (selectedType === 'Restaurant') {
      router.push('/business/create/restaurantFacilities');
      console.log('Redirect to restaurant facilities');
    }
  };

  return (
    <View>
      <CreateBusinessHeader title={'Establishment Type'} />
      <View style={{ alignItems: 'center' }}>
        <SafeAreaView>
          <View style={{ marginBottom: 30 }}>
            <Questions question={'What type of place is this?'} />
            <EstablishmentTypeButton
              label="Accommodation"
              onSelect={() => handleTypeSelection('Accommodation')}
              isSelected={selectedType === 'Accommodation'}
            />
            <EstablishmentTypeButton
              label="Attraction"
              onSelect={() => handleTypeSelection('Attraction')}
              isSelected={selectedType === 'Attraction'}
            />
            <EstablishmentTypeButton
              label="Restaurant"
              onSelect={() => handleTypeSelection('Restaurant')}
              isSelected={selectedType === 'Restaurant'}
            />
          </View>
          <BasicButton title={'Continue'} onPress={handleContinue} />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default EstablishmentType;
