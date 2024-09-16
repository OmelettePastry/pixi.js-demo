import Graphology from "graphology";

export class Graph extends Graphology {
    
    public static generateRandomWeightSquareGridGraph(height: number, width: number): Graph {
        let graph = new Graph({multi: false, allowSelfLoops: false, type: "undirected"});

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < height; x++) {
                let nodeKey = y * width + x;
                graph.addNode(nodeKey,
                              { x: x,
                                y: y })
            }
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < height; x++) {
                if (x < width - 1) {
                    graph.addEdge(y * width + x, y * width + x + 1, { weight: Math.floor(Math.random() * 100 + 1) })
                }
                if (y < height - 1) {
                    graph.addEdge(y * width + x, (y + 1) * width + x, { weight: Math.floor(Math.random() * 100 + 1) })
                }
            }
        }

        return graph;
    }
}