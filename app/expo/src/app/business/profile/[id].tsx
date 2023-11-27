import React, { useCallback, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import { Model } from 'react-model';

import OperatingHourCard from '~/components/Card/owner/OperatingHoursCard';
import ProfileDescription from '~/components/Card/owner/ProfileDescriptionCard';
import BusinessDetailScreenSkeleton from '~/components/Skeleton/BusinessDetailSkeleton';
import {
  createSlideSchema,
  ImageSlider,
} from '~/components/Slider/ImageSlider';
import { GetBusinessDetailsDocument } from '~/graphql/generated';
import Back from '../../../../assets/images/back-icon.svg';

const BusinessProfile = () => {
  const { id, imageList } = useLocalSearchParams();

  const cardWidth = Dimensions.get('window').width * 0.9;

  const { loading, error, data } = useQuery(GetBusinessDetailsDocument, {
    variables: {
      poiId: id as string,
    },
  });

  const [{ useStore }] = useState(() =>
    Model(createSlideSchema(JSON.parse(imageList as string))),
  );
  const [state, actions] = useStore();

  const loadHandle = useCallback((i: number) => {
    actions.loaded(i);
  }, []);

  const handleBack = () => router.back();

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading && !data) {
    return (
      <View
        className="flex-1 items-center bg-white"
        testID="business-detail-loading"
      >
        <BusinessDetailScreenSkeleton />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView>
        {data && (
          <View className="items-center">
            <View className="h-80">
              <View
                className="absolute left-0 top-10 z-10 mx-4 flex-row items-center justify-between"
                style={{ width: cardWidth }}
              >
                <Back height={43} width={43} onPress={handleBack} />
                <TouchableOpacity
                  className="-mr-3 rounded-xl  bg-gray-300"
                  activeOpacity={0.9}
                >
                  <Text className="px-5 py-1.5 font-poppins-medium text-base text-slate-700">
                    Edit
                  </Text>
                </TouchableOpacity>
              </View>
              <Swiper
                loadMinimal
                loadMinimalSize={2}
                loop={true}
                activeDotColor="white"
              >
                {state.imgList.map((item, i) => (
                  <ImageSlider
                    loadHandle={loadHandle}
                    uri={item}
                    i={i}
                    key={i}
                    loaded={state.loadQueue[i]}
                  />
                ))}
              </Swiper>
              {data.poi.price !== '0' ? (
                <View className="absolute bottom-3 right-2 w-auto items-center rounded-xl bg-pink-100 px-3.5 py-1.5 shadow-md">
                  <Text className="font-poppins-semibold text-lg text-[#DE4D6C] ">
                    ₱{data.poi.price}
                  </Text>
                </View>
              ) : (
                <></>
              )}
            </View>
            <ProfileDescription
              businessName={data.poi.name}
              businessCategories={data.poi.categories.map((item) => item.name)}
              businessAddress={data.poi.address}
              businessContactNumber={data.poi.contactNumber}
              businessDescription={data.poi.description || ''}
            />
            {!data.poi.accommodation ? (
              <OperatingHourCard operatingHours={data.poi.operatingHours} />
            ) : (
              <></>
            )}
            {data.poi.restaurant ? (
              <View
                className="flex columns-2 "
                style={{
                  width: cardWidth,
                }}
              >
                <Text className="mb-2 mt-3 text-lg text-gray-600">
                  Dining Atmosphere
                </Text>
                <View className="flex flex-row flex-wrap">
                  {data.poi.restaurant.atmospheres.map((atmosphere) => (
                    <Text
                      className="font-poppins text-gray-600"
                      key={atmosphere}
                      style={{ width: '50%' }}
                    >
                      • {atmosphere}
                    </Text>
                  ))}
                </View>
              </View>
            ) : (
              <></>
            )}
            {data.poi.accommodation ? (
              <View
                className="flex columns-2 "
                style={{
                  width: cardWidth,
                }}
              >
                <Text className="mb-2 mt-3 text-lg text-gray-600">
                  Amenities
                </Text>
                <View className="flex flex-row flex-wrap">
                  {data.poi.accommodation.amenities.map((amenity) => (
                    <Text
                      className="font-poppins text-gray-600"
                      key={amenity.name}
                      style={{ width: '50%' }}
                    >
                      • {amenity.name}
                    </Text>
                  ))}
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'white',
  },
});

export default BusinessProfile;
