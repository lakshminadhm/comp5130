const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Generic function to handle all requests
const request = async (url, method, body = null, headers = {}) => {
    try {
        const config = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                ...headers // Spread the additional headers if any
            },
        };

        if (body) {
            console.log(body)
            config.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${url}`, config);

        // Check if response is not ok, throw error
        if (!response.ok) {
            return {errorCode:response.status, errorMessage: await response.json() };
        }

        return response.json(); // Parse response as JSON
    } catch (error) {
        console.log(error)
        throw error;  // Propagate the error to be handled in the component
    }
};

// Generic GET request
export const getRequest = async (url, headers = {}) => {
    return await request(url, 'GET', null, headers);
};

// Generic POST request
export const postRequest = async (url, body, headers = {}) => {
    return await request(url, 'POST', body, headers);
};

// Generic PUT request
export const putRequest = async (url, body, headers = {}) => {
    return await request(url, 'PUT', body, headers);
};

// Generic DELETE request
export const deleteRequest = async (url, headers = {}) => {
    return await request(url, 'DELETE', null, headers);
};
