// Function to get blog by ID with associated Info
function openBlog(event) {
	event.preventDefault();

	var blogId = event.target.getAttribute("data-blog-id");

	if (blogId) {
		// Redirecting user to the blog post using the ID
		window.location.href = "/blogs/" + blogId;
	} else {
		console.error("Blog ID not found!");
	}
}

// Adding an event listener to each view blog btn
var viewBlogButtons = document.querySelectorAll(".viewBlogBtn");
viewBlogButtons.forEach((button) => {
	button.addEventListener("click", openBlog);
});

// Function to handle add comment form
document.addEventListener("DOMContentLoaded", function () {
	var addCommentBtn = document.querySelector(".addCommentBtn");
	var commentFormContainer = document.getElementById("commentFormContainer");
	var commentForm = commentFormContainer.querySelector("form");

	if (addCommentBtn && commentFormContainer) {
		addCommentBtn.addEventListener("click", function () {
			commentFormContainer.style.display =
				commentFormContainer.style.display === "none" ? "block" : "none";
		});
	}

	// Code for form submission
	if (commentForm) {
		commentForm.addEventListener("submit", function (event) {
			event.preventDefault();
			const content = document.getElementById("comment").value.trim();

			fetch("/api/comments", {
				method: "POST",
				body: JSON.stringify({
					content,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					if (response.ok) {
						location.reload();
					} else {
						alert("Failed to add comment!");
					}
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		});
	}
});
