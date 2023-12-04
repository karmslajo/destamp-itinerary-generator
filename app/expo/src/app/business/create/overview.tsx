import React from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import OverviewTag from '~/components/BusinessOperator/OverviewTag';
import GradientButton from '~/components/Button/GradientButton';

const OverviewPage = () => {
  const subTitleFontStyle = {
    fontFamily: 'Poppins',
    fontSize: 18,
    color: '#404040',
    padding: 10,
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Overview'} />
      <View style={{ alignItems: 'center', margin: 10 }}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: 20,
                color: '#FF8439',
                paddingLeft: 10,
              }}
            >
              Get started on your journey!
            </Text>

            <View style={{ margin: 5 }}>
              <Text style={subTitleFontStyle}>
                Complete your business details
              </Text>
              <View style={{ alignItems: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <OverviewTag
                    content={'Business Name'}
                    icon={<Ionicons name="business" size={24} color="white" />}
                  />
                  <OverviewTag
                    content={'Description'}
                    icon={<Entypo name="text" size={24} color="white" />}
                  />
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <OverviewTag
                    content={'Contact Number'}
                    icon={
                      <MaterialIcons name="contacts" size={24} color="white" />
                    }
                  />
                  <OverviewTag
                    content={'Address'}
                    icon={<Entypo name="location" size={24} color="white" />}
                  />
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <OverviewTag
                    content={'Operating Hours'}
                    icon={
                      <Ionicons
                        name="ios-time-outline"
                        size={24}
                        color="white"
                      />
                    }
                  />
                  <OverviewTag
                    content={'Price Range'}
                    icon={
                      <FontAwesome5 name="money-bill" size={24} color="white" />
                    }
                  />
                </View>
              </View>
            </View>
            <View style={{ margin: 5 }}>
              <Text style={subTitleFontStyle}>
                Identify your Establishment Type
              </Text>
              <View style={{ alignItems: 'center' }}>
                <OverviewTag
                  content={'Restaurant'}
                  icon={<Ionicons name="restaurant" size={24} color="white" />}
                />
                <OverviewTag
                  content={'Accommodation'}
                  icon={<FontAwesome name="hotel" size={24} color="white" />}
                />
                <OverviewTag
                  content={'Attraction'}
                  icon={
                    <MaterialIcons name="description" size={24} color="white" />
                  }
                />
              </View>
            </View>
            <View style={{ margin: 5 }}>
              <Text style={subTitleFontStyle}>
                Verify your business by uploading a valid ID and your business
                permit.
              </Text>
              {/* <View> */}

              <OverviewTag
                content={'Business Permit'}
                icon={<Ionicons name="ios-documents" size={24} color="white" />}
              />
            </View>
            <GradientButton
              onPress={() => router.push('/business/create/basicInformation')}
              title={'Get Started'}
              isSubmitting={false}
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
};

export default OverviewPage;