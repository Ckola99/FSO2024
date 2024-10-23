import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [newTitle, setNewTitle] = useState("");
	const [newAuthor, setNewAuthor] = useState("");
	const [newUrl, setNewUrl] = useState("");
	const [message, setMessage] = useState(null);

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

	const addBlog = async (event) => {
		event.preventDefault();
		try {
			if (!newTitle || !newAuthor || !newUrl) {
				setMessage({
					text: "missing credentials",
					type: "error",
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			}

			const newBlog = {
					title: newTitle,
					author: newAuthor,
					url: newUrl,
			};

			const savedBlog = await blogService.create(newBlog);
			setBlogs(blogs.concat(savedBlog)); // Update state to display the new blog
			setNewTitle("");
			setNewAuthor("");
			setNewUrl("");
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

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				username{" "}
				<input
					type="text"
					value={username}
					name="Username"
					onChange={({ target }) =>
						setUsername(target.value)
					}
				/>
			</div>
			<div>
				password{" "}
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) =>
						setPassword(target.value)
					}
				/>
			</div>
			<button type="submit" onClick={handleLogin}>
				login
			</button>
		</form>
	);

	const blogForm = () => (
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

	const blogList = () => (
		<div>
			<h2>blogs</h2>
			<p>{user.name} logged in</p>{" "}
			<button onClick={handleLogout}>logout</button>
			{blogForm()}
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
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
