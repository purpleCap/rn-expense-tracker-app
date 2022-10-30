import axios from "axios";

const BACKEND_URL =
  "https://rn-expense-tracker-app-pratik-default-rtdb.firebaseio.com";

export const storeExpense = async (expenseData) => {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    // console.log(response.data);
    const expenses = [];

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }
    return expenses;
  } catch (err) {
    console.log(err);
  }
};

export const updateExpense = (id, updatedData) => {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, updatedData);
};
export const deleteExpense = (id) => {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
};
