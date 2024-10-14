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

test.only('blogs have an id property', async () => {
	const response = await api.get('/api/blogs');
	const blogs = response.body;

	blogs.forEach(blog => {
		assert(blog.id)
	});
});

after(async () => {
	await mongoose.connection.close()
})
