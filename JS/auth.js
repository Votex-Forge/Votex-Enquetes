const AUTH_TOKEN_KEY = 'auth_token';
const USER_DATA_KEY = 'user_data';

class Auth {
    static isAuthenticated() {
        return !!localStorage.getItem(AUTH_TOKEN_KEY);
    }

    static getToken() {
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }

    static setToken(token) {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
    }

    static logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
        window.location.href = 'login.html';
    }

    static updateNavbar() {
        const isAuth = this.isAuthenticated();
        document.querySelectorAll('.auth-show').forEach(el => 
            el.style.display = isAuth ? 'block' : 'none'
        );
        document.querySelectorAll('.auth-hide').forEach(el => 
            el.style.display = isAuth ? 'none' : 'block'
        );
    }
}