import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native';

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
                </Animated.View>
            </TouchableWithoutFeedback>
            <Text style={styles.text}>{buttonName}</Text>
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
        color: '#000',
        fontWeight: '500',
    },
});

export default CircleAnimatedButtonText;
