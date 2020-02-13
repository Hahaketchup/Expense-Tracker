let formsInfo = document.getElementById("forms");
formsInfo.addEventListener("submit", function(event) {
  event.preventDefault();

  let type = document.getElementById("user-type").value;
  let amount = document.getElementById("user-amount").value;
  let name = document.getElementById("user-name").value;
  let date = document.getElementById("user-date").value;

  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  const expense = {
      
    type,
    amount,
    name,
    date,
    id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1
  };

  renderExpense();

  document.getElementById("forms").value = "";

  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
});

function renderExpense(expense) {
  //shows expense
  const expenseList = document.getElementById("expense-list");
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  for (let i = 0; i < expenses.length; i++) {
    let expenseInput = document.createTextNode(createNewItem(expenses[i]));
    expenseList.appendChild(expenseInput);

  }
}

function createNewItem(expenseItem) {
  const itemRow = document.createElement("tr");

  const newType = document.createElement("td");
  newType.textContent = expense.type;
  itemRow.appendChild(newType);

  const newAmount = document.createElement("td");
  newAmount.textContent = "$" + expense.amount;
  itemRow.appendChild(newAmount);

  const newName = document.createElement("td");
  newName.textContent = expense.name;
  itemRow.appendChild(newName);

  const newDate = document.createElement("td");
  newDate.textContent = expense.date;
  itemRow.appendChild(newDate);


}

function deleteExpense(id) {
    for (let i = 0; i < expenses.length; i++) {
        if (expenses[i].id == id) {
            expenses.splice(i,1);
        }
    }
}