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
]

module.exports = {
	initialBlogs
}
