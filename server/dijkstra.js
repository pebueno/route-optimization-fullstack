// O algoritmo de Dijkstra foi implementado para encontrar o caminho mais curto em um grafo:
function dijkstra(graph, start) {
    // Inicializa um array de distâncias com infinito para todos os nós.
    const distances = Array(graph.length).fill(Number.POSITIVE_INFINITY);
    // Define a distância do nó de início como 0.
    distances[start] = 0;

    // Fila de prioridade para armazenar os nós a serem processados.
    const priorityQueue = [[0, start]];

    while (priorityQueue.length > 0) {
        // Remove o nó com a menor distância da fila.
        const [currentDistance, currentNode] = priorityQueue.shift();

        // Verifica se já processamos esse nó.
        if (currentDistance > distances[currentNode]) continue;

        // Itera sobre os vizinhos do nó atual.
        for (let neighbor = 0; neighbor < graph.length; neighbor++) {
            const weight = graph[currentNode][neighbor];
            const distance = currentDistance + weight;

            // Atualiza a distância se encontrarmos um caminho mais curto.
            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                // Adiciona o vizinho à fila de prioridade.
                priorityQueue.push([distance, neighbor]);
                // Ordena a fila para garantir que o próximo nó a ser processado seja o mais próximo.
                priorityQueue.sort((a, b) => a[0] - b[0]);
            }
        }
    }

    // Retorna as distâncias mínimas a partir do nó de início.
    return distances;
}

// Função auxiliar para calcular a distância entre dois pontos:
function calculateDistance(point1, point2) {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
}

// Função para criar um grafo representando as distâncias entre os pontos:
function createGraph(points) {
    const numPoints = points.length;
    // Inicializa uma matriz de adjacência com distâncias inicialmente infinitas.
    const graph = Array(numPoints).fill(null).map(() => Array(numPoints).fill(Number.POSITIVE_INFINITY));

    // Preenche a matriz de adjacência com as distâncias reais entre os pontos.
    for (let i = 0; i < numPoints; i++) {
        for (let j = i + 1; j < numPoints; j++) {
            graph[i][j] = graph[j][i] = calculateDistance(points[i], points[j]);
        }
    }

    // Retorna o grafo criado.
    return graph;
}

// Função principal para encontrar a rota mais curta com base nas coordenadas dos clientes:
function findShortestRoute(points) {
    // Cria um grafo com base nas coordenadas dos clientes.
    const graph = createGraph(points);

    // Executa o algoritmo de Dijkstra começando da posição da Empresa (0,0).
    const distances = dijkstra(graph, 0);

    // Ordena os pontos com base nas distâncias.
    const sortedPoints = [...points].sort((a, b) => distances[a.client_id - 1] - distances[b.client_id - 1]);

    // Retorna o caminho mais curto usando os valores de client_id.
    return sortedPoints.map(point => point.client_id);
}

module.exports = findShortestRoute;