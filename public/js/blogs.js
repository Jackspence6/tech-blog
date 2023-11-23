// Function to get blog by ID with associated Info
function openBlog(event) {
	event.preventDefault();
	var blogId = event.target.getAttribute("data-blog-id");

	if (blogId) {
		window.location.href = "/blogs/" + blogId + "?blogId=" + blogId;
	} else {
		console.error("Blog ID not found!");
	}
}

// Adding an event listener to each view blog btn
var viewBlogButtons = document.querySelectorAll(".viewBlogBtn");
viewBlogButtons.forEach((button) => {
	button.addEventListener("click", openBlog);
});

// Flag to ensure event listener for form submission is only attached once
let isCommentFormListenerAttached = false;

// Function to handle add comment form
document.addEventListener("DOMContentLoaded", function () {
	var addCommentBtn = document.querySelector(".addCommentBtn");
	var commentFormContainer = document.getElementById("commentFormContainer");
	var commentForm = document.getElementById("commentForm");

	// Toggle comment form display
	if (addCommentBtn && commentFormContainer) {
		addCommentBtn.addEventListener("click", function () {
			commentFormContainer.style.display =
				commentFormContainer.style.display === "none" ? "block" : "none";
		});
	}

	// Extracting blogId from the URL
	function getBlogIdFromUrl() {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get("blogId");
	}

	// Comment form submission
	if (commentForm && !isCommentFormListenerAttached) {
		commentForm.addEventListener("submit", async function (event) {
			event.preventDefault();
			const content = document.getElementById("content").value.trim();
			const blog_id = getBlogIdFromUrl();

			if (!blog_id) {
				console.error("Blog ID not found!");
				return;
			}

			try {
				const response = await fetch("/api/comments", {
					method: "POST",
					body: JSON.stringify({ content, blog_id }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					// Hiding the comment form on submission
					commentFormContainer.style.display = "none";
					// Clearing the comment textarea
					document.getElementById("content").value = "";
					// Reloading page to show user new comment
					location.reload();
				} else {
					alert("Failed to add comment!");
				}
			} catch (error) {
				console.error("Error:", error);
				alert("An error occurred while sending the request!");
			}
		});
		isCommentFormListenerAttached = true;
	}
});

// Function to create a new blog post
async function addBlogPost(event) {
	event.preventDefault();

	const title = document.getElementById("blogTitle").value.trim();
	const content = document.getElementById("blogContent").value.trim();

	if (!title || !content) {
		console.error("Please fill in all the form fields!");
		return;
	}

	try {
		const response = await fetch("/api/blogs", {
			method: "POST",
			body: JSON.stringify({ title, content }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.getElementById("blogTitle").value = "";
			document.getElementById("blogContent").value = "";
			window.location.href = "/";
		} else {
			alert("Failed to create new blog post!");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("An error occurred while sending the request!");
	}
}

// Adding event listener for the add blog post button
document.addEventListener("DOMContentLoaded", function () {
	// Activate Blog Post Form Button
	var addBlogBtn = document.querySelector("#addBlogPostBtn");
	var blogFormContainer = document.getElementById("blogFormContainer");

	if (addBlogBtn && blogFormContainer) {
		addBlogBtn.addEventListener("click", function () {
			blogFormContainer.style.display =
				blogFormContainer.style.display === "none" ? "flex" : "none";
		});
	}

	// Blog Post Form Submission Handler
	var blogForm = document.getElementById("blogForm");
	if (blogForm) {
		blogForm.addEventListener("submit", addBlogPost);
	}
});

// Function to update an existing blog post
async function updateBlogPost(blogId) {
	const title = document.getElementById("updateBlogTitle").value.trim();
	const content = document.getElementById("updateBlogContent").value.trim();

	if (!title && !content) {
		console.error("Please fill in at least one of the form fields!");
		return;
	}

	try {
		const response = await fetch(`/api/blogs/${blogId}`, {
			method: "PUT",
			body: JSON.stringify({ title, content }),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			document.getElementById("updateBlogTitle").value = "";
			document.getElementById("updateBlogContent").value = "";
			window.location.href = "/";
		} else {
			alert("Failed to update blog post!");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("An error occurred while sending the request!");
	}
}

// Adding event listener to each update blog post button
document.addEventListener("DOMContentLoaded", function () {
	var updateButtons = document.querySelectorAll(".updateBlogBtn");

	updateButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const blogId = this.getAttribute("data-blog-id");

			// Hiding all update forms
			document.querySelectorAll(".updateBlogFormContainer").forEach((form) => {
				form.style.display = "none";
			});

			// Finding & displaying update form for the selected blog post
			var updateFormContainer = document.getElementById(
				`updateBlogFormContainer-${blogId}`
			);
			if (updateFormContainer) {
				updateFormContainer.style.display = "flex";

				// Blog Update Form Submission Handler
				var updateBlogForm = document.getElementById("updateBlogForm");
				if (updateBlogForm) {
					updateBlogForm.addEventListener("submit", function (event) {
						event.preventDefault();
						// Checking if blogId is correctly retrieved here
						updateBlogPost(blogId);
					});
				}
			} else {
				console.error(`Update form for blog ID ${blogId} not found!`);
			}
		});
	});
});

// Function to Delete an existing blog post
async function deleteBlogPost(blogId) {
	try {
		const response = await fetch(`/api/blogs/${blogId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			// If successful, redirecting user to homepage
			document.location.replace("/");
		} else {
			alert("Failed to delete blog post!");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("An error occurred while sending the request!");
	}
}

// Function to attach event listeners to delete blog post buttons
function attachDeleteEventListeners() {
	var deleteButtons = document.querySelectorAll(".deleteBlogBtn");

	deleteButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const blogId = this.getAttribute("data-blog-id");
			if (confirm("Are you sure you want to delete this blog post?")) {
				deleteBlogPost(blogId);
			}
		});
	});
}

// Attaching event listener when the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
	attachDeleteEventListeners();
});
