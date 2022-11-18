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
  constructor(idx, specie, habit, next) {
    this.idx = idx; //index
    this.specie = specie;
    this.habit = habit;
    this.isLinked = false;
    this.isVisited = false;
    this.next = next;
  }

  printNodeValue() {
    return `${this.specie}`;
  }

}

class Graph {
  constructor(N) {
    this.n = N; //node count
    this.i = 0; //node used count
    this.e = 0; //edge count
    const aux = [];
    for (let idx = 0; idx < N; idx++) {
      aux.push(null);
    }
    this.adj = aux;
  }

  insertEdge(edge) {
    const n1 = edge.n1;
    const n2 = edge.n2;
    if (!this.adj[n1] || !this.adj[n2]) {
      return;
    }
    this.e++;
    
    const nodeToLink = this.adj[n2];
    this.adj[n1].next = new Node(nodeToLink.idx, nodeToLink.specie, nodeToLink.habit, this.adj[n1].next);

    this.adj[n1].isLinked = true;
    this.adj[n2].isLinked = true;
  }

  insertNode(specie, habit) {
    this.adj[this.i] = new Node(this.i, specie, habit, null);
    
    this.i++;
    return this.i;
  }

  printGraph() {
    for (let idx = 0; idx < this.n; idx++) {
      if (!this.adj[idx]) {
        continue;
      }
      printf(`${this.adj[idx].idx}: ${this.adj[idx].specie}`);
      let l = this.adj[idx].next;
      while (l) {
        printf(` -> ${l.idx}: ${l.specie}`);
        l = l.next;
      }
      printf("\n");
    }
  }

  removeEdge(node1, node2) {
    let nextNode = node1.next;
    let actualNode = node1;
    while (nextNode) {
      if (nextNode.v === node2.v) {
        actualNode.next = nextNode.next;
        return;
      }
      actualNode = nextNode;
      nextNode = nextNode.next;
    }
  }

  cloneGraph() {
    const g = new Graph(this.n);
    for (let idx = 0; idx < this.n; idx++) {
      if (!this.adj[idx]) {
        continue;
      }
      
      let node = this.adj[idx];
      g.adj[idx] = new Node(idx, node.specie, node.habit, null);
      node = g.adj[idx];
      let nextNode = this.adj[idx].next;
      while (nextNode) {
        node.next = new Node(nextNode.idx, nextNode.specie, nextNode.habit, null);
        nextNode = nextNode.next
        node = node.next;
      }
    }

    return g;
  }

  dfs() {
    const g = this.cloneGraph();
    let i = 0;
    while (i < g.n) {
      if (!g.adj[i] || g.adj[i].isVisited) {
        i++;
        continue;
      }

      g.dfsVisit(g.adj[i]);
      
      i++;
    }

    return g;
  }

  dfs1(n1, n2) {
    const g = this.cloneGraph();
    return this.dfsVisit1(g.adj[n1], g.adj[n2]); 
  }

  dfsVisit1(node1, node2) {
    node1.isVisited = true;
    let nextNode = node1.next;
    let value = false;
    while (nextNode && !value) {
      if (nextNode.idx == node2.idx) {
        return true;
      }
      if (!this.adj[nextNode.idx].isVisited) {
        value = this.dfsVisit1(this.adj[nextNode.idx], node2);
      }
      nextNode = nextNode.next;
    }
    return value;
  }

  dfsVisit(node) {
    node.isVisited = true;
    let nextNode = node.next;
    while (nextNode) {
      if (!this.adj[nextNode.idx].isVisited) {
        this.dfsVisit(this.adj[nextNode.idx]);
      }
      else {
        g.removeEdge(node, nextNode);
      }
      nextNode = nextNode.next;
    }
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
      queue.put(g.adj[i]);
      g.adj[i].isVisited = true;
      while (!queue.isEmpty()) {
        let node = queue.remove();
        let nextNode = node.next;
        
        while (nextNode) {
          let index = nextNode.v;
          if (!g.adj[index].isVisited) {
            g.adj[index].isVisited = true;
            queue.put(g.adj[index]);
          }
          else {
            g.removeEdge(node, nextNode);
          }
          
          nextNode = nextNode.next;
        }
      }
      i++;
    }

    return g;
  }
}

const v = prompt('Número de vertices: ')
const g = new Graph(v);

while (true) {
  const input = prompt("Comando: ");

  if (input == 'b') {
    const aux = g.bfs();
    aux.printMaze();
    aux.printGraph();
  } else if (input == 'd') {
    const aux = g.dfs();
    aux.printGraph();
  } else if (input == 'd1') {
    const [n1, n2] = prompt("Enter the n1 and n2: ").split(" ");
    printf(`${g.dfs1(n1, n2)}\n`);
  } else if (input == 'g') {
    g.printGraph();
  } else if (input == 'a') {
    const [specie, habit] = prompt("Enter the specie and habit: ").split(" ");
    g.insertNode(specie, habit);
  } else if (input == 'e') {
    const [n1, n2] = prompt("Enter the n1 and n2: ").split(" ");
    g.insertEdge(new Edge(n1, n2));
    g.printGraph();
  } else if (input.includes('auto')) {
    g.insertNode("Árvore", "Produtor");        //0
    g.insertNode("Grama", "Produtor");         //1
    g.insertNode("Flor", "Produtor");          //2
    g.insertNode("Capim", "Produtor");         //3
    g.insertNode("Coala", "1º Consumidor");    //4
    g.insertNode("Barata", "1º Consumidor");   //5
    g.insertNode("Peixe", "1º Consumidor");    //6
    g.insertNode("Águia", "2º Consumidor");    //7
    g.insertNode("Aranha", "2º Consumidor");   //8
    g.insertNode("Lobo", "2º Consumidor");     //9
    g.insertNode("Urso", "3º Consumidor");     //10
    g.insertNode("Cobra", "3º Consumidor");    //11
    g.insertNode("Jacaré", "3º Consumidor");   //12
    g.insertNode("Tubarão", "4º Consumidor");  //13

    g.insertEdge(new Edge(4, 0));
    g.insertEdge(new Edge(5, 1));
    g.insertEdge(new Edge(6, 3));
    g.insertEdge(new Edge(6, 5));
    g.insertEdge(new Edge(4, 2));
    g.insertEdge(new Edge(5, 2));
    g.insertEdge(new Edge(4, 5));
    g.insertEdge(new Edge(7, 6));
    g.insertEdge(new Edge(7, 8));
    g.insertEdge(new Edge(8, 5));
    g.insertEdge(new Edge(9, 4));
    g.insertEdge(new Edge(9, 5));
    g.insertEdge(new Edge(10, 6));
    g.insertEdge(new Edge(10, 8));
    g.insertEdge(new Edge(10, 9));
    g.insertEdge(new Edge(10, 11));
    g.insertEdge(new Edge(11, 8));
    g.insertEdge(new Edge(11, 4));
    g.insertEdge(new Edge(11, 9));
    g.insertEdge(new Edge(11, 13));
    g.insertEdge(new Edge(12, 9));
    g.insertEdge(new Edge(12, 11));
    g.insertEdge(new Edge(12, 6));
    g.insertEdge(new Edge(12, 4));
    g.insertEdge(new Edge(13, 10));
    g.insertEdge(new Edge(13, 12));
  }
  else {
    console.log('pula')
  }
}