import React from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Colors, Dimensions, Strings } from '../../../constants';
import { useBalanceAnimation } from '../hooks/useBalanceAnimationHook';

interface BalanceAnimationContainerProps {
  amount: string;
  curSymbol: string;
}

const BalanceAnimationContainer = ({ amount, curSymbol }: BalanceAnimationContainerProps) => {
  const { isBalanceShown, isBalance, changeState, circlePosition, circleOpacity } = useBalanceAnimation();

  return (
    <TouchableOpacity onPress={changeState} style={styles.container}>
      <View style={styles.balanceContainer}>
        {isBalanceShown ? (
          <Text style={styles.balanceText}>
            {curSymbol} {amount}
          </Text>
        ) : (
          <Text style={styles.balanceText}>{Strings.balance}</Text>
        )}

        <Animated.View
          style={[
            styles.circle,
            {
              left: circlePosition,
              opacity: circleOpacity,
            },
          ]}
        >
          <Text style={styles.circleText}>{curSymbol}</Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 130,
    height: 28,
    paddingHorizontal: 5,
    borderRadius: 50,
    backgroundColor: Colors.colorWhite,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  balanceContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceText: {
    color: Colors.primaryColor,
    fontSize: Dimensions.fontDefault,
    fontWeight: '500',
  },
  circle: {
    position: 'absolute',
    top: '50%',
    marginTop: -10,
    width: 20,
    height: 20,
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: Colors.colorWhite,
    fontSize: Dimensions.fontLarge,
  },
});

export default BalanceAnimationContainer;
