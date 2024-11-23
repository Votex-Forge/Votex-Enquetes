class AdminPanel {
    constructor() {
        this.setupEventListeners();
        this.loadPolls();
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.edit-btn')) {
                this.handleEdit(e.target.dataset.pollId);
            } else if (e.target.matches('.delete-btn')) {
                this.handleDelete(e.target.dataset.pollId);
            }
        });
    }

    async loadPolls() {
        try {
            const polls = await this.fetchPolls();
            this.renderPolls(polls);
        } catch (error) {
            this.showError('Erro ao carregar enquetes: ' + error.message);
        }
    }

    async fetchPolls() {
        const response = await fetch('/api/polls', {
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        if (!response.ok) throw new Error('Falha ao buscar enquetes');
        return response.json();
    }

    renderPolls(polls) {
        const tbody = document.querySelector('#pollsTable tbody');
        if (!tbody) return;

        tbody.innerHTML = polls.map(poll => `
            <tr>
                <td>${poll.question}</td>
                <td>${new Date(poll.expirationDate).toLocaleDateString()}</td>
                <td>${poll.active ? 'Ativa' : 'Encerrada'}</td>
                <td>
                    <button class="btn btn-warning edit-btn" data-poll-id="${poll.id}">
                        Editar
                    </button>
                    <button class="btn btn-danger delete-btn" data-poll-id="${poll.id}">
                        Excluir
                    </button>
                </td>
            </tr>
        `).join('');
    }

    async handleEdit(pollId) {
        try {
            const poll = await this.fetchPollDetails(pollId);
            this.showEditModal(poll);
        } catch (error) {
            this.showError('Erro ao carregar detalhes da enquete');
        }
    }

    async handleDelete(pollId) {
        if (!confirm('Tem certeza que deseja excluir esta enquete?')) return;

        try {
            await this.deletePoll(pollId);
            await this.loadPolls();
            this.showSuccess('Enquete excluída com sucesso');
        } catch (error) {
            this.showError('Erro ao excluir enquete');
        }
    }

    async deletePoll(pollId) {
        const response = await fetch(`/api/polls/${pollId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${Auth.getToken()}`
            }
        });
        if (!response.ok) throw new Error('Falha ao excluir enquete');
    }

    showError(message) {
        
        alert(message);
    }

    showSuccess(message) {
        
        alert(message);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new AdminPanel();
});