import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test("renders blog's title and author by default", () => {
	const blog = {
		title: 'some Title',
		author: 'some guy',
		url: 'www.realniggas.com'
	}

	render(<Blog blog={blog}/>)

	const element =  screen.getByText('some Title some guy')

	expect(element).toBeDefined()
})

test("renders blog's number of likes and url by when the button controlling the shown details has been clicked", async () => {
	const user = {
			username: "coolGuy",
			name: "Jeff",
			id: 125654568,
		}

	const blog = {
		title: "some Title",
		author: "some guy",
		url: "www.realniggas.com",
		likes: 12,
		user: {
			username: "coolGuy",
			name: "Jeff",
			id: 125654568,
		},
	};


	render(<Blog blog={blog} user={user}/>);

	const person =  userEvent.setup()
	const button = screen.getByText('view')
	await person.click(button)

	expect(screen.getByText(blog.url)).toBeInTheDocument();
	expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument();
});

test("calls the like event handler twice when the like button is clicked twice", async () => {
	const user = {
		username: "coolGuy",
		name: "Jeff",
		id: 125654568,
	};

	const blog = {
		title: "some Title",
		author: "some guy",
		url: "www.realniggas.com",
		likes: 12,
		user: {
			username: "coolGuy",
			name: "Jeff",
			id: 125654568,
		},
	};

	const updateBlog = vi.fn(); // Mock the updateBlog handler

	render(<Blog blog={blog} updateBlog={updateBlog} user={user} />);

	const person = userEvent.setup();
	const viewButton = screen.getByText("view");
	await person.click(viewButton);

	const likeButton = screen.getByText("like");
	await person.click(likeButton);
	await person.click(likeButton);

	// Expect the updateBlog handler to have been called twice
	expect(updateBlog).toHaveBeenCalledTimes(2);
});
