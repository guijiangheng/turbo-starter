import { useSignIn } from "@clerk/clerk-expo";
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
import { authStyles } from "@/assets/styles/authStyles";

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    if (!emailAddress || !password) {
      Alert.alert("Error", "Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/");
      } else {
        Alert.alert("Error", "Sign in failed, please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors?.[0]?.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

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
              source={require("../../assets/images/i1.png")}
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
                onPress={onSignInPress}
                disabled={loading}
                activeOpacity={0.8}
              >
                <Text style={authStyles.buttonText}>
                  {loading ? "Signing In..." : "Sign In"}
                </Text>
              </TouchableOpacity>

              <View style={authStyles.linkContainer}>
                <Text style={authStyles.linkText}>
                  Don&apos;t have an account?{" "}
                  <Link style={authStyles.link} href="/sign-up">
                    Sign Up
                  </Link>
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
