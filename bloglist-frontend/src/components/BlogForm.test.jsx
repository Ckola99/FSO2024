import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test("<BlogForm /> checks that the form calls the event handler it received as props with the right details when a new blog is created.", async () => {
	const addBlog = vi.fn();
	const user = userEvent.setup();

	render(
		<BlogForm
			addBlog={addBlog}

		/>
	);
  	screen.debug();


	const titleInput = screen.getByPlaceholderText("title");
	const authorInput = screen.getByPlaceholderText("author");
	const urlInput = screen.getByPlaceholderText("url");
	const sendButton = screen.getByText("Create blog");

	await user.type(titleInput, "Netflix");
	await user.type(authorInput, "Chris");
	await user.type(urlInput, "www.Chris.co.za");
	await user.click(sendButton);

	expect(addBlog.mock.calls).toHaveLength(1);
	expect(addBlog).toHaveBeenCalledWith({
		title: "Netflix",
		author: "Chris",
		url: "www.Chris.co.za",
	});
});
