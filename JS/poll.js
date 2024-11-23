class PollService {
    static async createPoll(pollData) {
        const response = await fetch('/api/polls', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify(pollData)
        });
        return response.json();
    }

    static async getActivePolls() {
        const response = await fetch('/api/polls/active');
        return response.json();
    }

    static async vote(pollId, optionId) {
        const response = await fetch(`/api/polls/${pollId}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Auth.getToken()}`
            },
            body: JSON.stringify({ optionId })
        });
        return response.json();
    }
}