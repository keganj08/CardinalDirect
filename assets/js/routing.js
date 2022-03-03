class DirectedEdge{
	#start = ""; // name of start node (string)
	#end = ""; // name of end node (string)
	#weight = 0; //int
	constructor(start, end, weight){ //start is string, end is string, weight is int
		this.#start = start;
		this.#end = end;
		this.#weight = weight;
	}
	get weight(){
		return this.#weight;
	}
	from(){
		return this.#start;
	}
	to(){
		return this.#end;
	}
	set weight(weight){
		this.#weight = weight;
	}
	print(){
		console.log("start: " + this.#start + " end: " + this.#end + " weight: " + this.#weight);
	}
	//Make other setters
}

class  EdgeWeightedDigraph{
	#nodeList = []; //array of node names
	#adjList = []; //array of array of DirectedEdge
	constructor(){
		this.#nodeList = [];
		this.#adjList = [];
	}
	get numNodes(){
		return this.#nodeList.length;
	}
	get nodes(){
		return this.#nodeList;
	}
	addEdge(edge){ //edge is a DirectedEdge
	// Adds directed edge in both directions
		if(!this.#nodeList.includes(edge.from())){
			this.#nodeList.push(edge.from());
			this.#adjList.push([edge]);
		}
		else{
			let idx = this.#nodeList.indexOf(edge.from());
			this.#adjList[idx].push(edge);
		}
		let otherWayEdge = new DirectedEdge(edge.to(), edge.from(), edge.weight);
		if(!this.#nodeList.includes(otherWayEdge.from())){
			this.#nodeList.push(otherWayEdge.from());
			this.#adjList.push([otherWayEdge]);
		}
		else{
			let idx = this.#nodeList.indexOf(otherWayEdge.from());
			this.#adjList[idx].push(otherWayEdge);
		}
	}
	adj(idx){
		return this.#adjList[idx];
	}
	edges(){ //Still need to double check if this works correctly
		//console.log("In Edges");
		let edgeList = [];
		let i=0;
		for(i=0; i<this.#nodeList.length; i++){
			let j=0;
			for(j=0; j< this.#adjList[i].length; j++){
				//console.log("adjList[i]: " + this.#adjList[i]);
				//console.log(this.#adjList[i][j].print());
				edgeList.push(this.#adjList[i][j]);
			}
		}
		//console.log(edgeList);
		return edgeList;
	}
	// need remove?
}

class Dijkstra{
	#result = []; //n x 3 array => col1=node name, col2=distance, col3=prev, processFlag = whether or not node has been processed
	#graph; //Graph
	
	constructor(graph, start){ //graph is an EdgeWeightedDigraph, start is a name of a node
		this.#result = [];
		this.#graph = graph;
		let nodes = graph.nodes;
		let n=0;
		// Set up result table
		// Each row starts with [node name, distance = infinity, prev = null, and processFlag = false]
		for(n=0; n<nodes.length; n++){
			this.#result.push([nodes[n], Number.POSITIVE_INFINITY, null, false]);
		}
		let startidx = nodes.indexOf(start);
		this.#result[startidx][1] = 0; //set start distance to 0
	}
	distTo(node){ // Need to do
		//return this.#distTo[node];
	}
	hasPathTo(node){ //Need to do
		//return this.#distTo[node] < Number.POSITIVE_INFINITY;
	}
	minDistIndex(){
		let minDist = Number.POSITIVE_INFINITY;
		let minIdx = -1;
		let i=0;
		for(i=0; i<this.#result.length; i++){
			if(!this.#result[i][3] &&  this.#result[i][1] < minDist){
				minDist = this.#result[i][1];
				minIdx = i;
			}
		}
		return minIdx;
	}
	run(){ //runs the algorithm
		let numUnprocessed = this.#result.length;
		while(numUnprocessed != 0){
			let minIdx = this.minDistIndex();
			//console.log("minIdx: " + minIdx);
			if(minIdx != -1){
				this.#result[minIdx][3] = true;
				numUnprocessed --;
				let adjList = this.#graph.adj(minIdx);
				let currLen = this.#result[minIdx][1];
				for(let neighbor of adjList){
					let adjName = neighbor.to();
					let adjIdx = this.#graph.nodes.indexOf(adjName);
					let newDist = currLen + neighbor.weight;
					if(newDist < this.#result[adjIdx][1]){
						this.#result[adjIdx][1] = newDist;
						this.#result[adjIdx][2] = this.#result[minIdx][0];
					}
				}
			}
			//console.log("Current: " + this.#result);
		}
		return this.#result;
	}
	pathTo(node){
		let nodeList = this.#graph.nodes;
		let endIdx = nodeList.indexOf(node);
		let path = [node];
		let prev = this.#result[endIdx][2];
		while(prev != null){
			path.unshift(prev);
			let prevIdx = nodeList.indexOf(prev);
			prev = this.#result[prevIdx][2];	
		}
		return path;
	}
}
	


let graph = new EdgeWeightedDigraph();
// a - 0, b - 1, c - 2, d - 3, e - 4, z - 5
graph.addEdge(new DirectedEdge("a", "b", 4));
graph.addEdge(new DirectedEdge("a", "c", 2));
graph.addEdge(new DirectedEdge("b", "c", 1));
graph.addEdge(new DirectedEdge("b", "d", 5));
graph.addEdge(new DirectedEdge("c", "d", 8));
graph.addEdge(new DirectedEdge("c", "e", 10));
graph.addEdge(new DirectedEdge("d", "e", 2));
graph.addEdge(new DirectedEdge("d", "z", 6));
graph.addEdge(new DirectedEdge("e", "z", 3));

let dijkstra = new Dijkstra(graph, "a");
console.log(dijkstra.run());
let path = dijkstra.pathTo("z");
console.log(path);



		
		
	
	
	
