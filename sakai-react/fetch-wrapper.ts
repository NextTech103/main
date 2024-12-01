// src/fetchWrapper.js
const originalFetch = fetch;

const customFetch = async (input, init) => {
  try {
    const response = await originalFetch(input, init);  // Pass arguments directly to fetch

    if (response.status === 401) {
        // Unauthorized, delete token and redirect to login
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
    }

    // Check the response status
    if (!response.ok) {
      console.log('Fetch Response:', response);
    } else {
      console.log('Fetch Response:', response);
    }

    return response;
  } catch (error) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    throw error;
  }
};

export default customFetch;
