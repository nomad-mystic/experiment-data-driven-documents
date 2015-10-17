/*
	Programmer = Keith Murphy
	File name = gravityD3.js
*/
// This is the start of the force driven node cluster
var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
 }; /// This is his color palette


/// This sets the size of the SVG canvas
var width = 900,
	height = 400;
/// this is setting size of the node cirlces 
var  circleWidth = 10;
/// THis is the nodes 
var nodes = [
	{ name: 'parent'},
	{ name: 'child1'},
	{ name: 'child2', target: [0]}, // this is conected to the parent 0 index array
	{ name: 'child3', target: [0]},
	{ name: 'child4', target: [1]}, //THis is connected to Child1 array value 1 
	{ name: 'child5', target: [1 , 1 , 0]} //THis is connected to a few nodes 
	
];

var links = [];
// THis is the loop that populates the array links 
for (var i=0; i < nodes.length; i++) {
	if ( nodes[i].target !== undefined) { // This checkes to make sure there are nodes. if node index is not undefined do this 
		for (var x=0; x < nodes[i].target.length; x++) {
			links.push({
				source: nodes[i],
				target: nodes[nodes[i].target[x]]
			})
		}
	}
}
console.log(links);
// THis just sets up the chart to have a SVG appended to it with height and width set from VAR 
var myChart = d3.select('#chart')
			.append('svg')
			.attr('width', width)
			.attr('height', height);
// THis is creating the fore layout looks like the example shown on D3 
var force = d3.layout.force()
	.nodes(nodes) // these are the nodes I have above as an agrument 
	.links([]) // The links are dynimicaly added to the array 
	.gravity(0.5) // this changes how close together the nodes are 
	.charge(-5000) // THIS CHAGES THE force the nodes have in movement
	.size([width, height]);

// This one creats the lines for the data points to connect to the lines
var link = myChart.selectAll('line') // you create a selections of things yu want to draw on this line 
			.data(links) // you pass along the data 
			.enter().append('line') // we are entering the data and appending it to the line we just created 
			.attr('stroke', palette.gray);

var node = myChart.selectAll('circle')
			.data(nodes).enter()
			.append('g')
			.call(force.drag); //// this calls the force var with the paramiters set for it//// This is also has the drag method 


// this line connects to the node ('circle') these are the node
node.append('circle') 
	.attr('cx', function(d) { return d.x;  })
	.attr('cy', function(d) { return d.y;  })
	.attr('r', circleWidth)
	.attr('fill', function(d, i) {  
		if (i>0) { return palette.blue} 
		else { return palette.pink}       
	});
// calling the name of the oject array this 
node.append('text')
	.text( function(d) { return d.name })
	.attr('font-family', 'Arial')
	.attr('fill', function(d, i) {  
		if (i>0) { return palette.mediumgray} // THis sets the solor of the nodes to mediumgray 
		else { return palette.yellowgreen} // if they are not the first in the array
	})
	.attr('x', function(d, i) {  
		if (i>0) { return circleWidth + 5} // this set the text of the nodes x value + 5 to the widthof the circle  
		else { return circleWidth -25 } // this sets the parent x value in the array object to -25 
	})
	.attr('y', function(d, i) {  
		if (i>0) { return circleWidth } //
		else { return 8 } // 
	})
	.attr('text-anchor', function(d, i) {  
		if (i>0) { return 'beginning'} // This sets the text ancor to the begining 
		else { return 'end'}           // if they are not the first in the oject array 
	})
	.attr('font-size',  function(d, i) {
		if (i>0) { return '1em'} // If the  node is not the first in the oject array it will be 1em
		else { return '1.8em'}
	});

// Htis is using the tick method that uses javascript time to count out over time not sure how much 
force.on('tick', function(e) {
	node.attr('transform', function(d, i) {
		return 'translate('+ d.x +', '+ d.y +')';
	})
	link.attr('x1', function(d)  { return d.source.x })
		.attr('y1', function(d)  { return d.source.y })
		.attr('x2', function(d)  { return d.target.x })
		.attr('y2', function(d)  { return d.target.y })
})

/// This calls the function 
force.start();