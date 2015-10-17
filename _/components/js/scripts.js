/*
d3.selectAll('.item:last-child')
	.style({
		'background': 'green',
		'font-size': '2em',
		'margin-left': '5%',
		'color': 'black',
		'padding': '5%'
	});
*/
/* this is fo useing data function(d) to return data uses dot notaion to select objects 

var myStyles = [
	{
		width: 200,
		color: '#0A2933'
	},
	{
		width: 230,
		color: '#EAE3CB'
	},
	{
		width: 220, 
		color: '#FCF4DC'
	},
	{
		width: 290,
		color: '#042029'
	},
	{
		width: 236,
		color: '#A57706'
	}

];
d3.selectAll('.item')
	.data(myStyles)
	.style({
		'color': 'white',
		'background': function(d) {
			return d.color;
		},
		width: function(d) {
			return d.width + 'px'; 
		}
	});
*/
/*------
to show how to use enter().append to add 
sub-selections to the parent selection---
---
var myStyles = [
	{
		width: 200,
		color: '#0A2933',
		name: 'Keith Murphy'
	},
	{
		width: 230,
		color: '#EAE3CB',
		name: 'Natasha Stile'
	},
	{
		width: 220, 
		color: '#FCF4DC',
		name: 'John Doe'
	},
	{
		width: 290,
		color: '#042029',
		name: 'Mary Jane'
	},
	{
		width: 236,
		color: '#A57706',
		name: 'Nick Murphy'
	}

];

d3.selectAll('#chart').selectAll('div')//---for the enter---
	.data(myStyles)
	.enter().append('div')
	.classed('item', true)
	.text(function(d) {
		return d.name;
	})
	.style({
		'color': 'white',
		'background': function(d) {
			return d.color;
		},
		width: function(d) {
			return d.width + 'px'; 
		}
	});
*/
/*
this created svg fro scratch---
d3.select('#chart')
	.append('svg')
		.attr('width', 600)
		.attr('height', 400)
		.style('background', 'green')
	.append('rect')
		.attr('x', 200)
		.attr('y', 100)
		.attr('height', 200)
		.attr('width', 200)
		.style('background', 'white')
	d3.select('svg')
		.append('circle')
			.attr('cx', '300')
			.attr('cy', '200')
			.attr('r', '50')
			.style('fill', 'blue')
*/

/*////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////////////////*/


/*-----------this is for the chart section--*/
/// creating everything from sctach and adding barData var into the mix
/// 
// this is the Chart 

/// this is great genrate numbers randomly can use other places 
/*
d3.tsv('data.tsv', function(data) {
	console.log(data);
	
	var barData = [];
	// this brings in the data from the external file into the array barData by checking the key value 
	// 'in operator' is = prop in objectName
	//
	//for (var i = 0, len = data.length; i < len; i++) {	
		// barData.concat(data[i].value)
		
		for (key in data) {
		
		barData.push(data[key].value);

	}


	var margin = {
		top: 30,
		right: 30,
		bottom: 40,
		left: 50
	}
	// genral var of our chart 
	var height = 500 - margin.top - margin.bottom,
		width = 700 - margin.left - margin.right,
		barWidth = 70, // these are not used just var ySCale xScale
		barOffset = 5; // these are not used just var ySCale xScale

	///this changes the color of the Chart bar based on data 
	var colors = d3.scale.linear()
		.domain([0, barData.length*.10, barData.length*.25, barData.length])
		.range(['#ffb832', '#c61c65', '#D173A3', '#297A4A']);
	//just store a place holder to bing in local 
	var tempColor;
	// this fixes the height scale it will only rise to the high point of the height var 
	var yScale = d3.scale.linear()
			.domain([0, d3.max(barData)])
			.range([0, height]);

	// This fixs the domain issue wont pass the size of the width var 
	var xScale = d3.scale.ordinal()
		.domain(d3.range(0, barData.length))
		.rangeBands([0, width], .2); //  there are three values you can put here 1. range 0 to width 2. width of the margin bewtween 

	// thsi is going to hold the tooltip
	var tooltip = d3.select('body').append('div')
					.style('position', 'absolute')
					.style('padding', '0 10px')
					.style('background', 'white')
					.style('opacity' , 0);
	// this is going to sort the data in the array 
	barData.sort(function compareNumbers(a, b) {
		return a -b;
	});
	// this is the chart 
	var myChart = d3.select('#chart').append('svg')
		.style('background', '#999999')
		//.append('g') really didn't to append this group element distoryed the chart 
		.attr('width', width + margin.left + margin.right)// this give the width of the svg depening on var width 
		.attr('height', height + margin.top + margin.bottom) //// this give the height of the svg depening on var height
		.append('g')// apending the group of the cart
		.attr('transform', 'translate('+ margin.left+', '+ margin.top +')')
		.attr('background', 'blue')
		.selectAll('rect').data(barData)
		.enter().append('rect')
			.style('fill', function(d,i) {
				return colors(i);
			})
			.attr('width', xScale.rangeBand())
			.attr('x', function(d, i) {
			return xScale(i);
			})
			.attr('height', 0)
			.attr('y', height)
		//this turns on the style event 
		.on('mouseover', function(d){
			// tootl tip
			tooltip.transition()
				.style('opacity', .9)
			tooltip.html(d)
				.style('left', (d3.event.pageX) +  'px')
				.style('top', (d3.event.pageY) + 'px')
			
			tempColor = this.style.fill;
			d3.select(this)
				//.transition()
				.style('opacity', .7)
				.style('fill', 'black')

		})
		.on('mouseout', function(d) {
			d3.select(this)
				//.transition().duration(100)
				.style('opacity', 1)
				.style('fill', tempColor)
		});
	///this is now using a var to control the height of the graph for myChart 
	myChart.transition()
		.attr('height', function(d) {
				return yScale(d);
		}) 
		.attr('y', function(d, i) {
			return height - yScale(d); 
		})
		.delay(function(d, i) {
			return i * 20;
		})
		.duration(1000)
		.ease('elastic');

	///the for verical guide 
	// new guide scale for verical guides 
	var vGuideScale = d3.scale.linear()
		.domain([0, d3.max(barData)])
		.range([height, 0]);

	///t his is special d3 method axis()
	var vAxis = d3.svg.axis() 
		.scale(vGuideScale)
		.orient('left')
		.ticks(10);

	//this is the guide 
	var vGuide = d3.select('svg').append('g')
					vAxis(vGuide)
					vGuide.attr('transform', 'translate('+ margin.left +', ' + margin.top + ')')
					vGuide.selectAll('path')
						.style({fill: 'none', stroke: '#000'})
					vGuide.selectAll('line')
						.style({stroke: '#000'});
	/// end verical axis 
	// begin horizontal axis guide 
	var hAxis = d3.svg.axis()
		.scale(xScale)
		.orient('bottom')
		.tickValues(xScale.domain().filter( function(d, i) {
			return !(i % (barData.length/5)); 
			// this filters out the length of the barData array where the index is not  === to the legnth of the 
			// not divided by 5 
		}));
	var hGuide = d3.select('svg').append('g')
				hAxis(hGuide)
				hGuide.attr('transform', 'translate(' + margin.left + ', '+ (height + margin.top) + ')')
				hGuide.selectAll('path') 
					.style({ fill: 'none', stroke: '#000'})
				hGuide.selectAll('line')
					.style({stroke: '#000'})
			/// end horizontal guide lines



}); */
//t this is the end of the get data from external source 
/* COMMENTED OUT BECASUE BRINGING TSV FILE IN FROM EXTERNAL FILE----
for (var i=0; i < 50; i++) {
	barData.push(Math.round(Math.random()*50)+5);
}
*/
/// creating the margin for the chart 
 
/*///////////////////////////////////////////////////*/
/*///////////////////////////////////////////////////*/
// This is for the pie chart layout

/*
var width = 400,
	height = 400,
	radius = 200,
	colors = d3.scale.ordinal() // this is one of the built in scale in range of th colors 
			.range(['#595ab7', '#a57706', '##d11c24', 
					'#c61c65', '#bd3613', '#2176c7', '#259286', '#738a05']);
/// this is the data for the pie chart 
var pieData = [ 
	{ 
		label: 'barot',
		value: 15
	}, {
		label: 'Sam',
		value: 50 
	}, {
		label: 'Amy',
		value: 30
	}, {
		label: 'Lacy',
		value: 50
	}, {
		label: 'Mark',
		value: 50
	}, {
		label: 'Tod',
		value: 50
	}
];
/// this is for returning th e values of the pieData 
var pie = d3.layout.pie()
			.value(function(d) {
				return d.value;
			});
// this creats the arc at which our chart is going to live in 
var arc = d3.svg.arc()
			.outerRadius(radius);

// This is the chart made all by SVG 
var myChart = d3.select('#chart').append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate('+(width-radius)+', '+(height-radius)+')')
			.selectAll('path').data(pie(pieData)) // this is the var pie function transforming data into usable type 
			.enter().append('g')
				.attr('class', 'slice');
// This is the slice class that is added to the SVG for the colors 
var slices = d3.selectAll('g.slice')
				.append('path') // after creating the SVG path we have ot enter() and append the Path 
				.attr('fill', function(d, i) {
					return colors(i)
				})
				.attr('d', arc);
// This adds the text to the chart and colors them white/brings them out of the center position 
var text = d3.selectAll('g.slice')
			.append('text')
			.text( function(d, i) {
				return d.data.label;
			})
			.attr('text-anchor', 'middle')
			.attr('fill', 'white')
			.attr('transform', function(d) {
				d.innerRadius = 0;
				d.outerRadius = radius;
				return 'translate('+arc.centroid(d)+')'
			})
*/
/*////////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////*/
/*////////////////////////////////////////////////////*/
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
