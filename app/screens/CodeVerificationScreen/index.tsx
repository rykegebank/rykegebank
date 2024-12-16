import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import GenericInput from "../../components/GenericInput";
import GenericButton from "../../components/GenericButton";
import GenericCard from "../../components/GenericCard";
import { useNavigation, useRoute } from "@react-navigation/core";
import { Routes } from "../../constants";
import { Controller, useForm } from "react-hook-form";
import {
  useVerifyCode,
  useVerifyEmail,
  useVerifySms,
  useResendSms
} from "../../data/users/mutation";
import { useAppSelector } from "../../store";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";

const CodeVerificationScreen = () => {
  const { forForgotPassword } = useRoute().params || {
    forForgotPassword: false,
  };

  const { ev, sv, email, mobile, timer } = useAppSelector((state) => state.user);

  const navigation = useNavigation();

  const verifyCode = useVerifyCode(); //forgot password verification

  const verifyEmail = useVerifyEmail();

  const verifySms = useVerifySms();

  const resendSms = useResendSms();


  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const otp = data.otp.join("");
    if (forForgotPassword) {
      // for password verification
      console.log("verifying password code...");
      const test = await verifyCode.mutate({
        code: otp,
        email: email,
      });
      console.log("zxczczxc", test);
    } else if (ev === 0) {
      console.log("verifying email...");
      verifyEmail.mutate({
        code: otp,
      });
    } else if (sv === 0) {
      console.log("verifying sms...");
      verifySms.mutate({
        code: otp,
      });
    }
  };


  const onResend = async (data: any) => {
    console.log("resending sms...");
    resendSms.mutate({
      value: email,
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <EvilIcons
          name="arrow-left"
          size={24}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Password Verification</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Icon Section */}
        <GenericCard style={styles.iconContainer}>
          <EvilIcons name="sc-facebook" size={48} color="#37474F" />
        </GenericCard>

        {/* Instruction Text */}
        <Text style={styles.instructionText}>
          A 6 digits verification code sent to your{" "}
          {sv === 0 ? "mobile number" : "email address"}:
          <Text style={styles.emailText}> {sv === 0 ? mobile : email}</Text>
        </Text>

        {/* OTP Input Fields */}
        <View style={styles.otpContainer}>
          {[...Array(6)].map((_, index) => (
            <Controller
              key={index}
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextInput
                  style={styles.otpInput}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  maxLength={1}
                />
              )}
              name={`otp[${index}]`}
              defaultValue=""
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^[0-9]{1}$/,
                  message: "Enter a valid digit",
                },
              }}
            />
          ))}
        </View>
        {errors.otp && (
          <Text style={styles.errorText}>
            Please enter a valid 6-digit OTP.
          </Text>
        )}
        {/* Verify Button */}

        <View style={styles.verifyButton}>
          <GenericButton onPress={handleSubmit(onSubmit)} title="Verify" />
        </View>
        {/* Resend Text */}
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn’t receive the code? </Text>
          <TouchableOpacity onPress={timer == 0 ? onResend : undefined}>
            <Text style={styles.resendLink}>{timer == 0 ? 'Resend' : timer}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {(verifyCode.isPending ||
        verifyEmail.isPending ||
        verifySms.isPending) && (
        <LoadingIndicator isLoading={true} message="Logging in.." />
      )}
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

export default CodeVerificationScreen;
