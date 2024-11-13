// Define um array para armazenar as enquetes criadas e um objeto para armazenar os votos dos usuários
const polls = [];
const userVotes = {};
const maxOptions = 10; // Limite máximo de opções

// Adiciona os event listeners para criação de enquete e para adicionar opções
document.getElementById('pollForm').addEventListener('submit', createPoll);
document.getElementById('addOptionButton').addEventListener('click', addOption);

// Função para adicionar uma nova opção de resposta na enquete
function addOption() {
    const optionsContainer = document.getElementById('options');
    const currentOptions = optionsContainer.getElementsByClassName('option');

    if (currentOptions.length < maxOptions) {
        const newOption = document.createElement('input');
        newOption.type = 'text';
        newOption.className = 'option';
        newOption.maxLength = 50;
        newOption.required = true;
        optionsContainer.appendChild(newOption);

        // Desabilita o botão se atingir o limite máximo
        if (currentOptions.length + 1 >= maxOptions) {
            document.getElementById('addOptionButton').disabled = true;
        }
    }
}

// Função para criar uma nova enquete
function createPoll(event) {
    event.preventDefault();
    
    const question = document.getElementById('question').value;
    const expiration = new Date(document.getElementById('expiration').value);
    const options = Array.from(document.getElementsByClassName('option')).map(opt => opt.value).filter(val => val);

// Cria um objeto com os dados da nova enquete
    const poll = {
        id: polls.length + 1,
        question,
        options: options.map((option) => ({ text: option, votes: 0 })),
        expiration,
        active: true
    };
    polls.push(poll);

    document.getElementById('creationStatus').innerText = "Enquete criada com sucesso!";
    renderActivePolls();
    event.target.reset();

    // Reativar o botão de adicionar opções
    document.getElementById('addOptionButton').disabled = false;
}

// Função para renderizar a lista de enquetes ativas
function renderActivePolls() {
    const pollList = document.getElementById('pollList');
    pollList.innerHTML = '';

// Filtra e exibe apenas as enquetes ativas e que ainda não expiraram
    polls.filter(poll => poll.active && poll.expiration > new Date()).forEach(poll => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${poll.question} (Expira em: ${poll.expiration.toLocaleString()})</span>
            <button onclick="votePoll(${poll.id})">Votar</button>
            <button onclick="viewResults(${poll.id})">Ver Resultados</button>
        `;
        pollList.appendChild(listItem);
    });
}

// Função para votar em uma enquete
function votePoll(id) {
    const poll = polls.find(p => p.id === id);
    if (!poll || !poll.active || poll.expiration <= new Date()) {
        alert("A enquete não está mais ativa.");
        return;
    }

// Solicita ao usuário que escolha uma opção de voto pelo número
    const userVote = prompt(`Escolha uma opção pelo número:\n${poll.options.map((opt, i) => `${i + 1}. ${opt.text}`).join('\n')}`);
    const choice = parseInt(userVote) - 1;

// Verifica se o usuário ainda não votou e se a opção escolhida é válida
    if (!userVotes[id] && poll.options[choice]) {
        poll.options[choice].votes++;
        userVotes[id] = true;
        alert("Voto registrado com sucesso!");
        viewResults(id);
    } else {
        alert("Você já votou nesta enquete ou a opção é inválida.");
    }
}

// Função para visualizar os resultados de uma enquete
function viewResults(id) {
    const poll = polls.find(p => p.id === id);
    if (!poll) return;

    document.getElementById('pollResults').style.display = 'block';
    const resultContent = document.getElementById('resultContent');
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
 // Exibe cada opção com o percentual de votos
    resultContent.innerHTML = `
        <h3>${poll.question}</h3>
        ${poll.options.map((opt, index) => `
            <div>
                <span>${index + 1}. ${opt.text}: ${(opt.votes / totalVotes * 100 || 0).toFixed(2)}%</span>
                <span>(${opt.votes} votos)</span>
            </div>
        `).join('')}
    `;
}

renderActivePolls();

// Função para verificar se a enquete está ativa com base no tempo de início e término
function renderActivePolls() {
    const pollList = document.getElementById('pollList');
    pollList.innerHTML = '';

    polls.filter(poll => poll.active && poll.expiration > new Date()).forEach(poll => {
        const listItem = document.createElement('li');
        listItem.className = 'poll-item';

        // Adiciona título da enquete
        listItem.innerHTML = `
            <h3>${poll.question}</h3>
            <p><strong>Expira em:</strong> ${poll.expiration.toLocaleString()}</p>
        `;

        // Adiciona opções de resposta
        const optionsList = document.createElement('ul');
        optionsList.className = 'poll-options';
        poll.options.forEach((option, index) => {
            const optionItem = document.createElement('li');
            optionItem.textContent = `${index + 1}. ${option.text}`;
            optionsList.appendChild(optionItem);
        });
        listItem.appendChild(optionsList);

        // Botões para votar e ver resultados
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'poll-buttons';

        const voteButton = document.createElement('button');
        voteButton.textContent = 'Votar';
        voteButton.className = 'vote-btn';
        voteButton.onclick = () => votePoll(poll.id);

        const resultsButton = document.createElement('button');
        resultsButton.textContent = 'Ver Resultados';
        resultsButton.className = 'results-btn';
        resultsButton.onclick = () => viewResults(poll.id);

        resultsButton.onclick = () => {
            // Armazena o ID da enquete no localStorage para ser acessado na página de resultados
            localStorage.setItem("selectedPollId", poll.id);
            window.location.href = "resultados.html"; // Redireciona para a página de resultados
        };

        buttonsContainer.appendChild(voteButton);
        buttonsContainer.appendChild(resultsButton);
        listItem.appendChild(buttonsContainer);

        pollList.appendChild(listItem);
    });
}
function isPollActive(startTime, endTime) {
    const currentTime = new Date();
    return currentTime >= new Date(startTime) && currentTime <= new Date(endTime);
}

// Função para exibir as enquetes ativas
function displayPolls(polls) {
    const pollList = document.getElementById("pollList");

    polls.forEach(poll => {
        // Criar o item da lista para a enquete
        const listItem = document.createElement("li");
        listItem.classList.add("poll-item");

        // Verificar o status da enquete
        const status = isPollActive(poll.startTime, poll.endTime) ? "Ativa" : "Encerrada";

        // Exibir título da enquete e o status
        listItem.innerHTML = `
            <h3>${poll.question}</h3>
            <p>Status: <strong>${status}</strong></p>
        `;

        // Adicionar o item à lista
        pollList.appendChild(listItem);
    });
}
