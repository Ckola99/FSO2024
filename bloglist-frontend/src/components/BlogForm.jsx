import PropTypes from "prop-types";

const BlogForm = ({
	addBlog,
	setNewTitle,
	setNewAuthor,
	setNewUrl,
	newAuthor,
	newTitle,
	newUrl,
}) => (
	<form onSubmit={addBlog}>
		<div>
			Title:{" "}
			<input
				type="text"
				value={newTitle}
				onChange={({ target }) =>
					setNewTitle(target.value)
				}
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
			/>
		</div>
		<button type="submit" onClick={addBlog}>
			{" "}
			Create blog{" "}
		</button>
	</form>
);

BlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
	setNewUrl: PropTypes.func.isRequired,
	setNewTitle: PropTypes.func.isRequired,
	setNewAuthor: PropTypes.func.isRequired,
	newAuthor: PropTypes.string.isRequired,
	newTitle: PropTypes.string.isRequired,
	newUrl: PropTypes.string.isRequired
};

export default BlogForm;
