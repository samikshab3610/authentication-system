const pendingEmail = localStorage.getItem("pendingEmail");

if (pendingEmail) {
  document.getElementById("otpEmail").value = pendingEmail;
}

document.getElementById("otpForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const email = document.getElementById("otpEmail").value;
  const otp = document.getElementById("otp").value;

  try {
    const res = await fetch("http://localhost:5000/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const data = await res.json();

    if (data.token) {
      localStorage.removeItem("pendingEmail");
      localStorage.setItem("token", data.token);
      window.location.href = "dashboard.html";
    } else {
      alert(data.message || "Verification failed");
    }

  } catch (err) {
    console.log(err);
    alert("Something went wrong");
  }
});