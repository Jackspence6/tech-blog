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
				alert("An error occurred while sending the request.");
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
			window.location.href = "/api/dashboard";
		} else {
			alert("Failed to create new blog post!");
		}
	} catch (error) {
		console.error("Error:", error);
		alert("An error occurred while sending the request.");
	}
}

// Add event listener for the add blog post button
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
