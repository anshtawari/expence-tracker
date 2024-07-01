document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("transaction-form");
    const add = document.getElementById("add-tran");
    const delet = document.getElementById("delete-tran");
    const amountInput = document.getElementById("amount");
    const categoryInput = document.getElementById("category");
    const typeInput = document.getElementById("type");
    const transactionsList = document.getElementById("transactions-list");
    const totalIncome = document.getElementById("total-income");
    const totalExpenses = document.getElementById("total-expenses");
    const currentBalance = document.getElementById("current-balance");
    const current = document.querySelector(".clr");

    let transactions = [];

    add.addEventListener("click", function(event) {
        event.preventDefault();
        const amount = parseFloat(amountInput.value);
        const category = categoryInput.value;
        const type = typeInput.value; 

        if (isNaN(amount) || amount <= 0 || category === "") {
            alert("Please enter valid amount and category.");
            return;
        }

        transactions.push({ amount, category, type });
        updateTransactionsList();
        updateSummary();
        form.reset();
    });

    function updateTransactionsList() {
        transactionsList.innerHTML = "";
        transactions.forEach(function(transaction, index) {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)} - $${transaction.amount} (${transaction.category})`;
            transactionsList.appendChild(listItem);
        });
    }

    function updateSummary() {
        const income = transactions.reduce(function(total, transaction) {
            return transaction.type === "income" ? total + transaction.amount : total;
        }, 0);

        const expenses = transactions.reduce(function(total, transaction) {
            return transaction.type === "expense" ? total + transaction.amount : total;
        }, 0);

        totalIncome.textContent = `Rs.${income.toFixed(2)}`;
        totalExpenses.textContent = `Rs.${expenses.toFixed(2)}`;
        currentBalance.textContent = `Rs.${(income - expenses).toFixed(2)}`;
        if(parseInt(income-expenses)<0){
            current.style.color="red"
        }else{
            current.style.color="green"
        }
    }
    delet.addEventListener("click", function(event) {
        event.preventDefault();
        if(transactions.length>0){
            transactions.pop();
            transactionsList.removeChild(transactionsList.lastElementChild);
            updateSummary()
        }
    })
});
 