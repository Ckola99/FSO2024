const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
	const promiseArray = blogObjects.map(blog => blog.save())
	await Promise.all(promiseArray)
})

test('blogs are returned as json and correct number of blogs is returned', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);

	assert.strictEqual(response.body.length, helper.initialBlogs.length)
});

test('blogs have an id property', async () => {
	const response = await api.get('/api/blogs');
	const blogs = response.body;

	blogs.forEach(blog => {
		assert(blog.id)
	});
});

test('POST /api/blogs creates a new blog post', async () => {
	const newBlog = {
		title: 'designers in SA',
		author: 'Peter Abloh',
		url: 'www.randoms3.co.za',
		likes: 89
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)

	const blogsAfterPost = await helper.blogsInDatabase();
	assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1)

	const blogTitles = blogsAfterPost.map(b => b.title)
	assert(blogTitles.includes('designers in SA'))
});

test('blog without title or url ', async () => {
	const newBlog = {
		title: 'designers in SA',
		author: 'Peter Abloh',
		likes: 89
	}

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogsAfterPost = await helper.blogsInDatabase();
	assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length);
});

after(async () => {
	await mongoose.connection.close()
})
