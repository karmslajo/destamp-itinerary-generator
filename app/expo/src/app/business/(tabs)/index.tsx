import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import BusinessCard from '~/components/Card/owner/BusinessCard';
import MyBusinessEmptyState from '~/components/EmptyState/MyBusinessEmptyState';
import BusinessScreenSkeleton from '~/components/Skeleton/BusinessListSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import { GetBusinessesDocument } from '~/graphql/generated';

const BusinessListScreen = () => {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GetBusinessesDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading && !data) {
    return (
      <View
        className="flex-1 items-center bg-white"
        testID="my-business-loading"
      >
        <BusinessScreenSkeleton />
      </View>
    );
  }

  if (!loading && data && data.pois.length <= 0) {
    return <MyBusinessEmptyState />;
  }

  return (
    <View className="flex-1 items-center bg-white">
      {data && (
        <FlatList
          testID="my-business-list"
          data={data.pois}
          renderItem={({ item, index }) => (
            <BusinessCard
              businessId={item.id}
              businessName={item.name}
              businessImages={item.images.map((item) => item.image.url)}
              businessAddress={item.address}
              businessIsVerified={
                data.pois[index]?.businessPermit?.isVerified || false
              }
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AbsoluteButton
        title="+"
        onPress={() => router.push('/business/create/establishmentType')}
        style={{ bottom: 40 }}
      />
    </View>
  );
};

export default BusinessListScreen;