import React, { useEffect } from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  AsyncStorage,
} from "react-native";
import { useDispatch } from "react-redux";
import { autoLogin } from "../store/actions/auth";

const StartUpScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryAuth = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, expiresIn, userId } = transformedData;
      console.log(transformedData);
      const expiryDate = new Date(expiresIn);
      if (expiryDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      const exTime = expiryDate.getTime() - new Date().getTime();

      dispatch(autoLogin(transformedData, exTime));
    };
    tryAuth();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator color="dodgerblue" size="large" />
    </View>
  );
};

export default StartUpScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
