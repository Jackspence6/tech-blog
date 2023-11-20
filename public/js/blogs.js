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
document.querySelector("form").addEventListener("submit", function (event) {
	event.preventDefault();
	const formData = new FormData(this);

	fetch("/api/comments", {
		method: "POST",
		body: formData,
	})
		.then((response) => {
			if (response.ok) {
				// Reloading page to show user the new comment
				location.reload();
			} else {
				alert("Failed to add comment!");
			}
		})
		.catch((error) => {
			console.error("Error:", error);
		});
});
