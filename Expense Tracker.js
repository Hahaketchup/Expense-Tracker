
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

function renderExpense() {
  //shows expense
  const expenseList = document.getElementById("expense-list");

  for (let i = 0; i < expenses.length; i++) {
    //create tr
    const itemRow = document.createElement("tr");
    //create td for type
    const newType = document.createElement("td");
    //create text node
    newType.textContent = expenses[i].type;
    //append td to tr
    itemRow.appendChild(newType);
    //create td for name
    const newName = document.createElement("td");
    //create text node
    newName.textContent = expenses[i].name;
    //append td to tr
    itemRow.appendChild(newName);
    //create td for date
    const newDate = document.createElement("td");
    //create text node
    newDate.textContent = expenses[i].date;
    //append td to tr
    itemRow.appendChild(newDate);
    //create td for amount
    const newAmount = document.createElement("td");
    //create text node
    newAmount.textContent ="$" + expenses[i].amount;
    //append td to tr
    itemRow.appendChild(newAmount);
    //set id
    itemRow.setAttribute('data-id', expenses[i].id);
    //create delete button
    let deleteBtn = createDeleteButton();
    //append delete button to tr
    itemRow.appendChild(deleteBtn);

    //append tr to tbody
    expenseList.appendChild(itemRow);
  }
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm float-right delete";
  deleteButton.appendChild(document.createTextNode("X"));
  deleteButton.style.background = "red";
  deleteButton.style.color = "white";
  deleteButton.style.font = "bold";
  deleteButton.addEventListener("click", function(e) {
    deleteExpense(e);
  });
  return deleteButton;
}

function deleteExpense(event) {
  let id = event.target.parentElement.getAttribute("data-id");
  let tr = event.target.parentElement;

  expenses = expenses.filter(function(expenseItem) {
    return expenseItem.id !== Number(id);
  });

  let expensesList = document.getElementById("expense-list");
  expensesList.removeChild(tr);
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
for (let i = 0; i < expenses.length; i++) {
  renderExpense(expenses[i]);
  localStorage.setItem("expenses", JSON.stringify(expenses));
};