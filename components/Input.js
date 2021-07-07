import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const Input = ({ state, textChange, identifier, heading, keyboard }) => {
  const [touch, setTouch] = useState(false);
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{heading}</Text>
      <TextInput
        value={state.inputValues[identifier]}
        onChangeText={(text) => textChange(text, identifier)}
        style={styles.input}
        keyboardType={keyboard}
        autoCorrect
        autoCapitalize="sentences"
        returnKeyType="next"
        onEndEditing={() => {}}
        onSubmitEditing={() => {}}
        onFocus={() => {
          setTouch(true);
        }}
        onBlur={() => setTouch(false)}
      />
      {!state.inputValidities[identifier] && touch && (
        <Text style={{ color: "red" }}>Enter a valid {heading}!</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 2,
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
});
