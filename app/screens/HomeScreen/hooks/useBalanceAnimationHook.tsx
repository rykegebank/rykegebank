import { useState, useEffect } from 'react';
import { Animated } from 'react-native';

interface UseBalanceAnimationResult {
  isBalanceShown: boolean;
  isBalance: boolean;
  changeState: () => void;
  circlePosition: Animated.Value;
  circleOpacity: Animated.Value;
}

export const useBalanceAnimation = (): UseBalanceAnimationResult => {
  const [isBalanceShown, setIsBalanceShown] = useState(false);
  const [isBalance, setIsBalance] = useState(true);
  const [isAnimation, setIsAnimation] = useState(false);
  const [taskStart, setTaskStart] = useState(false);

  const circlePosition = useState(new Animated.Value(3))[0]; 
  const circleOpacity = useState(new Animated.Value(1))[0]; 

  useEffect(() => {
    if (isAnimation) {
      Animated.sequence([
        Animated.timing(circlePosition, {
          toValue: 135,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(circleOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.delay(2000),
        Animated.timing(circleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(circlePosition, {
          toValue: 5,
          duration: 1000,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsAnimation(false);
        setTaskStart(false);
      });
    }
  }, [isAnimation, circlePosition, circleOpacity]);

  const changeState = () => {
    if (isAnimation || taskStart) return;

    setTaskStart(true);
    setIsAnimation(true);
    setIsBalance(false);

    setTimeout(() => {
      setIsBalanceShown(true);
    }, 500);

    setTimeout(() => {
      setIsBalanceShown(false);
    }, 3500);

    setTimeout(() => {
      setIsBalance(true);
    }, 1000);
  };

  return {
    isBalanceShown,
    isBalance,
    changeState,
    circlePosition,
    circleOpacity,
  };
};
