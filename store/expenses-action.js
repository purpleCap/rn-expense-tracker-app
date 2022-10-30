export function addExpense(expenseData) {
  return { type: "ADD", payload: expenseData };
}
export function setExpenses(expenses) {
  return { type: "SET", payload: expenses };
}
export function deleteExpense(id) {
  return { type: "DELETE", payload: id };
}
export function updateExpense(id, expenseData) {
  return { type: "UPDATE", payload: { id, data: expenseData } };
}
