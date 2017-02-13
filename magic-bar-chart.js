var w = window.innerWidth * 0.95;
var h = 400;
var barPadding = 1;  // <-- New!
var magicMax = 101;
var numBars = 20;

// Michael's beautiful D3 code
var dataset = [];                         //Initialize empty array
for (var i = 0; i < numBars; i++) {            
	var newNumber = Math.floor(Math.random() * magicMax);   //New random number (0-30)
	dataset.push(newNumber);              //Add new number to array
}

var xScale = d3.scaleBand()
				.rangeRound([0, w])
				.paddingInner(0.1)
				.domain(d3.range(dataset.length));

var yScale = d3.scaleLinear()
				.domain([0, magicMax])
				.range([0, h]);
				
var colorScale = d3.scaleLinear()
					.domain([0, magicMax])
					.range(["yellow","purple"]);
					

//Create SVG element
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("y", function(d) {
		return h - yScale(d);
   })
   .attr("x", function(d, i) {
		return xScale(i);
	})
	.attr("width", xScale.bandwidth())
	.attr("height", function(d) {
		return yScale(d);
	})
	.attr("fill", function(d) {
		return colorScale(d);
	});

vTextPad = 20;
	
svg.selectAll("text")
	.data(dataset)
	.enter()
	.append("text")
	.text(function(d) { return d; })
	.attr("text-anchor", "middle")
	.attr("x", function(d, i) { return xScale(i) + xScale.bandwidth()/2;})
	.attr("y", function(d) { return h - yScale(d) + vTextPad; })
	.attr("font-family", "sans-serif")
	.attr("font-size", function(){return "20px"})
	.attr("fill", "white");

d3.select("#first")
	.on("click", function() {
		var dataset = [];                         //Initialize empty array
		for (var i = 0; i < numBars; i++) {           
			var newNumber = Math.floor(Math.random() * magicMax);   //New random number (0-30)
			dataset.push(newNumber);              //Add new number to array
		}
		
		svg.selectAll("rect")
			.data(dataset)
			.transition()
			.delay(function(d, i) {
				return i * 100;
			})
			.duration(1000)
			.attr("y", function(d) {
				return h - yScale(d);
			})
			.attr("x", function(d, i) {
				return xScale(i);
			})
			.attr("width", xScale.bandwidth())
			.attr("height", function(d) {
				return yScale(d);
			})
			.attr("fill", function(d) {
				return colorScale(d);
			});
		svg.selectAll("text")
			.data(dataset)
			.transition()
			.duration(1000)
			.delay(function(d, i) {
				return i * 100;
			})
			.text(function(d) { return d; })
			.attr("text-anchor", "middle")
			.attr("x", function(d, i) { return xScale(i) + xScale.bandwidth()/2;})
			.attr("y", function(d) { return h - yScale(d) + vTextPad; })
			.attr("font-family", "sans-serif")
			.attr("font-size", function(){return "20px"})
			.attr("fill", "white");
		
					   				
	});

