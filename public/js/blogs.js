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

// Function to handle add comment form
document.addEventListener("DOMContentLoaded", function () {
	var addCommentBtn = document.querySelector(".addCommentBtn");
	var commentFormContainer = document.getElementById("commentFormContainer");
	var commentForm = commentFormContainer.querySelector("form");

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
	if (commentForm) {
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
					alert("Comment added successfully!");
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
