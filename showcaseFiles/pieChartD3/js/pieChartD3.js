/*	
	Programmer = Keith Murphy 
	File = pieChartD3.js
*/
// This is for the pie chart layout


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
