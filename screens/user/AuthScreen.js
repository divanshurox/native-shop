import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ScrollView,
  Button,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import taj from "../../assets/taj.jpg";
import { useSelector, useDispatch } from "react-redux";
import { signUp, logIn } from "../../store/actions/auth";

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = ({ navigation }) => {
  const [loginMode, setLoginMode] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState();

  navigation.setOptions({
    title: loginMode ? "LogIn" : "SignUp",
  });

  // For Error management
  useEffect(() => {
    if (error) {
      Alert.alert("Something went wrong!", error, [{ text: "OK" }]);
    }
  }, [error]);

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  const dispatch = useDispatch();

  const textChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      formDispatch({
        type: "FORM_INPUT_UPDATE",
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [formDispatch]
  );

  const signUpHandler = async () => {
    setLoad(true);
    setError(null);
    let action;
    if (loginMode) {
      action = logIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setLoad(false);
    }
  };

  const loginTextHandler = () => {
    if (loginMode) {
      setLoginMode(false);
    } else {
      setLoginMode(true);
    }
  };

  return (
    <ImageBackground source={taj} style={styles.backgroundImg}>
      <View style={styles.screen}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address"
              onInputChange={textChangeHandler}
              initialValue=""
              placeholder="Email"
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password"
              onInputChange={textChangeHandler}
              initialValue=""
              placeholder="Password"
            />
            {load && (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator color="dodgerblue" size="large" />
              </View>
            )}
            <View style={styles.btnContainer}>
              <Button
                title={loginMode ? "Login" : "SignUp"}
                onPress={signUpHandler}
              />
            </View>
          </ScrollView>
        </Card>
        <View style={styles.textCnt}>
          <Text style={{ color: "white" }}>
            {!loginMode ? " Already have an Account? " : " New Here? "}
          </Text>
          <TouchableWithoutFeedback onPress={loginTextHandler}>
            <Text>{!loginMode ? " LogIn " : " SignUp "}</Text>
          </TouchableWithoutFeedback>
          <Text style={{ color: "white" }}> instead🚀</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  authContainer: {
    width: "80%",
    height: "35%",
    padding: 20,
  },
  btnContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  backgroundImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  textCnt: {
    top: 250,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
