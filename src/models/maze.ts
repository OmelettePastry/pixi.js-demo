import { Graph } from "./graph";

export class Maze {
    private _graph: Graph;

    constructor(graph?: Graph) {
        this._graph = graph ? graph : new Graph();
    }


}