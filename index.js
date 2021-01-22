function drawCircle() {
	width = 50
	height = 100
	radius = width / 1.67
	fields = [{maxValue: 12, interval: 2}]

	const svg = d3.select("#pubkeywheel").append("svg")
	.attr("viewBox", [0, 0, 100, 100])
	.attr("text-anchor", "middle")

	const field = svg.append("g")
	.attr("transform", `translate(${width},${height/4})`)
	.selectAll("g")
	.data(fields)
	.join("g");

	field.append("circle")
	.attr("fill", "none")
	.attr("stroke", "currentColor")
	.attr("stroke-width", .5)
	.attr("r", 18);

	//What you need: the highest number,
	// the intervals between, and then a list of each interval
	//up to the highest, which is returned in that first call to data.

	const fieldTick = field.selectAll("g")
	.data(d => {
	  var list = []
	  for (var i = d.interval; i <= d.maxValue; i+=d.interval) {
	    list.push({number: i, max: d.maxValue})

	  }
	  return list
	})
	.join("g")
	  .attr("class", "field-tick")
	  .attr("transform", (d, i) => {
	    const angle = d.number / d.max * 2 * Math.PI - Math.PI / 2;
	    return `translate(${Math.cos(angle) * 20}, ${Math.sin(angle) * 20})`;
	  }); 

	fieldTick.append("text")
	.attr("dy", "0.35em")
	.attr("fill", "#222")
	.attr("font-size", "2")
	.text(d => d.number);
}

function drawError() {

	const svg = d3.select("#pubkeywheel").append("svg")
	.attr("viewBox", [0, 0, 100, 100])
	.attr("text-anchor", "middle")

	const text = svg.append("text")
		.attr("font-size", "2")
		.attr("x", "300")
		.attr("y", "200")
		.attr("text", "Need to be prime!")
}

function validatePandQ() {
	var p = document.getElementById("pinput").value
	var q = document.getElementById("qinput").value
	//console.log(p)
	var n = p*q
	//console.log(n)
	document.getElementById("nresult").innerHTML = n

	if (math.isPrime(p) && math.isPrime(q)) {
		drawCircle()
	} else {drawError()}
}