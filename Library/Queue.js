class Node {
    constructor(number, next = null) {
        this.number = number;
        this.next = next;
    }
}

class Queue {
    constructor(numList = null){
        this.head = null
        this.tail = null
        this.size = 0        
        if(numList){
            for (let num of numList){

            }
        }
    }

    enqueue(number){
        let newNode = new Node()
    }
}



let node = new Node(1);

console.log(node);