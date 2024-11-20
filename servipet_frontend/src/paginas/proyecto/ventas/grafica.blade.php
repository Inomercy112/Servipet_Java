
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var ctx = document.getElementById('gananciasChart').getContext('2d');
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    datasets: [{
                        label: 'Ganancias',
                        data: [160000, 400000, 690000, 453000, 679000, 469300, 369000, 705000, 450000, 780000, 190000, 14000],
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
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
        });
    </script>

