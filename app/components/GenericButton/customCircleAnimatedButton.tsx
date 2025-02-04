import React, { useState } from 'react';
import { TouchableWithoutFeedback, View, Animated, Easing, GestureResponderEvent } from 'react-native';

interface CustomCircleAnimatedButtonProps {
    child: React.ReactNode;
    press: () => void;
    height: number;
    width: number;
    backgroundColor: string;
}

const CustomCircleAnimatedButton: React.FC<CustomCircleAnimatedButtonProps> = ({
    child,
    press,
    height,
    width,
    backgroundColor,
}) => {
    const [scale] = useState(new Animated.Value(1));

    const onTapDown = () => {
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const onTapUp = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableWithoutFeedback
            onPress={press}
            onPressIn={onTapDown}
            onPressOut={onTapUp}>
            <Animated.View
                style={{
                    height,
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: width / 2,
                    backgroundColor,
                    transform: [{ scale }],
                }}>
                {child}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default CustomCircleAnimatedButton;
