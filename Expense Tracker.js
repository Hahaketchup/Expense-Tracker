let formsInfo = document.getElementById("forms");
formsInfo.addEventListener("submit", function(event) {
  event.preventDefault();

  let type = document.getElementById("user-type").value;
  let amount = document.getElementById("user-amount").value;
  let name = document.getElementById("user-name").value;
  let date = document.getElementById("user-date").value;

  if (name.length > 0) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    const expense = {
      type,
      amount,
      name,
      date,
      id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1
    };

    document.getElementById("forms").value = "";

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  renderExpense();
});

function renderExpense() {
  //shows expense
  const expenseList = document.getElementById("expense-list");

  for (let i = 0; i < expenses.length; i++) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    //create tr
    const itemRow = document.createElement("tr");
    //assign tr class name
    itemRow.className = "table-row";
    //set id
    itemRow.setAttribute("data-id", expenses[i].id);
    //create td for type
    const newType = document.createElement("td");
    //create text node
    newType.appendChild(document.createTextNode(expenses[i].type));
    //append td to tr
    itemRow.appendChild(newType);

    //create td for name
    const newName = document.createElement("td");
    //create text node
    newName.appendChild(document.createTextNode(expenses[i].name));
    //append td to tr
    itemRow.appendChild(newName);

    //create td for date
    const newDate = document.createElement("td");
    //create text node
    newDate.appendChild(document.createTextNode(expenses[i].date));
    //append td to tr
    itemRow.appendChild(newDate);

    //create td for amount
    const newAmount = document.createElement("td");
    //create text node
    newAmount.appendChild(document.createTextNode("$" + expenses[i].amount));
    //append td to tr
    itemRow.appendChild(newAmount);

    //append tr to tbody
    expenseList.appendChild(itemRow);

    //create delete button
    let deleteBtn = createDeleteButton();
    //append delete button to tr
    itemRow.appendChild(deleteBtn);

    let tableList = document.getElementById("expense-list");
    tableList.appendChild(itemRow);

    return itemRow;
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
  renderExpense();
  localStorage.setItem("expenses", JSON.stringify(expenses));
}