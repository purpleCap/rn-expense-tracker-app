import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import ExpensesNavigator from "./navigation/navigators";
// import { ExpensesContextProvider } from "./store/expenses-context";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import expensesReducer from "./store/expenses-reducer";

const rootReducers = combineReducers({
  expenses: expensesReducer,
});
const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <Provider store={store}>
        <NavigationContainer>
          <ExpensesNavigator />
        </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});
