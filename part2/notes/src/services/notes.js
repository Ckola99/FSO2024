import axios from 'axios';

const baseUrl = '/api/notes';

let token = null;

const setToken = newToken => {
	token = `Bearer ${newToken}`
}

const getAll = async () => {
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const create = async (newObject) => {

	const config = {
		headers: { Authorization: token },
	}

	try {
		const response = await axios.post(baseUrl, newObject, config);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

const update = async (id, newObject) => {
	try {
		const response = await axios.put(`${baseUrl}/${id}`, newObject);
		return response.data;
	} catch (error) {
		handleAxiosError(error);
	}
};

// Centralized error handling function
const handleAxiosError = (error) => {
	if (axios.isAxiosError(error)) {
		// Check if the error has a response
		if (error.response) {
			// Server responded with a status code other than 2xx
			console.error('Error Status:', error.response.status);
			console.error('Error Message:', error.response.data.error || 'No error message available');
			throw new Error(`Error: ${error.response.data.error || 'Request failed'}`);
		} else if (error.request) {
			// The request was made but no response was received
			console.error('Error Request:', error.request);
			throw new Error('Network error: No response received from server');
		} else {
			// Something happened in setting up the request that triggered an error
			console.error('Error Message:', error.message);
			throw new Error(`Error: ${error.message}`);
		}
	} else {
		// Not an Axios error
		console.error('Unexpected error:', error);
		throw new Error('An unexpected error occurred');
	}
};

export default {
	getAll,
	create,
	update,
	setToken
};
