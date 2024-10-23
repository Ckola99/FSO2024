// const blogsRouter = require('express').Router()
// const Blog = require('../models/blog')
// const { userExtractor } = require('../utils/middleware');

// blogsRouter.get('/', async (request, response) => {
// 	// Blog.find({}).then(blogs => {
// 	// 	response.json(blogs)
// 	// })

// 	// try {
// 	// 	const blogs = await Blog.find({});
// 	// 	response.json(blogs)
// 	// } catch (error) {
// 	// 	response.status(500).json({ error: 'Something went wrong' })
// 	// }

// 	//refactor with async express library
// 	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
// 	response.json(blogs)
// })

// blogsRouter.post('/', userExtractor, async (request, response) => {
// 	const { title, url } = request.body
// 	const user = request.user

// 	if (!user ) {
//     return response.status(403).json({ error: 'user missing' })
//   }

//   	if (!title || !url) {
// 		return response.status(400).json({ error: 'Title and URL requiredd' })
// 	}

// 	const blog = new Blog({
// 		title,
// 		author: request.body.author,
// 		url,
// 		likes: request.body.likes || 0,
// 		user: user._id
// 	})

// 	// blog
// 	// 	.save()
// 	// 	.then(result => {
// 	// 		response.status(201).json(result)
// 	// 	})
// 	// 	.catch(error => next(error))

// 	const savedBlog = await blog.save();
// 	user.blogs = user.blogs.concat(savedBlog._id)
// 	await user.save()
// 	response.status(201).json(savedBlog);
// })

// blogsRouter.delete('/:id', async (request, response) => {
// 	const user = request.user

// 	const blog = await Blog.findById(request.params.id)

// 	if (!blog) {
// 		return response.status(404).json({ error: 'blog not found' })
// 	}


// 	if (blog.user.toString() !== user.id.toString()) {
// 		return response.status(403).json({ error: 'you do not have permission to delete this blog' }) // Forbidden
// 	}

// 	await Blog.findByIdAndDelete(request.params.id)
// 	response.status(204).end()
// })

// blogsRouter.put('/:id', async (request, response) => {
// 	const { url, title } = request.body
// 	const user = request.user

// 	const blog = await Blog.findById(request.params.id)

// 	if (!blog) {
// 		return response.status(404).json({ error: 'Blog not found' })
// 	}

// 	// Check if the user trying to update is the creator of the blog
// 	if (blog.user.toString() !== user.id.toString()) {
// 		return response.status(403).json({ error: 'You do not have permission to update this blog' });
// 	}

// 	const updatedBlogData = {
// 		title,
// 		author: request.body.author,
// 		url,
// 		likes: likes || request.body.likes,
// 	}

// 	const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updatedBlogData, { new: true }) //With { new: true }: Mongoose returns the updated document, reflecting the changes you just made.

// 	if (updatedBlog) {
// 		response.json(updatedBlog)
// 	} else {
// 		response.status(404).json({ error: 'Note not found' })
// 	}
// })

// module.exports = blogsRouter

const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const blog = new Blog(request.body)

  const user = request.user

  if (!user ) {
    return response.status(403).json({ error: 'user missing' })
  }

  if (!blog.title || !blog.url ) {
    return response.status(400).json({ error: 'title or url missing' })
  }

  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog._id)

  await user.save()

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user

  const blog = await Blog.findById(request.params.id)
  if (!blog) {
    return response.status(204).end()
  }

  if ( user.id.toString() !== blog.user.toString() ) {
    return response.status(403).json({ error: 'user not authorized' })
  }

  await blog.deleteOne()

  user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())

  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
