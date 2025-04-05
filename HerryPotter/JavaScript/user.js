const signInForm = document.getElementById("signInForm");
const signUpForm = document.getElementById("signUpForm");
const showSignUp = document.getElementById("showSignUp");
const showSignIn = document.getElementById("showSignIn");

showSignUp.addEventListener("click", () => {
    signInForm.style.display = "none";
    signUpForm.style.display = "block";
});

showSignIn.addEventListener("click", () => {
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
});

// Validate Name (only letters and spaces)
function validateName() {
    const nameInput = document.getElementById("signUpName").value;
    const nameError = document.getElementById("signUpNameError");
    const regex = /^[A-Za-z\s-]+$/; // Only letters, spaces, and hyphens allowed

    nameError.textContent = regex.test(nameInput) ? "" : "Name must contain only letters, spaces, and hyphens.";
}

document.getElementById("signUpName").addEventListener("input", validateName);

// Validate Email
function validateEmail() {
    const emailInput = document.getElementById("signUpEmail").value;
    const emailError = document.getElementById("signUpEmailError");
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation

    emailError.textContent = regex.test(emailInput) ? "" : "Enter a valid email address.";
}

document.getElementById("signUpEmail").addEventListener("input", validateEmail);

// Validate Password (secure format)
function validatePassword() {
    const passwordInput = document.getElementById("signUpPassword").value;
    const passwordError = document.getElementById("signUpPasswordError");
    // Improved regex (less complex)
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    passwordError.textContent = regex.test(passwordInput) ? "" : "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.";
}

document.getElementById("signUpPassword").addEventListener("input", validatePassword);

// Store Signed-up Users in Local Storage
document.getElementById("signUp").addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("signUpName").value;
    const email = document.getElementById("signUpEmail").value;
    const password = document.getElementById("signUpPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || []; // Initialize to empty array if null

    // Check if email is already registered
    if (users.some(user => user.email === email)) {  //Check only email
        document.getElementById("signUpEmailError").textContent = "Email is already registered.";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").textContent = "Passwords do not match.";
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users)); // Correct key
    alert("Sign-up successful!");  //Simplified message
    signUpForm.style.display = "none";
    signInForm.style.display = "block";
});

// Sign In Validation
document.getElementById("signIn").addEventListener("submit", function (event) {
    event.preventDefault();
    const email = document.getElementById("signInEmail").value;
    const password = document.getElementById("signInPassword").value;
    const signInError = document.getElementById("signInEmailError");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find(user => user.email === email && user.password === password);

    if (userExists) {
        signInError.textContent = "Login successful!";
        // Redirect user to new page after successful loggin
        window.location.href = "https://www.shutterstock.com/image-vector/welcome-colorful-letters-banner-can-260nw-1313361116.jpg";
    }
    else {
        signInError.textContent = "Invalid Credentials";
    }
});
