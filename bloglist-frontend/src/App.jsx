import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState(null);
	const [loginVisible, setLoginVisible] = useState(false);
	const [ascending, setAscending] = useState(false);
	const blogFormRef = useRef()

	const toggleSortOrder = () => {
		setAscending(!ascending);
	};

	const sortedBlogs = blogs.sort((a, b) =>
		ascending ? a.likes - b.likes : b.likes - a.likes
	);

	useEffect(() => {
		const loggedInBlogger =
			window.localStorage.getItem("loggedInBlogger");
		if (loggedInBlogger) {
			const user = JSON.parse(loggedInBlogger);
			setUser(user);
			blogService.setToken(user.token);
		}
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({
				username,
				password,
			});
			window.localStorage.setItem(
				"loggedInBlogger",
				JSON.stringify(user)
			);
			blogService.setToken(user.token);
			setUser(user);
			setUsername("");
			setPassword("");
		} catch (error) {
			setMessage({
				text: "Wrong credentials",
				type: "error",
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const handleLogout = () => {
		setUser(null);
		window.localStorage.removeItem("loggedInBlogger");
		setMessage({ text: "successful logout", type: "info" });
		setTimeout(() => {
			setMessage(null);
		}, 5000);
	};

	const addBlog = async (newBlog) => {
		blogFormRef.current.toggleVisibility()
		try {


			const savedBlog = await blogService.create(newBlog);
			setBlogs(blogs.concat(savedBlog)); // Update state to display the new blog
			setMessage({
				text: `A new blog ${savedBlog.title} by ${newBlog.author} added`,
				type: "info",
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (error) {
			setMessage({
				text: `Blog ${newBlog.title}`,
				type: "error",
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		}
	};

	const updateBlog = async (id) => {
		const blog = blogs.find((b) => b.id === id);
		const updatedBlog = { ...blog, likes: blog.likes + 1 };

		try {
			const returnedBlog = await blogService.update(
				id,
				updatedBlog
			);
			setBlogs(
				blogs.map((b) =>
					b.id !== id ? b : returnedBlog
				)
			);
		} catch (error) {
			console.error("Error updating blog:", error);
		}
	};

	const deleteBlog = async (id) => {
		const blog = blogs.find((b) => b.id === id);

		if (!blog) {
			return;
		}

		try {
			await blogService.remove(id); // Remove the blog on the server
			setBlogs(blogs.filter((b) => b.id !== id)); // Filter out the deleted blog
			setMessage({
				text: `Blog "${blog.title}" by ${blog.author} deleted successfully`,
				type: "info",
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
		} catch (error) {
			setMessage({
				text: `Error deleting blog "${blog.title}" ${error.message.includes(403) ? "unauthorised user" : "oops something is wrong"}`,
				type: "error",
			});
			setTimeout(() => {
				setMessage(null);
			}, 5000);
			console.error("Error deleting blog:", error);
		}
	};

	const loginForm = () => {
		const hideWhenVisible = {
			display: loginVisible ? "none" : "",
		};
		const showWhenVisible = {
			display: loginVisible ? "" : "none",
		};

		return (
			<div>
				<div style={hideWhenVisible}>
					<button
						onClick={() =>
							setLoginVisible(true)
						}
					>
						log in
					</button>
				</div>
				<div style={showWhenVisible}>
					<LoginForm
						username={username}
						password={password}
						handleUsernameChange={({
							target,
						}) => setUsername(target.value)}
						handlePasswordChange={({
							target,
						}) => setPassword(target.value)}
						handleSubmit={handleLogin}
					/>
					<button
						onClick={() =>
							setLoginVisible(false)
						}
					>
						cancel
					</button>
				</div>
			</div>
		);
	};

	const blogList = () => (
		<div>
			<h2>blogs</h2>
			<p>{user.name} logged in</p>{" "}
			<button onClick={handleLogout}>logout</button>
			<Togglable buttonLabel="new blog" ref={blogFormRef}>
				<BlogForm
					addBlog={addBlog}
					setNewTitle={setNewTitle}
					setNewUrl={setNewUrl}
					setNewAuthor={setNewAuthor}
					newAuthor={newAuthor}
					newUrl={newUrl}
					newTitle={newTitle}
				/>
			</Togglable>
			<button onClick={toggleSortOrder}>
				Sort by likes:{" "}
				{ascending ? "Ascending" : "Descending"}
			</button>
			{sortedBlogs.map((blog, index) => (
				<Blog
					key={blog.id || index}
					blog={blog}
					updateBlog={updateBlog}
					removeBlog={deleteBlog}
					user={user}
				/>
			))}
		</div>
	);

	return (
		<div>
			<Notification
				message={message?.text}
				type={message?.type}
			/>
			{user === null ? (
				<div>
					<h1>log in to application</h1>
					{loginForm()}
				</div>
			) : (
				blogList()
			)}
		</div>
	);
};

export default App;
