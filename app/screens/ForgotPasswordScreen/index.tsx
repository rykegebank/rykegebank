import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text } from "react-native-paper";
import GenericButton from "../../components/GenericButton";
import GenericInput from "../../components/GenericInput";
import { useNavigation } from "@react-navigation/native";
import { EvilIcons } from "@expo/vector-icons";
import { useForgotPassword } from "../../data/users/mutation";
import { Controller, useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";

interface ForgotPasswordDetails {
  value: string;
}

const forgotPasswordSchema = z.object({
  value: z.string().min(1, { message: "This field is required" }),
});

const ForgotPasswordScreen = () => {
  const navigation = useNavigation();
  const forgotPassword = useForgotPassword();

  const onSubmit = (data: ForgotPasswordDetails) => {
    forgotPassword.mutate({
      value: data.value,
    });
  };
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<ForgotPasswordDetails>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    // defaultValues: {
    //   value: "lorencehernandez97@gmail.com",
    // },
  });
  return (
    <View style={styles.container}>
      {/* Appbar */}
      <View style={styles.header}>
        <EvilIcons
          name="arrow-left"
          size={24}
          color="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Forgot Password</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Recover Account</Text>
        <Text style={styles.subtitle}>
          Enter your email or username below to receive a password reset
          verification code
        </Text>

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <GenericInput
              label="Username or Email"
              mode="outlined"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              error={error?.message}
            />
          )}
          name="value"
          rules={{ required: true }}
        />

        <GenericButton
          disabled={!isValid}
          onPress={handleSubmit(onSubmit)}
          title="Submit"
        />
      </View>
      {forgotPassword.isPending && (
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  input: {
    marginBottom: 24,
  },
  submitButton: {
    backgroundColor: "#1e293b", // Dark blue color
    borderRadius: 4,
    paddingVertical: 8,
  },
});

export default ForgotPasswordScreen;
