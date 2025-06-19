import { authStyles } from "@/assets/styles/authStyles";
import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { COLORS } from "@/colors";
import { VerifyEmail } from "./verify-email";

export default function SignUpScreen() {
  const { isLoaded, signUp } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password)
      return Alert.alert("Error", "Please fill in all fields");
    if (password.length < 6)
      return Alert.alert("Error", "Password must be at least 6 characters");

    try {
      setLoading(true);
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert(
        "Error",
        err.errors?.[0]?.message || "Failed to create account",
      );
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification)
    return (
      <VerifyEmail
        email={emailAddress}
        onBack={() => setPendingVerification(false)}
      />
    );

  if (pendingVerification) {
    return (
      <VerifyEmail
        email={emailAddress}
        onBack={() => setPendingVerification(false)}
      />
    );
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        style={authStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={authStyles.imageContainer}>
            <Image
              source={require("../../assets/images/i2.png")}
              contentFit="contain"
              style={authStyles.image}
            />
          </View>

          <Text style={authStyles.title}>Welcome Back</Text>

          <View style={authStyles.formContainer}>
            <View style={authStyles.formContainer}>
              <View style={authStyles.inputContainer}>
                <TextInput
                  style={authStyles.textInput}
                  placeholder="Enter email"
                  placeholderTextColor={COLORS.textLight}
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={authStyles.inputContainer}>
                <TextInput
                  style={authStyles.textInput}
                  placeholder="Enter password"
                  placeholderTextColor={COLORS.textLight}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />

                <TouchableOpacity
                  style={authStyles.eyeButton}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color={COLORS.textLight}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={[
                  authStyles.authButton,
                  loading && authStyles.buttonDisabled,
                ]}
                onPress={onSignUpPress}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={authStyles.buttonText}>
                  {loading ? "Creating Account..." : "Sign Up"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={authStyles.linkContainer}
                onPress={() => router.back()}
              >
                <Text style={authStyles.linkText}>
                  Already have an account?{" "}
                  <Text style={authStyles.link}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
