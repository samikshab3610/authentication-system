 document.getElementById("signupForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      try {
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const res = await fetch("http://localhost:5000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name, email, password })
        });

        const data = await res.json();

        console.log(data);

        if (data.message === "User registered successfully" || data.message === "User saved to database") {
          document.getElementById("signupForm").reset();
          alert("Signup successful! Please login.");
          window.location.href = "login.html";
        } else {
          document.getElementById("signupForm").reset();
          alert(data.error || "Signup failed");
        }

      } catch (err) {
        console.log("FETCH ERROR:", err);
        alert("Something went wrong");
      }
    });

    function togglePassword() {
      const passwordField = document.getElementById("password");

      if (passwordField.type === "password") {
        passwordField.type = "text";
      } else {
        passwordField.type = "password";
      }
    }

    window.addEventListener("load", () => {
      setTimeout(() => {
        document.getElementById("signupForm")?.reset();
        document.getElementById("loginForm")?.reset();
      }, 100);
    });