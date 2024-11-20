//Fiz essa parte com o chat, achei que ficou top então deixei.




// Dados do gráfico (exemplo com votos de uma enquete)
const ctx = document.getElementById('graficoEnquete').getContext('2d');
const graficoEnquete = new Chart(ctx, {
    type: 'bar', // Tipo do gráfico
    data: {
        labels: ['Segunda-feira', 'Sexta-feira'], // Opções de resposta
        datasets: [{
            label: 'Votos',
            data: [10, 40], // Número de votos em cada opção
            backgroundColor: ['#007bff', '#28a745'], // Cores das barras
            borderColor: ['#0056b3', '#218838'], // Bordas das barras
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
