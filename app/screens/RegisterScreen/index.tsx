import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import GenericInput from "../../components/GenericInput";
import GenericButton from "../../components/GenericButton";
import Checkbox from "expo-checkbox";
import { Icon, TextInput } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import GenericCard from "../../components/GenericCard";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchCountries } from "../../data/countries/queries";
import CountriesDropdown from "./components/CountriesDropdown";
import { SignUpParams, useSignUp } from "../../data/users/mutation";
import { useNavigation } from "@react-navigation/native";
import {
  getCountry,
  getCountryCode,
  getMobileCode,
} from "../../utils/countries";

interface RegistrationDetails extends SignUpParams {}

const registrationSchema = z
  .object({
    username: z.coerce
      .string()
      .min(6, { message: "The username must be at least 6 characters." }),
    email: z.coerce
      .string()
      .min(1, { message: "This field is required" })
      .email("This is not a valid email."),
    password: z.string().min(1),
    password_confirmation: z.string().min(1),
    country_code: z.string().min(1),
    mobile_code: z.string().min(1),
    mobile: z.string().min(1),
    country: z.string().min(1),
    agree: z.number(),
  })
  .superRefine(({ password_confirmation, password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const RegisterScreen = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const { data: countries, isLoading } = useFetchCountries();

  const navigation = useNavigation();
  const signUp = useSignUp();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<RegistrationDetails>({
    resolver: zodResolver(registrationSchema),
    mode: "onSubmit",
    defaultValues: {
      agree: 0,
    },
    // defaultValues: {
    //   username: "rykege123",
    //   password: "rykege123",
    //   password_confirmation: "rykege123",
    //   email: "rykegebank@gmail.com",
    //   country: "Philippines",
    //   country_code: "PH",
    //   mobile_code: "63",
    //   mobile: "9066870458",
    //   agree: 1,
    // },
  });

  const onSubmit = (data: RegistrationDetails) => {
    console.log(data);
    return;
    signUp.mutate(data);
  };

  if (isLoading) {
    return <></>;
  }
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <EvilIcons
          name="arrow-left"
          size={24}
          color="#ffffff"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={styles.headerTitle}>Sign Up</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.title}>Start your journey</Text>
        <Text style={styles.subtitle}>
          To create an account, please enter your valid information below
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <GenericInput
              label="Username"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              error={error?.message}
            />
          )}
          name="username"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <GenericInput
              label="Email"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              error={error?.message}
            />
          )}
          name="email"
          rules={{ required: true }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <CountriesDropdown
              label="Select a country"
              options={countries}
              selectedValue={value}
              onSelect={(newValue: string) => {
                onChange(getCountry(newValue));
                setValue("country_code", getCountryCode(newValue));
                setValue("mobile_code", getMobileCode(newValue));
              }}
              style={{ marginBottom: 16 }}
              error={error?.message}
            />
          )}
          name="country"
          rules={{ required: true }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <GenericInput
              label="Phone"
              value={value}
              onChangeText={onChange}
              style={styles.input}
              error={error?.message}
              keyboardType="numeric"
            />
          )}
          name="mobile"
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

        <View style={styles.checkboxContainer}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                value={value == 1}
                onValueChange={(value) => {
                  onChange(value ? 1 : 0);
                }}
              />
            )}
            name="agree"
            rules={{ required: true }}
          />

          <Text style={styles.checkboxText}>
            I agree with the{" "}
            <TouchableOpacity>
              <Text style={styles.linkText}>privacy & policies</Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>

      <GenericButton
        mode="contained"
        onPress={handleSubmit(onSubmit, (err) => {
          console.log(err);
        })}
        style={styles.signupButton}
        labelStyle={styles.signupButtonText}
      >
        Sign Up
      </GenericButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  contentContainer: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    padding: 16,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#757575",
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxText: {
    fontSize: 14,
    color: "#757575",
    marginLeft: 8,
    marginTop: 20,
  },
  linkText: {
    color: "#1a1f71",
    textDecorationLine: "underline",
  },
  signupButton: {
    backgroundColor: "#1e293b",
    marginTop: 8,
    width: "95%",
    alignSelf: "center",
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  formContainer: {
    padding: 10,
  },
});

export default RegisterScreen;
