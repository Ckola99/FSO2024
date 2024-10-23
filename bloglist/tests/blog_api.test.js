// const { test, after, beforeEach, describe } = require('node:test')
// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const assert = require('node:assert')
// const app = require('../app')
// const Blog = require('../models/blog')
// const User = require('../models/user')
// const helper = require('./test_helper')
// const bcrypt = require('bcrypt')

// const api = supertest(app)

// beforeEach(async () => {
// 	await Blog.deleteMany({})

// 	const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
// 	const promiseArray = blogObjects.map(blog => blog.save())
// 	await Promise.all(promiseArray)
// })

// test('blogs are returned as json and correct number of blogs is returned', async () => {
// 	const response = await api
// 		.get('/api/blogs')
// 		.expect(200)
// 		.expect('Content-Type', /application\/json/);

// 	assert.strictEqual(response.body.length, helper.initialBlogs.length)
// });

// test('blogs have an id property', async () => {
// 	const response = await api.get('/api/blogs');
// 	const blogs = response.body;

// 	blogs.forEach(blog => {
// 		assert(blog.id)
// 	});
// });

// test('POST /api/blogs creates a new blog post', async () => {
// 	const newBlog = {
// 		title: 'designers in SA',
// 		author: 'Peter Abloh',
// 		url: 'www.randoms3.co.za',
// 		likes: 89
// 	}

// 	await api
// 		.post('/api/blogs')
// 		.send(newBlog)
// 		.expect(201)
// 		.expect('Content-Type', /application\/json/)

// 	const blogsAfterPost = await helper.blogsInDatabase();
// 	assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1)

// 	const blogTitles = blogsAfterPost.map(b => b.title)
// 	assert(blogTitles.includes('designers in SA'))
// });

// test('blog without title or url ', async () => {
// 	const newBlog = {
// 		title: 'designers in SA',
// 		author: 'Peter Abloh',
// 		likes: 89
// 	}

// 	await api
// 		.post('/api/blogs')
// 		.send(newBlog)
// 		.expect(400)

// 	const blogsAfterPost = await helper.blogsInDatabase();
// 	assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length);
// });

// test('a blog can be deleted', async () => {
// 	const blogsBeforeReq = await helper.blogsInDatabase()
// 	const blogToDelete = blogsBeforeReq[0]

// 	await api
// 		.delete(`/api/blogs/${blogToDelete.id}`)
// 		.expect(204)

// 	const blogsAfterReq = await helper.blogsInDatabase()

// 	const blogs = blogsAfterReq.map(b => b.id)
// 	assert(!blogs.includes(blogToDelete.id))

// 	assert.strictEqual(blogsAfterReq.length, blogsBeforeReq.length - 1)
// })

// test('updates a blog successfully', async () => {
// 	const blogsBeforeUpdate = await helper.blogsInDatabase();
// 	const blogToUpdate = blogsBeforeUpdate[0];

// 	const updatedData = {
// 		title: 'Updated Blog Title',
// 		author: blogToUpdate.author,
// 		url: blogToUpdate.url,
// 		likes: blogToUpdate.likes + 10,
// 	}

// 	const response = await api
// 		.put(`/api/blogs/${blogToUpdate.id}`)
// 		.send(updatedData)
// 		.expect(200)
// 		.expect('Content-Type', /application\/json/)

// 	const updatedBlog = response.body

// 	assert.strictEqual(updatedBlog.title, 'Updated Blog Title')
// 	assert.strictEqual(updatedBlog.likes, blogToUpdate.likes + 10)

// 	const blogsAfterUpdate = await helper.blogsInDatabase();
// 	assert.strictEqual(blogsAfterUpdate.length, blogsBeforeUpdate.length)
// })

// test('returns 404 if the blog does not exist', async () => {
// 	const nonExistingId = await helper.nonExistingId();

// 	const updatedData = {
// 		title: 'Non-existent blog',
// 		author: 'unknown Author',
// 		url: 'http://unknown.com',
// 		likes: 5
// 	}

// 	await api
// 		.put(`/api/blogs/${nonExistingId}`)
// 		.send(updatedData)
// 		.expect(404)
// });

// test('returns 400 if invalid data is provided', async () => {
// 	const blogsBeforeUpdate = await helper.blogsInDatabase()
// 	const blogToUpdate = blogsBeforeUpdate[0]

// 	const invalidData = {
// 		author: 'Invalid Data Author',
// 		likes: 10,
// 	}

// 	await api
// 		.put(`/api/blogs/${blogToUpdate.id}`)
// 		.send(invalidData)
// 		.expect(400)

// 	const blogsAfterUpdate = await helper.blogsInDatabase();
// 	const unchangedBlog = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)
// 	assert.strictEqual(unchangedBlog.title, blogToUpdate.title)
// })

// describe('when there is initially one user in database', () => {
// 	beforeEach(async () => {
// 		await Blog.deleteMany({})
// 		await User.deleteMany({})

// 		const passwordHash = await bcrypt.hash('sekret', 10)
// 		const user = new User({ username: 'root', passwordHash })

// 		await user.save()

// 		const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
// 		const promiseArray = blogObjects.map(blog => blog.save())
// 		await Promise.all(promiseArray)
// 	});

// 	test('creation succeeds with a fresh username', async () => {
// 		const usersAtStart = await helper.usersInDb()

// 		const newUser = {
// 			username: 'jtest',
// 			name: ' Johnny Test',
// 			password: 'tester95'
// 		}

// 		await api
// 			.post('/api/users')
// 			.send(newUser)
// 			.expect(201)
// 			.expect('Content-Type', /application\/json/)

// 		const usersAtEnd = await helper.usersInDb()
// 		assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

// 		const usernames = usersAtEnd.map(u => u.username)
// 		assert(usernames.includes(newUser.username))
// 	})

// 	test('creation falls with proper status code and message if username already taken', async () => {
// 		const usersAtStart = await helper.usersInDb()

// 		const newUser = {
// 			username: 'root',
// 			name: 'Superuser',
// 			password: 'slainen'
// 		}

// 		const result = await api
// 			.post('/api/users')
// 			.send(newUser)
// 			.expect(400)
// 			.expect('Content-Type', /application\/json/)

// 		const usersAtEnd = await helper.usersInDb()
// 		assert(result.body.error.includes('expected `username` to be unique'))

// 		assert.strictEqual(usersAtEnd.length, usersAtStart.length)
// 	})

// 	test('POST /api/blogs creates a new blog post with a valid token', async () => {
// 		const token = await helper.loginAndGetToken();

// 		const newBlog = {
// 			title: 'designers in SA',
// 			author: 'Peter Abloh',
// 			url: 'www.randoms3.co.za',
// 			likes: 89
// 		};

// 		await api
// 			.post('/api/blogs')
// 			.set('Authorization', `Bearer ${token}`) // Send token in the request header
// 			.send(newBlog)
// 			.expect(201)
// 			.expect('Content-Type', /application\/json/);

// 		const blogsAfterPost = await helper.blogsInDatabase();
// 		assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1);

// 		const blogTitles = blogsAfterPost.map(b => b.title);
// 		assert(blogTitles.includes('designers in SA'));
// 	});

// 	test('POST /api/blogs fails with 401 Unauthorized if token is not provided', async () => {
// 		const newBlog = {
// 			title: 'Unauthorized Blog',
// 			author: 'John Doe',
// 			url: 'www.unauthorized.com',
// 			likes: 10
// 		};

// 		await api
// 			.post('/api/blogs')
// 			.send(newBlog) // No token sent in the request
// 			.expect(401); // Expect 401 Unauthorized

// 		const blogsAfterPost = await helper.blogsInDatabase();
// 		assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length);
// 	});


// })

// after(async () => {
// 	await mongoose.connection.close()
// })

const supertest = require('supertest')
const mongoose = require('mongoose')
const { test, describe, after, beforeEach } = require('node:test')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const assert = require('assert')

const Blog = require('../models/blog')
const User = require('../models/user')

const testUser = {
  username: "testuser",
  name: "Test User",
  password: "password"
}

let token

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    await api
      .post('/api/users')
      .send(testUser)

    const response = await api
      .post('/api/login')
      .send(testUser)

    token = response.body.token
  })

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blogs are returned with id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      assert(blog.id)
    })
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .set('Authorization', `Bearer ${token}`)

    assert.strictEqual(postResponse.body.title, newBlog.title)
    assert.strictEqual(postResponse.body.author, newBlog.author)
    assert.strictEqual(postResponse.body.url, newBlog.url)
    assert.strictEqual(postResponse.body.likes, newBlog.likes)

    await api.get('/api/blogs')

    const blogsAtEnd = await helper.blogsInDb()

    const titles = blogsAtEnd.map(blog => blog.title)

    assert(titles.includes('New Blog'))
  })

  test('if likes property is missing, it will default to 0', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(postResponse.body.likes, 0)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a valid blog is not added without a token', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const postResponse = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: "New Blog",
      author: "New Author",
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog can be deleted', async () => {
    const blogToDelete = {
      title: "New Blog",
      author: "New Author",
      url: "http://example.com/new",
      likes: 5
    }

    const response = await api
      .post('/api/blogs')
      .send(blogToDelete)
      .set('Authorization', `Bearer ${token}`)

    const id = response.body.id

    const blogsAtStart = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    assert(!titles.includes(blogToDelete.title))
  })

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      title: "Updated Blog",
      author: "Updated Author",
      url: "http://example.com/updated",
      likes: 10
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)

    assert.strictEqual(updatedBlog.title, newBlog.title)
    assert.strictEqual(updatedBlog.author, newBlog.author)
    assert.strictEqual(updatedBlog.url, newBlog.url)
    assert.strictEqual(updatedBlog.likes, newBlog.likes)
  })

  after(() => {
    mongoose.connection.close()
  })
})
