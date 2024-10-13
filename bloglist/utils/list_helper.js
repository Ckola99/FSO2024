// list_helper.js

const dummy = (blogs) => {
	return 1; // Always returns 1 regardless of the input
}

const totalLikes = (blogs) => {
	return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favouriteBlog = (blogs) => {

	if (blogs.length === 0) {
		return null;
	}

	const favorite = blogs.reduce((prev, current) => {
		return current.likes > prev.likes ? current : prev;
	});

	return {
		title: favorite.title,
		author: favorite.author,
		likes: favorite.likes
	};
};

const mostBlogs = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	// Using the reduce() method to count the number of blogs written by each author
	const blogCount = blogs.reduce((acc, blog) => {

		// Check if the author's name already exists in the accumulator (acc) object
		// If it exists, increment the count by 1
		// If it doesn't exist, initialize the count for that author to 0 and then increment by 1
		acc[blog.author] = (acc[blog.author] || 0) + 1;

		// Return the updated accumulator object for the next iteration
		return acc;

	}, {}); // The second argument {} initializes the accumulator as an empty object

	// This block of code finds the author with the most blogs from the blogCount object.

	// Object.keys(blogCount) extracts all the authors (the keys of the blogCount object) as an array.
	// The reduce() function iterates over the array of author names.
	// In each iteration, it compares the number of blogs of two authors at a time (a and b).
	// The comparison (blogCount[a] > blogCount[b]) checks which author has more blogs.
	// After going through all the authors, the reduce() function returns the author with the most blogs.
	const topAuthor = Object.keys(blogCount).reduce((a, b) => (
		blogCount[a] > blogCount[b] ? a : b
	));

	return {
		author: topAuthor,
		blogs: blogCount[topAuthor],
	};

};

const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return null;
	}

	const likeCount = blogs.reduce((acc, blog) => {
		acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
		return acc;
	}, {});

	const topAuthor = Object.keys(likeCount).reduce((a, b) => (
		likeCount[a] > likeCount[b] ? a : b
	));

	return {
		author: topAuthor,
		likes: likeCount[topAuthor],
	};

}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }; // Export the function so it can be used in other files
