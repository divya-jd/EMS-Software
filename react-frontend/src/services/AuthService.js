import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8080/api/auth";

class AuthService {

    login(usernameOrEmail, password) {
        return axios.post(AUTH_API_BASE_URL + '/login', { usernameOrEmail, password });
    }

    logout() {
        localStorage.clear();
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ROLE_ADMIN';
    }

    isUserLoggedIn() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    getName() {
        return localStorage.getItem('name');
    }

    getToken() {
        return localStorage.getItem('token');
    }
}

// Interceptor to add token to requests
axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

const authService = new AuthService();
export default authService;
