const input = require('fs').readFileSync('./dev/stdin', 'utf-8').trim().split('\n');

const [N, M] = input[0].split(" ").map(parseInt);

let nearList = new Array(N + 1).fill([])

for (let i = 1; i <= M; i++) {
    let [A, B] = input[i].split(' ').map(parseInt);

    nearList[A].push(B);
    nearList[B].push(A);
}