function viewResults(pollId) {
    // Salvar os dados da enquete no localStorage
    localStorage.setItem("pollResults", JSON.stringify(pollData));

    // Redirecionar para a página de resultados
    window.location.href = "resultados.html";
}

// Função que captura o envio do formulário e redireciona
function handlePollSubmit(event) {
    event.preventDefault();  // Previne o envio normal do formulário
    
    // Captura os dados do formulário
    const question = document.getElementById('question').value;
    const options = Array.from(document.querySelectorAll('.option')).map(input => input.value);
    const expiration = document.getElementById('expiration').value;
    
    // Cria um objeto com os dados da enquete
    const pollData = {
        question: question,
        options: options,
        expiration: expiration
    };
    
    // Armazena os dados da enquete no localStorage ou envia para o backend
    localStorage.setItem('pollData', JSON.stringify(pollData));
    
    // Redireciona para a página de resultados
    window.open('resultados.html', '_blank');
}

const pollData = JSON.parse(localStorage.getItem('pollData'));
        
        if (pollData) {
            const pollResultsContainer = document.getElementById('pollResults');
            pollResultsContainer.innerHTML = `
                <p><strong>Pergunta:</strong> ${pollData.question}</p>
                <p><strong>Opções:</strong></p>
                <ul>
                    ${pollData.options.map(option => `<li>${option}</li>`).join('')}
                </ul>
                <p><strong>Data de Expiração:</strong> ${new Date(pollData.expiration).toLocaleString()}</p>
            `;
        } else {
            document.getElementById('pollResults').innerHTML = 'Nenhuma enquete encontrada.';
        }