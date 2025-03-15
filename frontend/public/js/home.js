document.addEventListener("DOMContentLoaded", () => {
  loadExpenses();
  loadIncome();
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login.html"; // Redirect to login if no token
    return;
  }

  fetch("http://localhost:5000/api/auth/user", {
    // Adjust this API endpoint based on your backend
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((user) => {
      if (user.msg === "Invalid token") {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login.html"; // Redirect to login
        return;
      }

      // ✅ Show user details on the page
      document.getElementById("user-name").textContent =
        user.user.first_name + "" + user.user.last_name;
      document.getElementById("user-email").textContent = user.user.email;
      //calling the reports funtion
      reports();
    })
    .catch((error) => console.error("Error fetching user data:", error));
});

function reports() {
  const token = localStorage.getItem("token");
  fetch("http://localhost:5000/api/reports/summary", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.msg === "Invalid token") {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        return;
      }
      document.getElementById("t_income").textContent = data.totalIncome;
      document.getElementById("t_expense").textContent = data.totalExpense;
      document.getElementById("t_saving").textContent = data.netSavings;
    })
    .catch((error) => {
      console.log("Error During reports Data", error);
    });
  fetch("http://localhost:5000/api/reports/category", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.msg === "Invalid token") {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        return;
      }
      // document.getElementById("t_income").textContent = data.totalIncome;
      // document.getElementById("t_expense").textContent = data.totalExpense;
      // document.getElementById("t_saving").textContent = data.netSavings;
      var category = [];
      var total_category_wise = [];
      var barColors = [];
      data.forEach((element) => {
        category.push(element._id);
        total_category_wise.push(element.total);
        barColors.push(getRandomColor());
      });

      new Chart("bar_graph_category", {
        type: "pie",
        data: {
          labels: category,
          datasets: [
            {
              backgroundColor: barColors,
              data: total_category_wise,
            },
          ],
        },
        options: {
          title: {
            display: true,

            text: "Category wise expense",
          },
        },
      });
    })
    .catch((error) => console.log("Error During reports Data", error));
  fetch("http://localhost:5000/api/reports/monthly/2025", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.msg === "Invalid token") {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        return;
      }
      // console.log();
      document.getElementById("mon_income").textContent =
        data.monthlyIncome[0].total;
      document.getElementById("mon_Expense").textContent =
        data.monthlyExpense[0].total;
    })
    .catch((error) => console.log("Error During reports Data", error));
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
// Section 2 handler
// Add Expense Handler
document.getElementById("expenseForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in first!");
    return;
  }

  const expenseData = {
    date: document.getElementById("date").value,
    category: document.getElementById("category").value,
    amount: parseFloat(document.getElementById("amount").value),
    description: document.getElementById("description").value,
  };

  fetch("http://localhost:5000/api/expenses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData),
  })
    .then((response) => response.json())
    .then((data) => {
      loadExpenses();
      reports();
    })
    .catch((error) => console.error("Error adding expense:", error));
});

// Fetch and Load Expenses
function loadExpenses() {
  const token = localStorage.getItem("token");

  fetch("http://localhost:5000/api/expenses", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((expenses) => {
      const tableBody = document.getElementById("expenseTableBody");
      const totalExpenseEl = document.getElementById("totalExpense");
      let totalExpense = 0;

      tableBody.innerHTML = "";

      expenses.expense.forEach((expense) => {
        totalExpense += expense.amount;

        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.category}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editExpense('${
                      expense._id
                    }')">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense('${
                      expense._id
                    }')">Delete</button>
                    <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#ExpenseModel" onclick="viewExpenseById('${
                      expense._id
                    }')">View</button>
                </td>
            `;
        tableBody.appendChild(row);
      });

      totalExpenseEl.textContent = totalExpense;
    })
    .catch((error) => console.error("Error fetching expenses:", error));
}

// Delete Expense
function deleteExpense(expenseId) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      loadExpenses();
      reports();
    })
    .catch((error) => console.error("Error deleting expense:", error));
}

// Edit Expense (Redirect)
// function editExpense(expenseId) {
//   window.location.href = `/edit-expense.html?id=${expenseId}`;
// }
// View Expense By Id
function viewExpenseById(expenseId) {
  const token = localStorage.getItem("token");

  fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("eId").textContent = data._id;
      document.getElementById("edis").textContent = data.description;
      document.getElementById("eamt").textContent = data.amount;
      document.getElementById("ecat").textContent = data.category;
    })
    .catch((error) => console.error("Error deleting expense:", error));
}
function logout() {
  localStorage.removeItem("token"); // Remove token
  localStorage.removeItem("user"); // Remove user details
  window.location.href = "login.html"; // Redirect to login page
}
function incomeHandler() {}

// function addIncome() {
//   const token = localStorage.getItem("token");
//   fetch("http://localhost:5000/api/income", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data.msg === "Invalid token") {
//         alert("Session expired. Please login again.");
//         localStorage.removeItem("token");
//         return;
//       }
//     })
//     .catch((error) => {
//       console.log("Error Adding the Income");
//     });
// }
function loadIncome() {
  const token = localStorage.getItem("token");
  fetch("http://localhost:5000/api/income", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((income) => {
      const tableBody = document.getElementById("incomeTableBody");
      const totalIncomeEl = document.getElementById("totalIncome");
      let totalIncome = 0;
      tableBody.innerHTML = "";

      income.income.forEach((income) => {
        totalIncome += income.amount;

        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${new Date(income.date).toLocaleDateString()}</td>
                <td>${income.amount}</td>
                <td>₹${income.source}</td>
                <td>${income.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editExpense('${
                      income._id
                    }')">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense('${
                      income._id
                    }')">Delete</button>
                    <button class="btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#ExpenseModel" onclick="viewExpenseById('${
                      income._id
                    }')">View</button>
                </td>
            `;
        tableBody.appendChild(row);
      });

      totalIncomeEl.textContent = totalIncome;
    })
    .catch((error) => console.error("Error fetching expenses:", error));
}
