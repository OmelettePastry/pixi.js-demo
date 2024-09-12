import { PriorityQueueElement } from "../types/priority-queue-element";

export class PriorityQueue<T> {
    private elements: PriorityQueueElement<T>[] = [];

    constructor() {}

    public enqueue(value: T, priority: number): void {
        const element = { value, priority };
        this.elements.push(element);
        this.bubbleUp(this.elements.length - 1);
    }

    public dequeue(): T | undefined {
        const result = this.elements[0];
        const end = this.elements.pop();
        if (this.elements.length > 0 && end) {
            this.elements[0] = end;
            this.bubbleDown(0);
        }
        return result ? result.value : undefined;
    }

    public isEmpty(): boolean {
        return this.elements.length === 0;
    }

    public length(): number {
        return this.elements.length;
    }

    public peek(): T | undefined {
        return this.elements[0]?.value;
    }

    private bubbleUp(index: number): void {
        const element = this.elements[index];
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            const parent = this.elements[parentIndex];
            if (element.priority >= parent.priority) {
                break;
            }
            this.elements[parentIndex] = element;
            this.elements[index] = parent;
            index = parentIndex;
        }
    }

    private bubbleDown(index: number): void {
        const length = this.elements.length;
        const element = this.elements[index];

        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let leftChild!: PriorityQueueElement<T>;
            let rightChild: PriorityQueueElement<T>;
            let swap = null;

            if (leftChildIndex < length) {
                leftChild = this.elements[leftChildIndex];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                rightChild = this.elements[rightChildIndex];
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

            this.elements[index] = this.elements[swap];
            this.elements[swap] = element;
            index = swap;
        }
    }
}