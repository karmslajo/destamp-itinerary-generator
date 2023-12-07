import React, { useEffect } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { ClerkProvider } from '@clerk/clerk-expo';
import { AntDesign } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { supabase } from 'config/initSupabase';
import { fetch } from 'cross-fetch';

import { AuthProvider } from '~/context/AuthProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const URL = 'https://cpu-destamp.onrender.com';

// const LOCAL_SYSTEM_IP_ADDRESS = '10.10.10.17';
// const PORT = 4000;

const client = new ApolloClient({
  link: createHttpLink({
    uri: `${URL}/graphql`,
    // uri: `http://${LOCAL_SYSTEM_IP_ADDRESS}:${PORT}/graphql`,
    fetch,
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          trips: {
            merge(_, incoming) {
              return incoming;
            },
          },
          trip: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

const handleLogout = async () => {
  // added temp logout button
  return await supabase.auth.signOut();
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsThin: require('../../assets/fonts/Poppins-Thin.ttf'),
    PoppinsMedium: require('../../assets/fonts/Poppins-Medium.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsBlack: require('../../assets/fonts/Poppins-Black.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsExtraBold: require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AutocompleteDropdownContextProvider>
        <AuthProvider>
          <ClerkProvider
            publishableKey={
              Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string
            }
          >
            <ApolloProvider client={client}>
              <Stack>
                <Stack.Screen
                  name="business/index"
                  options={{
                    title: 'My Business',
                    headerTitleStyle: {
                      fontSize: 25,
                      fontFamily: 'Poppins',
                    },
                    headerBackVisible: false,
                    headerRight: () => {
                      return (
                        <View className="rounded-full p-0.5">
                          <TouchableOpacity
                            onPress={() => {
                              Alert.alert(
                                'Logout',
                                'Are you sure you want to logout?',
                                [
                                  {
                                    text: 'Cancel',
                                    onPress: () =>
                                      console.log('Cancel Pressed'),
                                    style: 'cancel',
                                  },
                                  { text: 'Yes', onPress: handleLogout },
                                ],
                              );
                            }}
                          >
                            <AntDesign name="logout" size={24} color="black" />
                          </TouchableOpacity>
                        </View>
                      );
                    },
                  }}
                />
                <Stack.Screen
                  name="(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
            </ApolloProvider>
          </ClerkProvider>
        </AuthProvider>
      </AutocompleteDropdownContextProvider>
    </ThemeProvider>
  );
}

export { RootLayoutNav };
