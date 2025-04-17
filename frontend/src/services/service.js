const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const REQUEST_TIMEOUT = 10000; // 10 seconds

// Generic function to handle all requests
const request = async (url, method, body = null, headers = {}, signal = null) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

        const config = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
                ...headers
            },
            signal: signal || controller.signal
        };

        if (body) {
            config.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${url}`, config);
        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json();
            throw {
                status: response.status,
                message: errorData.message || 'An error occurred',
                data: errorData
            };
        }

        return response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            throw {
                status: 408,
                message: 'Request timeout. Please try again.'
            };
        }
        throw error;
    }
};

// Generic GET request
export const getRequest = async (url, headers = {}, signal = null) => {
    return await request(url, 'GET', null, headers, signal);
};

// Generic POST request
export const postRequest = async (url, body, headers = {}, signal = null) => {
    return await request(url, 'POST', body, headers, signal);
};

// Generic PUT request
export const putRequest = async (url, body, headers = {}, signal = null) => {
    return await request(url, 'PUT', body, headers, signal);
};

// Generic DELETE request
export const deleteRequest = async (url, headers = {}, signal = null) => {
    return await request(url, 'DELETE', null, headers, signal);
};
