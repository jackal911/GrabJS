// Queue가 없다길래 만듦

class Node {
    constructor(number, next = null) {
        this.number = number;
        this.next = next;
    }
}

class Queue {
    #head;
    #tail;
    #size;

    constructor(numList = null) {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
        if (numList) {
            for (let num of numList) {
                this.enqueue(num);
            }
        }
    }

    enqueue(number) {
        let newNode = new Node(number);

        if (this.#size == 0) {
            this.#head = newNode;
            this.#tail = newNode;
        } else {
            this.#tail.next = newNode;
            this.#tail = newNode;
        }

        this.#size++;
    }

    enqueueRange(list) {
        for (let number of list) {
            this.enqueue(number);
        }
    }

    dequeue() {
        let dequeueNum = null;

        if (this.#size) {
            let dequeueNode = this.#head;
            dequeueNum = dequeueNode.number;
            this.#head = dequeueNode.next;
            dequeueNode = null;
            this.#size--;
        }

        return dequeueNum;
    }

    getSize() {
        return this.#size;
    }

    getHead() {
        return this.#head;
    }
}