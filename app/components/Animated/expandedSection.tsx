import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

interface ExpandedSectionProps {
  children: React.ReactNode;
  expand: boolean;
  duration?: number;
  maxHeight?: number;
}

const ExpandedSection: React.FC<ExpandedSectionProps> = ({
  children,
  expand = false,
  duration = 500,
  maxHeight = 200,
}) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (expand) {
      Animated.timing(animation, {
        toValue: 1,
        duration,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start();
    }
  }, [expand, animation, duration]);

  const animatedStyle = {
    height: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, maxHeight],
    }),
  };

  return <Animated.View style={[styles.container, animatedStyle]}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
});

export default ExpandedSection;
