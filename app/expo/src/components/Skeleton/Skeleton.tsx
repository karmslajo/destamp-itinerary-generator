import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SkeletonProps {
  width: number;
  height: number;
  style: object;
}
const Skeleton = ({ width, height, style }: SkeletonProps) => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: width,
        useNativeDriver: true,
        duration: 1_000,
      }),
    ).start();
  }, [width]);

  return (
    <View
      style={StyleSheet.flatten([
        {
          width: width,
          height: height,
          backgroundColor: 'rgba(0,0,0,0.10)',
          overflow: 'hidden',
        },
        style,
      ])}
    >
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          transform: [{ translateX: translateX }],
        }}
      >
        <LinearGradient
          style={{ width: '100%', height: '100%' }}
          colors={['transparent', 'rgba(0, 0, 0, 0.05)', 'transparent']}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

export default Skeleton;
