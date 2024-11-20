import React, { useState } from 'react';
import { View, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';
import CustomText from '../../components/text/customText';
import { Dimensions } from '../../constants';

interface CircleAnimatedButtonWithTextProps {
    buttonName: string;
    child: React.ReactNode;
    onTap: () => void;
    height: number;
    width: number;
    backgroundColor: string;
}

const CircleAnimatedButtonText = ({
    buttonName,
    child,
    onTap,
    height,
    width,
    backgroundColor,
}: CircleAnimatedButtonWithTextProps) => {
    const [scale] = useState(new Animated.Value(1));


    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };


    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.center}>
            <TouchableWithoutFeedback onPress={onTap} onPressIn={onPressIn} onPressOut={onPressOut}>
                <Animated.View
                    style={[
                        styles.buttonContainer,
                        { height, width, backgroundColor, transform: [{ scale }] },
                    ]}
                >
                    <View style={styles.buttonContent}>{child}</View>
                    <CustomText style={styles.text}> {buttonName} </CustomText>

                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 10,
        textAlign: 'center',
    },
});

export default CircleAnimatedButtonText;
