import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GenericButton from "../../components/GenericButton";
import GenericCard from "../../components/GenericCard";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Controller, useForm } from "react-hook-form";
import { useOtpActions } from "./hooks/mutation";
import { useAppSelector } from "../../store";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
import AppBar from "../../components/GenericAppBar";
import { Colors, Dimensions, Routes } from "../../constants";

const OtpScreen = () => {
    const { params } = useRoute();
    const { nextPageRoute = "", otpId = "", otpType = "" } = params || {};
    const { submitOtpMutation, resendOtpMutation, setOtpDetails } = useOtpActions();

    const { resendLoading, submitLoading } = useAppSelector((state) => state.otp);
    const { email, mobile } = useAppSelector((state) => state.user);
    const otpRefs = Array(6).fill(null);
    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        setOtpDetails(nextPageRoute, otpId, otpType);
        console.log('otpId', otpId)
    }, [nextPageRoute, otpId, otpType]);

    const [timer, setTimer] = useState(120);

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const onSubmit = async (data: any) => {
        const otp = data.otp.join("");
        submitOtpMutation.mutate({ otp: otp, otpID: otpId });
    };

    const onResend = async () => {
        resendOtpMutation.mutate();
        setTimer(120);
    };

    return (
        <View style={styles.container}>
            <AppBar
                title="OTP"
                centerTitle
                showBackButton={true}
                backgroundColor={Colors.primaryColor}
            />

            <View style={styles.content}>
                <GenericCard style={styles.iconContainer}>
                    <MaterialCommunityIcons name="lock" size={48} color="#37474F" />
                </GenericCard>

                <Text style={styles.instructionText}>
                    A 6 digits verification code sent to your{" "}
                    {otpType === 'sms' ? "mobile number" : "email address"}:
                    <Text style={styles.emailText}> {otpType === 'sms' ? mobile : email}</Text>
                </Text>

                <View style={styles.otpContainer}>
                    {[...Array(6)].map((_, index) => (
                        <Controller
                            key={index}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    ref={(ref) => (otpRefs[index] = ref)}
                                    style={styles.otpInput}
                                    value={value}
                                    onChangeText={(text) => {
                                        if (text.length > 1) return;
                                        onChange(text);

                                        if (text && index < 5) {
                                            otpRefs[index + 1]?.focus();
                                        }
                                        if (!text && index > 0) {
                                            otpRefs[index - 1]?.focus();
                                        }
                                    }}
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === "Backspace" && !value && index > 0) {
                                            otpRefs[index - 1]?.focus();
                                        }
                                    }}
                                    keyboardType="numeric"
                                    maxLength={1}
                                />
                            )}
                            name={`otp[${index}]`}
                            defaultValue=""
                            rules={{
                                required: "This field is required",
                                pattern: { value: /^[0-9]{1}$/, message: "Enter a valid digit" },
                            }}
                        />
                    ))}
                </View>

                {errors.otp && <Text style={styles.errorText}>Please enter a valid 6-digit OTP.</Text>}

                <View style={styles.verifyButton}>
                    <GenericButton onPress={handleSubmit(onSubmit)} title="Verify" />
                </View>
                <View style={styles.resendContainer}>
                    <Text style={styles.resendText}>Didn’t receive the code? </Text>
                    <TouchableOpacity onPress={timer === 0 ? onResend : undefined}>
                        <Text style={styles.resendLink}>{timer === 0 ? 'Resend' : `${timer}s`}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {(resendLoading || submitLoading) && <LoadingIndicator isLoading={true} message="Processing..." />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E2A38",
        padding: 16,
    },
    headerText: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    content: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F1F3F4",
        marginBottom: 20,
    },
    instructionText: {
        fontSize: 14,
        textAlign: "center",
        color: "#37474F",
        marginBottom: 24,
    },
    emailText: {
        fontWeight: "bold",
    },
    otpContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 24,
        width: "100%",
    },
    otpInput: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 8,
        margin: 5,
        textAlign: "center",
        fontSize: 18,
    },
    verifyButton: {
        width: "100%",
        height: 48,
        justifyContent: "center",
        marginBottom: 16,
        backgroundColor: "#1E2A38",
    },
    resendContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    resendText: {
        fontSize: 14,
        color: "#37474F",
    },
    resendLink: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1E88E5",
    },
    errorText: {
        color: "red",
        marginBottom: 8,
    },
});

export default OtpScreen;
