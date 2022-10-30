import React, { useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import * as expensesAction from "./../store/expenses-action";
import { useSelector, useDispatch } from "react-redux";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getExpenses = async () => {
      setIsLoading(true);
      const expenses = await fetchExpenses();
      dispatch(expensesAction.setExpenses(expenses));
      setIsLoading(false);
    };
    getExpenses();
  }, []);

  const expenses = useSelector((state) => state.expenses);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 Days"
      expenses={recentExpenses}
      fallbackText="No Recent Expenses"
    />
  );
};

export default RecentExpenses;
