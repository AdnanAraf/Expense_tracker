let income = document.querySelector("#income");
let expense = document.querySelector("#expense");
let incomeButton = document.querySelector("#income-button");
let expenseButton = document.querySelector("#expense-button");
let showIncomevalue = document.querySelector(".showIncome");
let showExpensevalue = document.querySelector(".showExpense");
let showTotalvalue = document.querySelector(".totalSum");

let incomeArray = [];
let incomeSum = 0;
let incomeData = [];
let expenseData = [];
let totalData = [];
let expenseArray = [];
let expenseSum = 0;

function showTotal() {
    let totalSum = incomeSum - expenseSum;
    showTotalvalue.innerText = totalSum;
}

incomeButton.addEventListener("click", function() {
    incomeArray = [];
    let incomeValue = income.value;
    let text = document.querySelector("#text");



    income.value = "";

    incomeArray.push(incomeValue);
    for (let i = 0; i < incomeArray.length; i++) {
        incomeSum += parseInt(incomeArray[i]);
        incomeData.push({
            id: Date.now(),
            name: text.value,
            data: parseInt(incomeArray[i]),
            content: "income"
        });
       
        localStorage.setItem("incomeData", JSON.stringify(incomeData));
    }
    text.value = "";
    showTotal();
    incomeShowData();
});

let incomeShowData = () => {
    showIncomevalue.innerHTML = "";

    incomeData.forEach((x) => {
        showIncomevalue.innerHTML += `
        <div>
            <div class="flex justify-between">
                <p>${x.name.slice(0,10)}..</p>
                <p>${x.data}</p>
                <button onclick="deleteIncome(${x.id})">Delete</button>
            </div>
        </div>`;
    });
};

function deleteIncome(id) {
    const item = incomeData.find(x => x.id === id);
    console.log(item);
    incomeSum -= item.data;
    incomeData = incomeData.filter(item => item.id !== id);
    localStorage.setItem("incomeData", JSON.stringify(incomeData));
    incomeShowData();
    showTotal();
}

(() => {
    incomeData = JSON.parse(localStorage.getItem("incomeData")) || [];
    incomeSum = incomeData.reduce((sum, item) => sum + item.data, 0);
    incomeShowData();
    showTotal();
})();

expenseButton.addEventListener("click", function() {
    expenseArray = [];
    let expenseValue = expense.value;
    let text = document.querySelector("#text");

    expense.value = "";


    console.log(text.value);

    expenseArray.push(expenseValue);
    for (let i = 0; i < expenseArray.length; i++) {
        expenseSum += parseInt(expenseArray[i]);
        expenseData.push({
            id: Date.now(),
            name: text.value,
            data: parseInt(expenseArray[i]),
            content: "expense"
        });
       
        localStorage.setItem("expenseData", JSON.stringify(expenseData));
    }
    text.value = "";
    showTotal();
    expenseShowData();
});

let expenseShowData = () => {
    showExpensevalue.innerHTML = "";

    expenseData.forEach((x) => {
        showExpensevalue.innerHTML += `
        <div>
            <div class="flex justify-between">
             <p class="w-12">${x.name}..</p>
                <p>${x.data}</p>
                <button onclick="deleteExpense(${x.id})">Delete</button>
            </div>
        </div>`;
    });
};

function deleteExpense(id) {
    const item = expenseData.find(x => x.id === id);
    expenseSum -= item.data;
    expenseData = expenseData.filter(item => item.id !== id);
    localStorage.setItem("expenseData", JSON.stringify(expenseData));
    expenseShowData();
    showTotal();
}
(() => {
    expenseData = JSON.parse(localStorage.getItem("expenseData")) || [];
    expenseSum = expenseData.reduce((sum, item) => sum + item.data, 0);
    expenseShowData();
    showTotal();
})();
