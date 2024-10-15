const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Luxury brands',
		author: 'John Dough',
		url: 'www.randoms.co.za',
		likes: 100
	},
	{
		title: 'Luxury brands in SA',
		author: 'Liezl krow',
		url: 'www.randoms2.co.za',
		likes: 150
	}
];

const blogsInDatabase = async () => {
	const blogs = await Blog.find({});
	return blogs.map(blog => blog.toJSON())
}

const nonExistingId = async () => {
	
	const note = new Blog({
		title: 'Non-existent blog',
		author: 'Unknown Author',
		url: 'http://unknown.com',
		likes: 5,
	})

	await note.save()
	await note.deleteOne()

	return note._id.toString()
}

module.exports = {
	initialBlogs, blogsInDatabase, nonExistingId
}
