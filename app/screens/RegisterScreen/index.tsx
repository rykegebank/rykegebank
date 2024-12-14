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
const required_field_error_msg = "This field is required";
const registrationSchema = z
  .object({
    username: z
      .string()
      .min(6, { message: "The username must be at least 6 characters." }),
    email: z.coerce
      .string()
      .min(1, { message: required_field_error_msg })
      .email("This is not a valid email."),
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
    mobile: z.string().min(1, { message: required_field_error_msg }),
    country_code: z.string().min(1),
    mobile_code: z.string().min(1),
    country: z.string().min(1),
    agree: z.number(),
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
    // defaultValues: {
    //   agree: 1,
    //   country: "Philippines",
    //   country_code: "PH",
    //   email: "lorencehernandez97@gmail.com",
    //   mobile: "9066870459",
    //   mobile_code: "63",
    //   password: "Lorence1@",
    //   password_confirmation: "Lorence1@",
    //   username: "lorence1234",
    // },
  });

  const onSubmit = (data: RegistrationDetails) => {
    console.log("Registering: " + data);
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
                color={"#1e293b"}
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
            <Text style={styles.linkText}>Privacy & Policies</Text>
          </Text>
        </View>
      </View>

      <GenericButton
        disabled={!isValid}
        onPress={handleSubmit(onSubmit)}
        title="Sign Up"
      />
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
    marginBottom: 8,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: "#757575",
    marginLeft: 8,
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
