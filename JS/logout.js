class LogoutManager {
    constructor() {
        this.setupLogoutButton();
    }

    setupLogoutButton() {
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', this.handleLogout.bind(this));
        }
    }

    async handleLogout() {
        try {
            await this.logoutRequest();
            this.clearUserSession();
            this.redirectToHome();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            alert('Erro ao fazer logout. Tente novamente.');
        }
    }

    async logoutRequest() {
        const token = localStorage.getItem('auth_token');
        if (!token) return;

        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Erro na requisição de logout:', error);
        }
    }

    clearUserSession() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
    }

    redirectToHome() {
        window.location.href = 'home.html';
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    new LogoutManager();
});