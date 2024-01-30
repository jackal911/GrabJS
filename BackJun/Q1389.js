// https://www.acmicpc.net/problem/1389

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

const input = require('fs').readFileSync('./dev/stdin', 'utf-8').split('\n').map(e => e.trim());

const [N, M] = input[0].split(" ").map(e => parseInt(e));

let KevinBaconList = Array.from({ length: N + 1 }, () => new Array(N + 1).fill(0));

let nearList = Array.from({ length: N + 1 }, () => new Set());

for (let i = 1; i <= M; i++) {
    let [A, B] = input[i].split(' ').map(e => parseInt(e));

    KevinBaconList[A][B] = 1;
    KevinBaconList[B][A] = 1;

    nearList[A].add(B);
    nearList[B].add(A);
}

for (let i = 1; i <= N; i++) {
    let isVisitList = new Array(N + 1).fill(false);
    isVisitList[i] = true; // 시작노드 방문처리

    let queue = new Queue([i]);

    while (queue.getSize()) {
        let personNum = queue.dequeue();

        let nextPersonList = new Set(nearList[personNum]);

        for (let nearPerson of nearList[personNum]) {
            if (isVisitList[nearPerson] == true) {
                nextPersonList.delete(nearPerson);
            } else {
                isVisitList[nearPerson] = true;
            }
        }

        for (let nearPerson of nextPersonList) {
            queue.enqueue(nearPerson);

            let checkDistanceList = [KevinBaconList[i][personNum] + 1]

            if (KevinBaconList[i][nearPerson]) {
                checkDistanceList.push(KevinBaconList[i][nearPerson]);
            }

            KevinBaconList[i][nearPerson] = Math.min(...checkDistanceList);
        }
    }
}

let minKevinBacon = Number.MAX_SAFE_INTEGER;
let leastKevinBaconPerson = 0;

for (let i = 1; i <= N; i++) {
    let KevinBacon = KevinBaconList[i].reduce((p, c) => p + c);

    if (KevinBacon < minKevinBacon) {
        minKevinBacon = KevinBacon;
        leastKevinBaconPerson = i;
    }
}

console.log(leastKevinBaconPerson);