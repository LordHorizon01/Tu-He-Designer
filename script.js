// Show popup
function showPopup(id) {
  document.getElementById(id).style.display = "flex";
}

// Hide popup
function closePopup(id) {
  document.getElementById(id).style.display = "none";
}

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Register new user
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

// Login user
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

// Clear input fields
function clearInputs(ids) {
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = "";
  });
}

// Display logged-in user's name
function displayProfile() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentEmail = localStorage.getItem("currentUser");
  const user = users.find(u => u.email === currentEmail);

  if (user) {
    const profileBox = document.getElementById("profileBox");
    profileBox.innerHTML = `
      <span style="color: black;">Hello, ${user.name.split(" ")[0]}</span>
      <button onclick="logout()" style="margin-left: 10px; font-size: 12px;">Logout</button>
    `;
    profileBox.style.display = "inline-block";
  }
}

// Logout current user
function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  const box = document.getElementById("profileBox");
  if (box) box.style.display = "none";
}

// On page load: check login status
window.onload = function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    displayProfile();
  }
}
// ============================
// Navigation Links Interactions
// ============================
document.addEventListener('DOMContentLoaded', function() {
  const homeLink = document.getElementById('homeLink');
  const categoriesLink = document.getElementById('categoriesLink');
  const contactLink = document.getElementById('contactLink');

  // Smooth scroll to Categories section
  categoriesLink.addEventListener('click', function(event) {
    event.preventDefault();
    const categoriesSection = document.getElementById('customizableCategories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });

  // Show phone numbers on Contact click
  contactLink.addEventListener('click', function(event) {
    event.preventDefault();
    const phoneNumber1 = '8393409285';
    const phoneNumber2 = '8223491036';
    alert(`You can reach us at:\n${phoneNumber1}\n${phoneNumber2}`);
  });
});
