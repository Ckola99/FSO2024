const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('most blogs', () => {
	const blogs = [
		{ title: 'Blog 1', author: 'Author 1', likes: 5 },
		{ title: 'Blog 2', author: 'Author 2', likes: 12 },
		{ title: 'Blog 3', author: 'Author 1', likes: 7 },
		{ title: 'Blog 4', author: 'Author 3', likes: 10 },
		{ title: 'Blog 5', author: 'Author 2', likes: 9 },
		{ title: 'Blog 6', author: 'Author 2', likes: 2 },
	];

	test('returns the author with the most blogs', () => {
		const result = listHelper.mostBlogs(blogs);
		assert.deepStrictEqual(result, ({
			author: 'Author 2',
			blogs: 3
		}));
	});

	test('when the list is empty, returns null', () => {
		const result = listHelper.mostBlogs([]);
		assert.strictEqual(result, null)
	});

	test('when the list has one blog, returns that author', () => {
		const singleBlog = [{ title: 'Blog 1', author: 'Author 1', likes: 5 }];
		const result = listHelper.mostBlogs(singleBlog);
		assert.deepStrictEqual(result, ({
			author: 'Author 1',
			blogs: 1
		}));
	});
});
