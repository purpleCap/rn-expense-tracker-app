import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, Alert } from "react-native";
import Input from "./Input";
import Button from "./../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });
  const inputChangedHandler = (inputIdentifier, receivedText) => {
    setInputs((currentInputValues) => {
      return {
        ...currentInputValues,
        [inputIdentifier]: { value: receivedText, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //  show some feedback
      setInputs((curState) => {
        return {
          amount: { value: curState.amount.value, isValid: amountIsValid },
          date: { value: curState.date.value, isValid: dateIsValid },
          description: {
            value: curState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            value: inputs.amount.value,
            onChangeText: inputChangedHandler.bind(this, "amount"),
          }}
          style={{ flex: 1 }}
          invalid={!inputs.amount.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            value: inputs.date.value,
            onChangeText: inputChangedHandler.bind(this, "date"),
          }}
          style={{ flex: 1 }}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          autoCapitalize: "sentences",
          placeholder: "about the product",
          value: inputs.description.value,
          onChangeText: inputChangedHandler.bind(this, "description"),
        }}
        invalid={!inputs.description.isValid}
      />
      <View style={{ height: 40 }}>
        {formIsInvalid && (
          <Text style={styles.inValid}>
            Invalid Entry: Kindly check the entered data.
          </Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="flat" onPress={onCancel} style={styles.buttonStyle}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.buttonStyle}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 12,
    textAlign: Platform.OS === "ios" ? "center" : "left",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  inValid: {
    color: "red",
    margin: 8,
    fontSize: 12,
    textAlign: Platform.OS === "ios" ? "center" : "left",
  },
  invalidFormTextContainer: {
    height: 40,
    padding: 20,
    backgroundColor: "orange",
  },
});

export default ExpenseForm;
