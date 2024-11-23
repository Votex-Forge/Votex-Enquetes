class PollResults {
    constructor() {
        this.init();
    }

    init() {
        this.pollResultsContainer = document.getElementById('pollResults');
        this.loadResults();
    }

    async loadResults() {
        try {
            const pollId = this.getPollIdFromUrl() || localStorage.getItem('currentPollId');
            if (!pollId) {
                this.showMessage('Nenhuma enquete selecionada.', 'warning');
                return;
            }

            const results = await this.fetchPollResults(pollId);
            this.displayResults(results);
        } catch (error) {
            this.showMessage('Erro ao carregar resultados: ' + error.message, 'danger');
        }
    }

    async fetchPollResults(pollId) {
        try {
            const response = await fetch(`/api/polls/${pollId}/results`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao buscar resultados');
            }

            return await response.json();
        } catch (error) {
            throw new Error('Erro na requisição: ' + error.message);
        }
    }

    displayResults(pollData) {
        if (!this.pollResultsContainer) return;
        
        this.pollResultsContainer.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title mb-4">${pollData.question}</h3>
                    <div class="results-list">
                        ${this.generateOptionsHtml(pollData.options)}
                    </div>
                    <div class="mt-4">
                        <p class="mb-2"><strong>Total de votos:</strong> ${pollData.totalVotes}</p>
                        <p class="mb-2"><strong>Data de Expiração:</strong> ${new Date(pollData.expirationDate).toLocaleString()}</p>
                        <p class="mb-0"><strong>Status:</strong> ${this.getPollStatus(pollData.expirationDate)}</p>
                    </div>
                </div>
            </div>
        `;
    }

    generateOptionsHtml(options) {
        return options.map(option => `
            <div class="result-item mb-3">
                <div class="d-flex justify-content-between mb-1">
                    <span>${option.text}</span>
                    <span>${option.percentage.toFixed(1)}% (${option.votes} votos)</span>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" 
                         style="width: ${option.percentage}%"
                         aria-valuenow="${option.percentage}"
                         aria-valuemin="0"
                         aria-valuemax="100">
                    </div>
                </div>
            </div>
        `).join('');
    }

    getPollStatus(expirationDate) {
        const now = new Date();
        const expiration = new Date(expirationDate);
        return now > expiration ? 
            '<span class="badge bg-danger">Encerrada</span>' : 
            '<span class="badge bg-success">Ativa</span>';
    }

    getPollIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id');
    }

    showMessage(message, type = 'info') {
        if (this.pollResultsContainer) {
            this.pollResultsContainer.innerHTML = `
                <div class="alert alert-${type}" role="alert">
                    ${message}
                </div>
            `;
        }
    }

    static viewResults(pollId) {
        localStorage.setItem('currentPollId', pollId);
        window.location.href = `resultados.html?id=${pollId}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PollResults();
});