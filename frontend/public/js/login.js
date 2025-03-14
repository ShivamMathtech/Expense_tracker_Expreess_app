LOGIN_URL_API = "http://localhost:5000/api/auth/login";
document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const error_msg = document.getElementById("error_msg");

    error_msg.style.display = "none"; // Hide previous errors

    const userData = { email, password };

    try {
      const response = await fetch(LOGIN_URL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the token in localStorage
        localStorage.setItem("token", data.token);
        // alert("Login Successful! Redirecting...");
        window.location.href = "home.html"; // Redirect to dashboard
      } else {
        error_msg.textContent = data.msg || "Login Failed!";
        error_msg.style.display = "block";
      }
    } catch (error) {
      console.error("Error:", error);
      error_msg.textContent = "Something went wrong! Please try again.";
      error_msg.style.display = "block";
    }
  });
