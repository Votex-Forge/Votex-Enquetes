document.getElementById('pollForm').addEventListener('submit', createPoll);

function createPoll(event) {
    event.preventDefault();

    const question = document.getElementById('question').value;
    const expiration = new Date(document.getElementById('expiration').value);
    const options = Array.from(document.getElementsByClassName('option')).map(opt => opt.value).filter(val => val);

    // Cria a nova enquete
    const poll = {
        id: Date.now(),  // Usando o timestamp como ID único
        question,
        options: options.map((option) => ({ text: option, votes: 0 })),
        expiration,
        active: true
    };

    // Recupera as enquetes existentes e adiciona a nova
    const polls = JSON.parse(localStorage.getItem('polls')) || [];
    polls.push(poll);
    localStorage.setItem('polls', JSON.stringify(polls));

    alert("Enquete criada com sucesso!");
    window.location.href = 'adminPanel.html';  // Redireciona para o painel administrativo
}
