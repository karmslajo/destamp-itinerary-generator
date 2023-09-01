import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { Entypo } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from 'config/initSupabase';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import {
  CreateUserDocument,
  MutationCreateUserArgs,
  UserType,
} from '~/graphql/generated';
import GradientButton from '../Button/GradientButton';
import ShowPasswordIcon from '../Icon/ShowPasswordIcon';
import { CustomTextInput } from './CustomTextInput';
import { SignUpSchema, signUpSchema } from './schema/signupSchema';

export const CreateUser = gql(
  `mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
    }
  }`,
);

export default function SignUpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const { handleSubmit, control } = useForm<SignUpSchema>({
    mode: 'onBlur',
    resolver: zodResolver(signUpSchema),
  });

  const [createProgram] = useMutation(CreateUserDocument);

  const onSubmit: SubmitHandler<SignUpSchema> = async (input) => {
    setIsSubmitting(true);

    const { error, data } = await supabase.auth.signUp({
      email: input.email,
      password: input.password,
    });

    if (error) Alert.alert('Sign Up Error', error.message);
    else {
      const createUserInput: MutationCreateUserArgs = {
        data: {
          id: data.user!.id,
          userType: UserType.Traveler,
          email: input.email,
          password: input.password,
        },
      };

      await createProgram({
        variables: {
          data: createUserInput.data,
        },
        onError: (err) => {
          Alert.alert('Error', err.message);
        },
      });

      setIsSubmitting(false);
    }
  };

  return (
    <View className="items-center">
      <Controller
        control={control}
        name="email"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View>
              <CustomTextInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                errorMessage={error?.message}
              />
            </View>
          );
        }}
      />
      <Controller
        control={control}
        name="password"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View className="flex-row">
              <CustomTextInput
                placeholder="Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={error?.message}
                secureTextEntry={hidePassword}
              />
              <ShowPasswordIcon
                hidePassword={hidePassword}
                onPress={() => setHidePassword(!hidePassword)}
              />
            </View>
          );
        }}
      />
      <Controller
        control={control}
        name="confirmPassword"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View className="flex-row">
              <CustomTextInput
                placeholder="Confirm Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={error?.message}
                secureTextEntry={hideConfirmPassword}
              />
              <ShowPasswordIcon
                hidePassword={hideConfirmPassword}
                onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
              />
            </View>
          );
        }}
      />
      <View className="mb-12 items-center">
        <GradientButton
          onPress={handleSubmit(onSubmit)}
          title="Login"
          isSubmitting={isSubmitting}
        />
      </View>
      <Text className="mb-1 text-lg font-normal text-gray-500">
        Or login with
      </Text>
    </View>
  );
}
