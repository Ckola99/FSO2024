const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('test to find the most liked blog i.e favourite blog', () => {

	const blogs = [
		{ title: 'Blog 1', author: 'Author 1', likes: 5 },
		{ title: 'Blog 2', author: 'Author 2', likes: 12 },
		{ title: 'Blog 3', author: 'Author 3', likes: 7 },
	];

	test('when the list has many blogs, returns the one with the most likes', () => {
		const result = listHelper.favouriteBlog(blogs);
		assert.deepStrictEqual(result, {
			title: 'Blog 2', author: 'Author 2', likes: 12
		})
	});

	test('when the list is empty, returns null', () => {
		const result = listHelper.favouriteBlog([]);
		assert.strictEqual(result, null);
	});

	test('when the list has one blog, returns that blog', () => {
		const singleBlog = [{ title: 'Blog 1', author: 'Author 1', likes: 5 }];
		const result = listHelper.favouriteBlog(singleBlog);
		assert.deepStrictEqual(result, {
			title: 'Blog 1',
			author: 'Author 1',
			likes: 5
		})
	});

})
