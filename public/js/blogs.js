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
		commentForm.addEventListener("submit", async function (event) {
			event.preventDefault();
			const content = document.getElementById("content").value.trim();

			const addCommentBtn = commentForm
				.closest(".blog-content")
				.querySelector(".addCommentBtn");
			const blog_id = addCommentBtn.getAttribute("data-blog-id");

			if (!blog_id) {
				console.error("Blog ID not found!");
				return;
			}

			try {
				const response = await fetch(`/api/comments`, {
					method: "POST",
					body: JSON.stringify({ content, blog_id }),
					headers: {
						"Content-Type": "application/json",
					},
				});

				if (response.ok) {
					document.location.replace("/blogs");
				} else {
					alert("Failed to add comment!");
				}
			} catch (error) {
				console.error("Error:", error);
				alert("An error occurred while sending the request.");
			}
		});
	}
});
