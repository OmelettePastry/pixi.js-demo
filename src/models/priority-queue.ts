import { PriorityQueueElement } from "../types/priority-queue-element";

export class PriorityQueue<T> {
    private _elements: PriorityQueueElement<T>[] = [];

    constructor() {}

    public enqueue(value: T, priority: number): void {
        const element = { value, priority };
        this._elements.push(element);
        this.bubbleUp(this._elements.length - 1);
    }

    public dequeue(): T | undefined {
        const result = this._elements[0];
        const end = this._elements.pop();
        if (this._elements.length > 0 && end) {
            this._elements[0] = end;
            this.bubbleDown(0);
        }
        return result ? result.value : undefined;
    }

    public isEmpty(): boolean {
        return this._elements.length === 0;
    }

    public length(): number {
        return this._elements.length;
    }

    public peek(): T | undefined {
        return this._elements[0]?.value;
    }

    private bubbleUp(index: number): void {
        const element = this._elements[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this._elements[parentIndex];
            if (element.priority >= parent.priority) {
                break;
            }
            this._elements[parentIndex] = element;
            this._elements[index] = parent;
            index = parentIndex;
        }
    }

    private bubbleDown(index: number): void {
        const length = this._elements.length;
        const element = this._elements[index];

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild!: PriorityQueueElement<T>;
            let rightChild: PriorityQueueElement<T>;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this._elements[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this._elements[rightChildIndex];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) {
                break;
            }

            this._elements[index] = this._elements[swap];
            this._elements[swap] = element;
            index = swap;
        }
    }
}