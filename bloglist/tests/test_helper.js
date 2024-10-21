const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const app = require('../app')

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

	const blog = new Blog({
		title: 'Non-existent blog',
		author: 'Unknown Author',
		url: 'http://unknown.com',
		likes: 5,
	})

	await note.save()
	await note.deleteOne()

	return note._id.toString()
}

const api = supertest(app)

const loginAndGetToken = async () => {
	const response = await api
		.post('/api/login') // Assuming you have a /api/login route
		.send({ username: 'testuser', password: 'password123' });

	return response.body.token; // Retrieve the token from response
};

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs, blogsInDatabase, nonExistingId, usersInDb, loginAndGetToken
}
