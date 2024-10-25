import PropTypes from "prop-types";
import { useState } from "react";

const BlogForm = ({ addBlog }) => {
	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");

	const createBlog = (event) => {
		event.preventDefault();
		if (!newTitle || !newAuthor || !newUrl) {
			setMessage({
				text: "missing credentials",
				type: "error",
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			return;
		}

		addBlog({
			title: newTitle,
			author: newAuthor,
			url: newUrl,
		});

		setNewTitle("");
		setNewAuthor("");
		setNewUrl("");
	};

	return (
		<form onSubmit={createBlog}>
			<div>
				Title:{" "}
				<input
					type="text"
					value={newTitle}
					onChange={({ target }) =>
						setNewTitle(target.value)
					}
					placeholder="title"
				/>
			</div>
			<div>
				Author:{" "}
				<input
					type="text"
					value={newAuthor}
					onChange={({ target }) =>
						setNewAuthor(target.value)
					}
					placeholder="author"
				/>
			</div>
			<div>
				URL:{" "}
				<input
					type="text"
					value={newUrl}
					onChange={({ target }) =>
						setNewUrl(target.value)
					}
					placeholder="url"
				/>
			</div>
			<button type="submit">Create blog</button>
		</form>
	);
};

BlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
