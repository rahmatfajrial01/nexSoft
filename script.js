document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");
  const successMessage = document.getElementById("successMessage");
  const loginButton = document.getElementById("loginButton");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    errorMessage.textContent = "";
    successMessage.textContent = "";
    loginButton.textContent = "Loading...";
    loginButton.disabled = true;

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
      errorMessage.textContent = "Username dan password tidak boleh kosong.";
      loginButton.textContent = "Login";
      loginButton.disabled = false;
      return;
    }

    fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text || "Terjadi kesalahan. Silakan coba lagi.");
          });
        }
      })
      .then((result) => {
        successMessage.textContent = "Login berhasil!";
      })
      .catch((error) => {
        errorMessage.textContent =
          error.message || "Terjadi kesalahan saat menghubungi server.";
      })
      .finally(() => {
        loginButton.textContent = "Login";
        loginButton.disabled = false;
      });
  });
});
