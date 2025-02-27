import React, { useEffect, useState } from "react";
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
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
import toasts from "../../logic/toasts";
import { fetchData, insertData, removeData } from "../../logic/token";
const loginSchema = z.object({
  username: z.string().min(6),
  password: z.string().min(6),
});

const LoginScreen = () => {
  const [checked, setChecked] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { login, isLoading, error } = useAuth();

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<SignInParams>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    // defaultValues: {
    //   username: "davete36@gmail.com",
    //   password: "Demo0302!!",
    // },
  });

  const onSubmit = (data: SignInParams) => {
    if (checked) {
      insertData("username", data.username);
    } else {
      removeData("username");
    }
    login(data);
  };

  useEffect(() => {
    const loadDefault = async () => {
      const username = await fetchData("username");
      if (username) {
        setValue("username", username);
      }
    };
    loadDefault();
  }, [setValue]);

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

      {error && <Text style={{ color: "red", marginBottom: 5 }}>{error}</Text>}
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
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
        title="Sign In"
      />

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

      {isLoading && (
        <LoadingIndicator isLoading={true} message="Logging in.." />
      )}
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
