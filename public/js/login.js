// Login Form Handler
const loginFormHandler = async (event) => {
	event.preventDefault();

	// Collecting values from the login form
	const username = document.querySelector("#username-login").value.trim();
	const password = document.querySelector("#password-login").value.trim();

	if (username && password) {
		// Sending a POST request to the API endpoint
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			// If successful, redirecting user to homepage
			document.location.replace("/");
		} else {
			alert(response.statusText);
		}
	}
};

// Signup Form Handler
const signupFormHandler = async (event) => {
	event.preventDefault();

	// Collecting values from the signup form
	const username = document.querySelector("#username-signup").value.trim();
	const password = document.querySelector("#password-signup").value.trim();

	if (username && password) {
		// Sending a POST request to the API endpoint
		const response = await fetch("/api/users", {
			method: "POST",
			body: JSON.stringify({ username, password }),
			headers: { "Content-Type": "application/json" },
		});
		// If successful, redirecting user to homepage
		if (response.ok) {
			document.location.replace("/");
		} else {
			alert(response.statusText);
		}
	}
};

document
	.querySelector(".login-form")
	.addEventListener("submit", loginFormHandler);

document
	.querySelector(".signup-form")
	.addEventListener("submit", signupFormHandler);
