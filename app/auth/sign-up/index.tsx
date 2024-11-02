import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useState } from "react";
import { useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { auth } from "../../../configs/FirebaseConfig";

import AntDesign from "@expo/vector-icons/AntDesign";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const OnCreateAccount = (): void => {
    if (!email && !password && !fullName) {
      ToastAndroid.show("Please enter all details", ToastAndroid.BOTTOM);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        router.replace("/mytrip");
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode);
        // ..
      });
  };

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 50,
        backgroundColor: Colors.WHITE,
        height: "100%",
      }}
    >
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()}>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontFamily: "roboto-bold", fontSize: 30, marginTop: 30 }}>
        Create New Account
      </Text>

      {/* User Full Name */}
      <View style={{ marginTop: 50 }}>
        <Text style={{ fontFamily: "roboto-regular" }}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Full Name"
          onChangeText={(value) => setFullName(value)}
        />
      </View>

      {/* Email */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "roboto-regular" }}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      {/* Password */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontFamily: "roboto-regular" }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter Password"
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={OnCreateAccount}
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
          marginTop: 50,
        }}
      >
        <Text style={{ color: Colors.WHITE, textAlign: "center" }}>
          Create Account
        </Text>
      </TouchableOpacity>

      {/* Sign In Button */}
      <TouchableOpacity onPress={() => router.push("/auth/sign-in")}>
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.WHITE,
            borderRadius: 15,
            marginTop: 20,
            borderWidth: 1,
          }}
        >
          <Text style={{ color: Colors.PRIMARY, textAlign: "center" }}>
            Sign In
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.GRAY,
    fontFamily: "roboto-regular",
  },
});
