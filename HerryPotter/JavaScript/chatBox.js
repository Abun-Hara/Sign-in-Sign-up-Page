const sendBtn = document.getElementById('sendBtn');
const chatBox = document.querySelector(".chatBox");
const chatMessage = document.getElementById('chatMessage');
const signUpForm = document.getElementById('signUpForm');
const userName = document.getElementById('userName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const signUpBtn = document.getElementById('signUpBtn');
const startChatText = document.getElementById("startChat");

// Function to validate individual fields
const validateField = (field, regex) => {
    if (regex.test(field.value.trim())) {
        field.style.borderColor = "green";
        return true;
    } else {
        field.style.borderColor = "red";
        return false;
    }
};

// Function to validate the entire form
const validateForm = () => {
    const isUserNameValid = validateField(userName, /^[a-zA-Z\s]+$/);
    const isEmailValid = validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    const isPhoneValid = validateField(phone, /^\d{10}$/);
    const isPasswordValid = validateField(password, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    // Enable or disable the Sign Up button
    signUpBtn.disabled = !(isUserNameValid && isEmailValid && isPhoneValid && isPasswordValid);
};

// Add event listeners for real-time validation
[userName, email, phone, password].forEach(field => {
    field.addEventListener('input', validateForm);
});

// Ensure chat area appears after signup
signUpForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent actual submission

    if (signUpBtn.disabled) return; // Don't proceed if button is disabled

    signUpForm.style.display = "none"; // Hide sign-up form
    chatBox.style.display = "flex"; // Show chat area
    document.querySelector(".chatinput").style.display = "flex"; // Show chat input

    startChatText.textContent = "Welcome to Deepseek Chat!";
    startChatText.style.color = "#1eff00";
    startChatText.style.fontWeight = "bold";
});

validateForm(); // Initial validation check

let API_KEY = "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"; // Replace with your actual API key

const handleChat = () => {
    let userMessage = chatMessage.value.trim();
    if (!userMessage) {
        alert("Please enter a message before sending.");
        return;
    }

    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatMessage.value = "";

    const thinkingLi = createChatLi("Thinking...", "incoming");
    chatBox.appendChild(thinkingLi);
    chatBox.scrollTop = chatBox.scrollHeight;

    generateResponse(userMessage, thinkingLi);
};

const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"
        ? `<p>${message}</p>`
        : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
};

const generateResponse = async (message, thinkingLi) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "deepseek/deepseek-r1-distill-llama-70b:free",
                messages: [{ role: "user", content: message }]
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        let aiResponse = data.choices?.[0]?.message?.content || "No response";
        aiResponse = aiResponse.replace(/\n/g, "<br>");

        thinkingLi.querySelector('p').innerHTML = aiResponse;
    } catch (error) {
        thinkingLi.querySelector('p').textContent = "Error: Unable to fetch response. Please try again later.";
    } finally {
        chatBox.scrollTop = body.scrollHeight;
         thinkingLi.scrollIntoView({ behavior: "smooth", block: "end" });
         
    }
};

sendBtn.addEventListener('click', handleChat);
chatMessage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});

const darkTheme = document.getElementById("darkTheme");
darkTheme.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    chatBox.classList.toggle("dark");
});
