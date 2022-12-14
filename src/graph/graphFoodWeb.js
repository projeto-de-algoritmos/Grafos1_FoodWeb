//const prompt = require('prompt-sync')();

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
    return g.dfsVisit1(g.adj[n1], g.adj[n2]);
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
      if ((g.adj[i] && g.adj[i].isVisited) || !g.adj[i]) {
        i++;
        continue;
      }
      queue.put(g.adj[i]);
      g.adj[i].isVisited = true;
      while (!queue.isEmpty()) {
        let node = queue.remove();
        let nextNode = node.next;

        while (nextNode) {
          let index = nextNode.idx;
          if (g.adj[index] && !g.adj[index].isVisited) {
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

  seeder() {
    this.insertNode("??rvore", "Produtor");        //0
    this.insertNode("Grama", "Produtor");         //1
    this.insertNode("Flor", "Produtor");          //2
    this.insertNode("Capim", "Produtor");         //3
    this.insertNode("Coala", "1?? Consumidor");    //4
    this.insertNode("Barata", "1?? Consumidor");   //5
    this.insertNode("Peixe", "1?? Consumidor");    //6
    this.insertNode("??guia", "2?? Consumidor");    //7
    this.insertNode("Aranha", "2?? Consumidor");   //8
    this.insertNode("Lobo", "2?? Consumidor");     //9
    this.insertNode("Urso", "3?? Consumidor");     //10
    this.insertNode("Cobra", "3?? Consumidor");    //11
    this.insertNode("Jacar??", "3?? Consumidor");   //12
    this.insertNode("Tubar??o", "4?? Consumidor");  //13

    this.insertEdge(new Edge(4, 0));
    this.insertEdge(new Edge(5, 1));
    this.insertEdge(new Edge(6, 3));
    this.insertEdge(new Edge(6, 5));
    this.insertEdge(new Edge(4, 2));
    this.insertEdge(new Edge(5, 2));
    this.insertEdge(new Edge(4, 5));
    this.insertEdge(new Edge(7, 6));
    this.insertEdge(new Edge(7, 8));
    this.insertEdge(new Edge(8, 5));
    this.insertEdge(new Edge(9, 4));
    this.insertEdge(new Edge(9, 5));
    this.insertEdge(new Edge(10, 6));
    this.insertEdge(new Edge(10, 8));
    this.insertEdge(new Edge(10, 9));
    this.insertEdge(new Edge(10, 11));
    this.insertEdge(new Edge(11, 8));
    this.insertEdge(new Edge(11, 4));
    this.insertEdge(new Edge(11, 9));
    this.insertEdge(new Edge(11, 13));
    this.insertEdge(new Edge(12, 9));
    this.insertEdge(new Edge(12, 11));
    this.insertEdge(new Edge(12, 6));
    this.insertEdge(new Edge(12, 4));
    this.insertEdge(new Edge(13, 10));
    this.insertEdge(new Edge(13, 12));
  }
}

export {
  Node,
  Edge,
  Graph
}