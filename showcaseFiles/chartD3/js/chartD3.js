/*
	Programmer = Keith Murphy
	File name = chartD3.js
*/
/*-----------this is for the chart section--*/
/// creating everything from sctach and adding barData var into the mix
/// 
/// this is great genrate numbers randomly can use other places 

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



}); 