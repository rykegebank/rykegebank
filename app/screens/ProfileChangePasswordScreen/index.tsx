import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import GenericInput from "../../components/GenericInput";
import { TextInput } from "react-native-paper";
import GenericButton from "../../components/GenericButton";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/core";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useChangeProfilePassword,
  useResetPassword,
} from "../../data/users/mutation";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
const required_field_error_msg = "This field is required";
const resetPasswordSchema = z
  .object({
    current_password: z.string(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must contains at least one uppercase, one lowercase, one number, one special character",
        }
      ),
    password_confirmation: z
      .string()
      .min(1, { message: required_field_error_msg }),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["password_confirmation"],
      });
    }
  });
const ProfileChangePasswordScreen = () => {
  const navigation = useNavigation();
  const changePassword = useChangeProfilePassword();

  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onSubmit",
  });
  const onSubmit = (data) => {
    changePassword.mutate({
      ...data,
    });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <EvilIcons
          name="arrow-left"
          size={24}
          color="#FFFFFF"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Reset Your Password</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Reset Your Password</Text>
        <Text style={styles.subtitle}>
          Your account is verified successfully. Now you can change your
          password.
        </Text>

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <GenericInput
              label="Current password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={!currentPasswordVisible}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={currentPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setCurrentPasswordVisible((e) => !e)}
                />
              }
              error={error?.message}
            />
          )}
          name="current_password"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <GenericInput
              label="Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={!passwordVisible}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={passwordVisible ? "eye-off" : "eye"}
                  onPress={() => setPasswordVisible((e) => !e)}
                />
              }
              error={error?.message}
            />
          )}
          name="password"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <GenericInput
              label="Confirm Password"
              value={value}
              onChangeText={onChange}
              secureTextEntry={!confirmPasswordVisible}
              style={styles.input}
              right={
                <TextInput.Icon
                  icon={confirmPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setConfirmPasswordVisible((e) => !e)}
                />
              }
              error={error?.message}
            />
          )}
          name="password_confirmation"
          rules={{ required: true }}
        />

        <GenericButton
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          title="Submit"
        />
      </View>
      {changePassword.isPending && (
        <LoadingIndicator isLoading={true} message="Logging in.." />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#1C2434",
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
});

export default ProfileChangePasswordScreen;
