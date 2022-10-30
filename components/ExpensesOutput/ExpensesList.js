import { FlatList, View, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";
const renderExpensesItems = (itemData) => {
  return (
    <ExpenseItem
      id={itemData.item.id}
      description={itemData.item.description}
      amount={itemData.item.amount}
      date={itemData.item.date}
    />
  );
};

const ExpensesList = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpensesItems}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ExpensesList;
