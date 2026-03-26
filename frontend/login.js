 document.getElementById("loginForm").addEventListener("submit", async function (e) {
            e.preventDefault();

            try {
                const email = document.getElementById("email").value;
                const password = document.getElementById("password").value;

                const res = await fetch("http://localhost:5000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await res.json();

                if (data.message === "Login successful") {
                    document.getElementById("loginForm").reset();  // ✅ clear form
                    localStorage.setItem("token", data.token); // save token
                    window.location.href = "dashboard.html";
                } else {
                    document.getElementById("loginForm").reset();  // ✅ clear even on error
                    alert(data.error);
                }

            } catch (err) {
                console.log(err);
                alert("Login failed");
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