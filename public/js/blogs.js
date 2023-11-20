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
