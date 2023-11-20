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
function addComment(event) {
	event.preventDefault();

	var blogId = event.target.getAttribute("data-blog-id");

	if (blogId) {
		// Redirecting user to the add comment form
		window.location.href = "/comments/";
	} else {
		console.error("An error occurred!");
	}
}

// Adding an event listener to each add comment btn
var addCommentBtn = document.querySelector(".addCommentBtn");

addCommentBtn.addEventListener("click", addComment);
