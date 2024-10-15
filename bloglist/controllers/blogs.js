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

blogsRouter.post('/', async (request, response) => {
	const { title, url } = request.body
	const blog = new Blog(request.body)

	if (!title || !url) {
		return response.status(400).json({ error: 'Title and URL requiredd'})
	}
	// blog
	// 	.save()
	// 	.then(result => {
	// 		response.status(201).json(result)
	// 	})
	// 	.catch(error => next(error))

	const savedBlog = await blog.save();
	response.status(201).json(savedBlog);
})

blogsRouter.delete('/:id', async (request, response) => {
	await Blog.findByIdAndDelete(request.params.id)
	response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const { url, title } = request.body

	if (!title || !url) {
		return response.status(400).json({ error: 'Title and URL required' })
	}

	const blog = {
		title,
		author: request.body.author,
		url,
		likes: request.body.likes,
	}

	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }) //With { new: true }: Mongoose returns the updated document, reflecting the changes you just made.
	if (updatedBlog) {
		response.json(updatedBlog)
	} else {
		response.status(404).json({ error: 'Note not found' })
	}
})

module.exports = blogsRouter
