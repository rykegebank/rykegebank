import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Checkbox from "expo-checkbox";
import GenericInput from "../../components/GenericInput";
import GenericButton from "../../components/GenericButton";
import { TextInput } from "react-native-paper";
import { Routes } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/useAuth";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInParams } from "../../data/auth";

const loginSchema = z.object({
  username: z.coerce
    .string()
    .min(6, { message: "The username must be at least 6 characters." }),
  password: z.string().min(1),
});
const LoginScreen = () => {
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { login } = useAuth();
  const navigation = useNavigation();

  const onSubmit = (data: SignInParams) => {
    console.log(data);
    login(data);
  };

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignInParams>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    // defaultValues: {
    //   username: "rykegebank@gmail.com",
    //   password: "rykege123",
    // },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's sign you in.</Text>
      <Text style={styles.subtitle}>
        Welcome back, please enter your details
      </Text>

      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <GenericInput
            label="Username or Email"
            mode="outlined"
            value={value}
            style={styles.input}
            error={error?.message}
            onChangeText={onChange}
          />
        )}
        name="username"
        rules={{ required: true }}
      />

      <Controller
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <GenericInput
            label="Password"
            mode="outlined"
            value={value}
            secureTextEntry={!passwordVisible}
            right={
              <TextInput.Icon
                icon={passwordVisible ? "eye-off" : "eye"}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
            style={styles.input}
            error={error?.message}
            onChangeText={onChange}
          />
        )}
        name="password"
        rules={{ required: true }}
      />

      <View style={styles.row}>
        <View style={styles.checkboxContainer}>
          <Checkbox value={checked} onValueChange={setChecked} />
          <Text style={styles.checkboxLabel}>Remember Me</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.forgotPassword);
          }}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <GenericButton
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        style={styles.signInButton}
      >
        Sign In
      </GenericButton>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(Routes.register);
          }}
        >
          <Text style={styles.signUp}>Sign Up Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b6b6b",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#000",
    marginLeft: 10,
  },
  forgotPassword: {
    fontSize: 14,
    color: "#1e293b",
    textDecorationLine: "underline",
  },
  signInButton: {
    backgroundColor: "#1e293b",
    paddingVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#6b6b6b",
  },
  signUp: {
    fontSize: 14,
    color: "#1e293b",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
