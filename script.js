// =======================================
// 📌 SHOW / HIDE POPUP (Login & Register)
// =======================================
function showPopup(id) {
  document.getElementById(id).style.display = "flex";
}

function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

// =======================================
// 📌 EMAIL VALIDATION FUNCTION
// =======================================
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// =======================================
// 📌 USER REGISTRATION
// =======================================
function submitRegistration() {
  const name = document.getElementById("regName").value.trim();
  const email = document.getElementById("regEmail").value.trim();
  const password = document.getElementById("regPass").value;

  if (!name || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    alert("Email already registered. Try logging in.");
    closePopup("registerPopup");
    setTimeout(() => showPopup("loginPopup"), 300);
    return;
  }

  users.push({ name, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful. Please log in.");
  closePopup("registerPopup");
  clearInputs(["regName", "regEmail", "regPass"]);
  setTimeout(() => showPopup("loginPopup"), 300);
}

// =======================================
// 📌 USER LOGIN
// =======================================
function submitLogin() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPass").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Incorrect email or password.");
    return;
  }

  localStorage.setItem("currentUser", user.email);
  localStorage.setItem("isLoggedIn", "true");

  closePopup("loginPopup");
  clearInputs(["loginEmail", "loginPass"]);
  displayProfile();
}

// =======================================
// 📌 CLEAR INPUTS
// =======================================
function clearInputs(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

// =======================================
// 📌 DISPLAY PROFILE AFTER LOGIN
// =======================================
function displayProfile() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentEmail = localStorage.getItem("currentUser");
  const user = users.find(u => u.email === currentEmail);

  if (user) {
    const profileBox = document.getElementById("profileBox");
    profileBox.innerHTML = `
      <span style="color: black;">Hello, ${user.name.split(" ")[0]}</span>
      <button onclick="logout()" style="
        margin-left: 10px;
        padding: 4px 8px;
        background-color: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      ">Logout</button>
    `;
    profileBox.style.display = "inline-block";

    // Hide auth buttons
    document.querySelectorAll(".auth-buttons button").forEach(btn => {
      btn.style.display = "none";
    });
  }
}

// =======================================
// 📌 LOGOUT FUNCTION
// =======================================
function logout() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isLoggedIn");

  const profileBox = document.getElementById("profileBox");
  profileBox.style.display = "none";
  profileBox.innerHTML = "";

  // Show auth buttons
  document.querySelectorAll(".auth-buttons button").forEach(btn => {
    btn.style.display = "inline-block";
  });
}

// =======================================
// 📌 PAGE LOAD: CHECK LOGIN STATE
// =======================================
window.addEventListener("load", () => {
  if (localStorage.getItem("isLoggedIn") === "true") {
    displayProfile();
  }
});

// =======================================
// 📌 NAVIGATION INTERACTIONS
// =======================================
document.addEventListener("DOMContentLoaded", () => {
  const categoriesLink = document.getElementById("categoriesLink");
  const contactLink = document.getElementById("contactLink");

  // Scroll to Categories section
  categoriesLink.addEventListener("click", function (event) {
    event.preventDefault();
    const section = document.getElementById("customizableCategories");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Show contact modal
  contactLink.addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("contactModal").style.display = "flex";
  });
});

// =======================================
// 📌 CONTACT MODAL CLOSE
// =======================================
function closeContactModal() {
  document.getElementById("contactModal").style.display = "none";
}
