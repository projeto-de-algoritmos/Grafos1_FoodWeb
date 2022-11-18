const prompt = require('prompt-sync')();

function printf(str) {
  return process.stdout.write(str);
}

class Queue {
  constructor(N, p, u) {
    this.n = N; //tamanho
    this.p = 0; //primeiro
    this.u = 0; //ultimo
    this.dados = [] //ultimo
  }

  put(e) {
    this.dados[this.u] = e;
    this.u = parseInt((this.u + 1) % this.n);
  }

  isEmpty() {
    return this.p == this.u
  }

  remove() {
    if (this.isEmpty()) {
      return null;
    }

    const aux = this.dados[this.p];
    this.p = parseInt((this.p + 1) % this.n);
    return aux;
  }
}

class Edge {
  constructor(n1, n2) {
    this.n1 = n1; //node1
    this.n2 = n2; //node2
  }
}

class Node {
  constructor(v, t, c, next) {
    this.v = v; //valor
    this.t = t; //tipo
    this.c = c; //custo
    this.isLinked = false;
    this.isVisited = false;
    this.disabled = false;
    this.next = next;
  }

  printNodeValue() {
    if (this.disabled) {
      return 'cu';
    }
    if (!this.isLinked) {
      return '■■';
    }
    if (this.t === 'inicio') {
      return 'II';
    }
    else if (this.t == 'final') {
      return 'FF';
    }
    else if (this.v < 10) {
      return `0${this.v}`;
    }
    return `${this.v}`;
  }

  printHorizontalEdge(j, orientacao) {
    let node = this.next;
    while(node) {
      if (orientacao == 2 && node.v == j + 1) {
        return '►►';
      }
      else if (orientacao == 1 && node.v == j - 1) {
        return '◄◄';
      }
      node = node.next;
    }
  
    return '  ';
  }
  
  printVerticalEdge(j, numLinhas, orientacao) {
    let node = this.next;
    while(node) {
      if (orientacao == 1 && node.v == j + numLinhas) {
        return '▼▼';
      }
      else if (orientacao == 2 && node.v == j - numLinhas) {
        return '▲▲';
      }
      node = node.next;
    }
  
    return '  ';
  }
  
  printDiagonalEdge(j, numLinhas, tipoDiagonal) {
    let node = this.next;
    while(node) {
      if (tipoDiagonal === 0 && node.v == j - numLinhas - 1) {
        return '\\\\';
      }
      if (tipoDiagonal === 1 && node.v == j - numLinhas + 1) {
        return '//';
      }
      if (tipoDiagonal === 2 && node.v == j + numLinhas - 1) {
        return '//';
      }
      if (tipoDiagonal === 3 && node.v == j + numLinhas + 1) {
        return '\\\\';
      }
      node = node.next;
    }
  
    return '  ';
  }
}

class Graph {
  constructor(N) {
    this.n = N; //numero de nos
    this.e = 0; //numero de arestas
    this.numLinhas = Math.sqrt(N); //numero para labirinto
    const aux = [];
    for (let idx = 0; idx < N; idx++) {
      aux.push(new Node(idx, 'normal', 0, null));
    }
    this.adj = aux;
  }

  insertEdge(edge) {
    const n1 = edge.n1;
    const n2 = edge.n2;
  
    this.adj[n1].next = new Node(n2, 'normal', 0, this.adj[n1].next);
    this.adj[n2].next = new Node(n1, 'normal', 0, this.adj[n2].next);
    this.e++;
  
    this.adj[n1].isLinked = true;
    this.adj[n2].isLinked = true;
  }

  printGraph() {
    for (let idx = 0; idx < this.n; idx++) {
      if (!this.adj[idx].next) {
        //printf(" -> NULL");
        //printf("\n");
        continue;
      }
      printf(`v${idx}`);
      let l = this.adj[idx].next;
      while (l) {
        printf(` -> ${l.v}`);
        l = l.next;
      }
      printf("\n");
    }
  }

  printMaze() {
    for (let i = 0; i < this.numLinhas; i++) {
      const initialValue = i * this.numLinhas;
      const maxValue = this.numLinhas * (i+1);
      if (i != 0) {
        for (let j = initialValue; j < maxValue; j++) {
          const node = this.adj[j];
          printf(`${node.printDiagonalEdge(j, this.numLinhas, 0)}`);
          printf(`${node.printVerticalEdge(j, this.numLinhas, 2)}`);
          printf(`${node.printDiagonalEdge(j, this.numLinhas, 1)}`);
        }
      }
      printf("\n");
      for (let j = initialValue; j < maxValue; j++) {
        const node = this.adj[j];
        printf(node.printHorizontalEdge(j, 1));
        printf(node.printNodeValue());
        printf(node.printHorizontalEdge(j, 2));
      }
      printf("\n");
      for (let j = initialValue; j < maxValue; j++) {
        const node = this.adj[j];
        printf(`${node.printDiagonalEdge(j, this.numLinhas, 2)}`);
        printf(`${node.printVerticalEdge(j, this.numLinhas, 1)}`);
        printf(`${node.printDiagonalEdge(j, this.numLinhas, 3)}`);
      }
      printf("\n");
    }
  }

  removeEdge(node1, node2) {
    let nextNode = node1.next;
    let actualNode = node1;
    while (nextNode) {
      if (nextNode.v === node2.v) {
        //console.log(actualNode, nextNode)
        actualNode.next = nextNode.next;
        return;
      }
      actualNode = nextNode;
      nextNode = nextNode.next;
    }
  }

  cloneGraph() {
    const g = new Graph(this.n);
    this.adj.forEach((el, index) => {
      let node = g.adj[index]
      node.isLinked = el.isLinked;
      let nextNode = el.next;
      while (nextNode) {
        node.next = new Node(nextNode.v, nextNode.t, nextNode.c, null);
        nextNode = nextNode.next
        node = node.next;
      }
    })

    return g;
  }

  bfs() {
    const g = this.cloneGraph();
    const queue = new Queue(g.n);
    
    let i = 0;
    while (i < g.n) {
      if (g.adj[i].isVisited) {
        i++;
        continue;
      }
      //printf(`put: ${g.adj[i].v} -> `);
      queue.put(g.adj[i]);
      g.adj[i].isVisited = true;
      //console.log(g.adj[i])
      while (!queue.isEmpty()) {
        let node = queue.remove();
        //printf('\n');
        //printf(`remove: ${node.v} -> `);
        let nextNode = node.next;
        
        while (nextNode) {
          let index = nextNode.v;
          //printf(`nextNode: ${nextNode.v} -> `);
          if (!g.adj[index].isVisited) {
            //printf('nao visitado -> ');
            g.adj[index].isVisited = true;
            queue.put(g.adj[index]);
            //printf(`put: ${nextNode.v} -> `);
          }
          else {
            //printf('visitado -> ');
            g.removeEdge(node, nextNode);
          }
          
          nextNode = nextNode.next;
        }
      }

      //printf('\n');
      
      i++;
    }

    return g;
  }
}

const v = prompt('Número de vertices: ')
const g = new Graph(v);

while (true) {
  const input = prompt("(n1 n2) Nó n1 liga com nó n2 | (p) imprime matriz | (b) travessia bfs | (g) imprime grafo | (a) adiciona algumas arestas : ");

  if (input.includes('p')) {
    g.printMaze();
  } else if (input.includes('b')) {
    const aux = g.bfs();
    aux.printMaze();
    aux.printGraph();
  } else if (input.includes('g')) {
    g.printGraph();
  } else if (input.includes('a')) {
    let edge = new Edge(1, 2);
    g.insertEdge(edge);

    edge = new Edge(1, 5);
    g.insertEdge(edge);

    edge = new Edge(1, 4);
    g.insertEdge(edge);

    edge = new Edge(4, 2);
    g.insertEdge(edge);

    edge = new Edge(4, 5);
    g.insertEdge(edge);
    
    edge = new Edge(2, 6);
    g.insertEdge(edge);

    edge = new Edge(3, 7);
    g.insertEdge(edge);
  }
  else {
    const [v, w] = input.split(' ');
    const edge = new Edge(v, w);
    g.insertEdge(edge);
    g.printMaze(g);
  }
}