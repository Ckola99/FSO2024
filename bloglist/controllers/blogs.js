const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	// Blog.find({}).then(blogs => {
	// 	response.json(blogs)
	// })

	// try {
	// 	const blogs = await Blog.find({});
	// 	response.json(blogs)
	// } catch (error) {
	// 	response.status(500).json({ error: 'Something went wrong' })
	// }

	//refactor with async express library
	const blogs = await Blog.find({})
	response.json(blogs)
})

blogsRouter.post('/', (request, response, next) => {
	const blog = new Blog(request.body)

	blog
		.save()
		.then(result => {
			response.status(201).json(result)
		})
		.catch(error => next(error))
})

module.exports = blogsRouter
