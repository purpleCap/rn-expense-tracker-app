import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense, updateExpense, deleteExpense } from "../util/http";
import * as expensesAction from "./../store/expenses-action";
import { useSelector, useDispatch } from "react-redux";

const ManageExpense = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState();
  const [isDeleting, setIsDeleting] = useState();
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    try {
      setIsDeleting(true);
      await deleteExpense(editedExpenseId);
      dispatch(expensesAction.deleteExpense(editedExpenseId));
    } catch (err) {
      console.log(err);
    }
    setIsDeleting(false);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async (expenseData) => {
    try {
      if (isEditing) {
        setIsLoading(true);
        await updateExpense(editedExpenseId, expenseData);
        dispatch(expensesAction.updateExpense(editedExpenseId, expenseData));
      } else {
        setIsLoading(true);
        const fetched_Id = await storeExpense(expenseData);
        dispatch(expensesAction.addExpense({ ...expenseData, id: fetched_Id }));
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  let buttonLabel = isEditing ? "Update" : "Add";
  if (isLoading) {
    buttonLabel = (
      <ActivityIndicator size="small" color={GlobalStyles.colors.primary100} />
    );
  }

  let trashIcon = (
    <IconButton
      icon="trash"
      color={GlobalStyles.colors.error500}
      size={36}
      onPress={deleteExpenseHandler}
    />
  );
  if (isDeleting) {
    trashIcon = (
      <ActivityIndicator size="large" color={GlobalStyles.colors.error500} />
    );
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={buttonLabel}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />

      {isEditing && <View style={styles.deleteContainer}>{trashIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginVertical: 16,
    paddingVertical: 8,
    borderTopWidth: 2,
    boderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ManageExpense;
