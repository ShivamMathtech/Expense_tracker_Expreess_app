document.addEventListener("DOMContentLoaded", () => {
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
        localStorage.removeItem("authToken");
        window.location.href = "/login.html"; // Redirect to login
        return;
      }

      // ✅ Show user details on the page
      document.getElementById("user-name").textContent =
        user.user.first_name + "" + user.user.last_name;
      document.getElementById("user-email").textContent = user.user.email;
    })
    .catch((error) => console.error("Error fetching user data:", error));
  fetch("http://localhost:5000/api/reports/summary", {
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
        localStorage.removeItem("authToken");
        window.location.href = "/login.html"; // Redirect to login
        return;
      }
      document.getElementById("t_income").textContent = user.totalIncome;
      document.getElementById("t_expense").textContent = user.totalExpense;
      document.getElementById("t_saving").textContent = user.netSavings;
    })
    .catch((error) => console.error("Error fetching user data:", error));
  fetch("http://localhost:5000/api/expenses", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((expenses) => {
      console.log(expenses);
      const tableBody = document.querySelector("#expenseTableBody");
      tableBody.innerHTML = ""; // Clear existing rows

      expenses.expense.forEach((expense) => {
        console.log(expense._id);
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${new Date(expense.date).toLocaleDateString()}</td>
                <td>${expense.category}</td>
                <td>₹${expense.amount}</td>
                <td>${expense.description}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editExpense('${
                      expense._id
                    }')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteExpense('${
                      expense._id
                    }')">Delete</button>
                </td>
            `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error fetching expenses:", error));
});
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
      console.log(data);
      alert("Expense deleted successfully!");
      location.reload(); // Refresh table
    })
    .catch((error) => console.error("Error deleting expense:", error));
}
