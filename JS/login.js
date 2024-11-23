document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('senha').value;

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) throw new Error('Falha no login');

        const data = await response.json();
        Auth.setToken(data.token);
        window.location.href = 'home.html';
    } catch (error) {
        alert('Erro no login: ' + error.message);
    }
});