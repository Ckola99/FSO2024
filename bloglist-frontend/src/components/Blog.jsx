import { useState } from 'react'

const Blog = ({ blog, updateBlog,  removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    updateBlog(blog.id)
  }

  const handleDelete = () => {
   const confirmDelete = window.confirm(
		`Are you sure you want to delete the blog "${blog.title}" by ${blog.author}?`
   );

   if (confirmDelete) {
		removeBlog(blog.id);
   }
  }

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};

	return (
		<div style={blogStyle}>
			{blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      {visible && (<div>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.user.username}</p>
        { user.username === blog.user.username && (<button onClick={handleDelete}>delete</button>)}
      </div>)}
		</div>
	);
};

export default Blog;
