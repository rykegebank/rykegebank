import { EvilIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import GenericInput from "../../components/GenericInput";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SubmitUserParams, useSubmitUser } from "../../data/profile/mutation";
import { useNavigation, useRoute } from "@react-navigation/core";
import useImagePicker from "../../hooks/useImagePicker";
import GenericError from "../../components/GenericError";
import usePermission from "../../hooks/usePermissions";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import LoadingIndicator from "../../components/LoadingIndicators/loadingIndicator";
import { useAppSelector } from "../../store";
import AppBar from "../../components/GenericAppBar";
interface ProfileDetails extends SubmitUserParams {}
const required_field_error_msg = "This field is required";
const profileSchema = z.object({
  firstname: z.string().min(1, { message: required_field_error_msg }),
  lastname: z.coerce.string().min(1, { message: required_field_error_msg }),
  address: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zip: z.string().optional(),
  image: z.string().optional(),
});

const CompleteProfileScreen = () => {
  const { shouldEdit = false } = useRoute().params || {};

  const { user } = useAppSelector((state) => state.user);
  const { requestPermission } = usePermission(
    Platform.OS === "android"
      ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
      : undefined
  );

  const submitProfile = useSubmitUser(shouldEdit);

  const { pickImageFromGallery, imageUri, error } = useImagePicker();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<ProfileDetails>({
    resolver: zodResolver(profileSchema),
    mode: "onSubmit",
    defaultValues: {
      image: undefined,
    },
  });

  const onProfileUpload = async () => {
    if (Platform.OS === "android") {
      if (await requestPermission()) {
        return pickImageFromGallery();
      }
    }
    pickImageFromGallery();
  };
  const onSubmitProfile = (data: ProfileDetails) => {
    submitProfile.mutate(data);
  };

  useEffect(() => {
    if (imageUri) {
      setValue("image", imageUri);
    }
  }, [imageUri, setValue]);

  return (
    <ScrollView style={styles.container}>
      <AppBar
        title={shouldEdit ? "Edit Profile" : "Profile Complete"}
        showBackButton={shouldEdit}
      />

      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: imageUri ?? "https://via.placeholder.com/100" }} // Placeholder image URL
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={onProfileUpload}>
            <EvilIcons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        {error && <GenericError message={"testset"} marginTop={12} />}
      </View>

      {/* Input Fields */}
      <View style={styles.form}>
        {[
          {
            placeholder: "First Name",
            name: "firstname",
            default: shouldEdit ? user.firstname : "",
          },
          {
            placeholder: "Last Name",
            name: "lastname",
            default: shouldEdit ? user.lastname : "",
          },
          {
            placeholder: "Address",
            name: "address",
            default: shouldEdit ? user.address?.address : "",
          },
          {
            placeholder: "State",
            name: "state",
            default: shouldEdit ? user.address?.state : "",
          },
          {
            placeholder: "City",
            name: "city",
            default: shouldEdit ? user.address?.city : "",
          },
          {
            placeholder: "Zip Code",
            name: "zip",
            default: shouldEdit ? user.address?.zip : "",
          },
        ].map((item, index) => {
          return (
            <Controller
              key={index}
              control={control}
              defaultValue={item.default}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <GenericInput
                  label={item.placeholder}
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                  error={error?.message}
                />
              )}
              name={item.name}
              rules={{ required: true }}
            />
          );
        })}
      </View>

      {/* Update Button */}
      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleSubmit(onSubmitProfile)}
      >
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>
      {submitProfile.isPending && (
        <LoadingIndicator isLoading={true} message="Logging in.." />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#1A2B49",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#1A2B49",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    paddingHorizontal: 16,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 12,
    fontSize: 16,
    color: "#000",
  },
  updateButton: {
    backgroundColor: "#1A2B49",
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default CompleteProfileScreen;
