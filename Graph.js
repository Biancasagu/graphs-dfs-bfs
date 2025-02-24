// create a graph class
class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }
  addVertex(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }
  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge between v and w
    this.AdjList.get(v).push(w);

    // Since graph is undirected,
    // add an edge from w to v also
    this.AdjList.get(w).push(v);
  }
  printGraph() {
    // get all the vertices
    var get_keys = this.AdjList.keys();
    var output = "Graph output: <br />";
    // iterate over the vertices
    for (var i of get_keys) {
      // great the corresponding adjacency list
      // for the vertex
      var get_values = this.AdjList.get(i);
      var conc = "";

      // iterate over the adjacency list
      // concatenate the values into a string
      for (var j of get_values) conc += j + " ";

      // print the vertex and its adjacency list
      output = output + i + " -> " + conc + "<br />";
      console.log(i + " -> " + conc);
    }
    document.getElementById("GraphOutput").innerHTML = output;
  }

  bfs(startingNode) {
    // create a visited array
    var visited = [];
    var output = "BFS output: <br />";
    for (var i = 0; i < this.noOfVertices; i++) visited[i] = false;

    // Create an object for queue
    var q = new Queue();

    // add the starting node to the queue
    visited[startingNode] = true;
    q.enqueue(startingNode);

    // loop until queue is element
    while (!q.isEmpty()) {
      // get the element from the queue
      var getQueueElement = q.dequeue();

      // passing the current vertex to callback funtion
      console.log(getQueueElement);
      output = output + getQueueElement + "<br />";
      // get the adjacent list for current vertex
      var get_List = this.AdjList.get(getQueueElement);

      // loop through the list and add the element to the
      // queue if it is not processed yet
      for (var i in get_List) {
        var neigh = get_List[i];

        if (!visited[neigh]) {
          visited[neigh] = true;
          q.enqueue(neigh);
        }
      }
      document.getElementById("BFSOutput").innerHTML = output;
    }
  }

  dfs(startingNode) {
    var visited = [];
    for (var i = 0; i < this.noOfVertices; i++) visited[i] = false;
    document.getElementById("DFSOutput").innerHTML = "DFS Output: <br />";
    this.DFSUtil(startingNode, visited);
  }

  // Recursive function which process and explore
  // all the adjacent vertex of the vertex with which it is called
  DFSUtil(vert, visited) {
    visited[vert] = true;
    document.getElementById("DFSOutput").innerHTML =
      document.getElementById("DFSOutput").innerHTML + vert + "<br />";
    console.log(vert);

    var get_neighbours = this.AdjList.get(vert);

    for (var i in get_neighbours) {
      var get_elem = get_neighbours[i];
      if (!visited[get_elem]) this.DFSUtil(get_elem, visited);
    }
  }
}
class Queue {
  // Array is used to implement a Queue
  constructor() {
    this.items = [];
  }
  // enqueue function
  enqueue(element) {
    // adding element to the queue
    this.items.push(element);
  }
  dequeue() {
    // removing element from the queue
    // returns underflow when called
    // on empty queue
    if (this.isEmpty()) return "Underflow";
    return this.items.shift();
  }
  front() {
    // returns the Front element of
    // the queue without removing it.
    if (this.isEmpty()) return "No elements in Queue";
    return this.items[0];
  }
  isEmpty() {
    // return true if the queue is empty.
    return this.items.length == 0;
  }
  printQueue() {
    var str = "";
    for (var i = 0; i < this.items.length; i++) str += this.items[i] + " ";
    return str;
  }
}
var g = new Graph(6);
function CreateGraph() {
  var vertices = ["A", "B", "C", "D", "E", "F"];
  // adding vertices
  for (var i = 0; i < vertices.length; i++) {
    g.addVertex(vertices[i]);
  }

  // adding edges
  g.addEdge("A", "B");
  g.addEdge("A", "F");
  g.addEdge("B", "C");
  g.addEdge("C", "D");
  g.addEdge("C", "F");
  g.addEdge("D", "E");
  g.addEdge("E", "F");
  g.printGraph();
}
function BFSclick() {
  g.bfs("A");
}

function DFSclick() {
  g.dfs("A");
}
// add vertex to the graph
