const Notification = ({ message, type = "info" }) => {
	if (!message) return null;

	const styles = {
		padding: "10px",
		marginBottom: "10px",
		borderRadius: "5px",
		border: "1px solid",
		color: type === "error" ? "red" : "green",
		backgroundColor: "#f0f0f0",
	};

	return <div style={styles}>{message}</div>;
};

export default Notification;
