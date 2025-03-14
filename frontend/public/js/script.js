API_URL = "http://localhost:5000/api/auth/register";

let error_msg = document.getElementById("error_msg");
const signForm = document.getElementById("signForm");
signForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const userData = { first_name, last_name, email, password };
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    let error_msg = document.getElementById("error_msg");
    error_msg.style.display = "none";
    if (response.ok) {
      localStorage.setItem("token", data.token);
      window.location.href = "login.html"; // Redirect after signup
    } else {
      //   alert(data.msg || "Signup Failed");
      //   console.log(data.msg);
      error_msg.textContent = data.msg || "Signup Failed";
      error_msg.style.display = "block";
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong!");
  }
});
