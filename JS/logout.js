document.getElementById("logoutButton").addEventListener("click", function() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = 'home.html';
});
