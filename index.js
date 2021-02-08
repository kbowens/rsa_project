function update() {
	validatePandQ()
	if (!isNaN(document.getElementById("messagenumber").innerHTML)) {
		msgToNumber()
	}
}


function drawCircle() {
	width = 50
	height = 100
	radius = width / 1.67
	p = document.getElementById("pinput").value
	q = document.getElementById("qinput").value
	n = p * q
	fields = [{maxValue: n, interval: n/12>>0}]

	d3.selectAll("#pubkeywheel > *").remove()

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
	  if (!list.includes(n)) {
	  	list.push({number: n, max: d.maxValue})
	  	console.log(n)
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

	const svg = d3.select("#pubkeywheel").remove().append("svg")
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
		drawSelect()
		console.log("Primes")

	} //else {drawError()}
}

function drawSelect() {
	var p = document.getElementById("pinput").value
	var q = document.getElementById("qinput").value
	var n = p * q

	var phipq = (p-1)*(q-1)
	console.log(phipq)
	var relPrimeOptions = []

	for(var i = 2; i < 100; i++) {
		if (math.gcd(i, phipq) == 1) {
			relPrimeOptions.push(i)
		}
	}
	console.log(relPrimeOptions)

	d3.selectAll("#selectarea > *").remove()

	var sel = d3.select("#selectarea").append("select")
		.attr("name", "e options")
		.attr("id", "select")

	sel.selectAll("option")
		.data(relPrimeOptions)
		.join("option")
			.attr("value", d => d)
			.text(d => d)

}

function msgToNumber() {
	var msg = document.getElementById("messagebox").value
	var n = parseInt(document.getElementById("nresult").innerHTML)
	console.log(n)
	if (isNaN(n)) {
		document.getElementById("messagenumber").innerHTML = "you need to finish the first step!"
		return
	}
	console.log(msg)
	var number = 0
	for (var i = 0; i < msg.length; i++){
		number += msg.charCodeAt(i)
	}
	number = number % n
	console.log(number);
	document.getElementById("messagenumber").innerHTML = number
	drawCircleWithMessage()
}

function drawCircleWithMessage() {
	width = 50
	height = 100
	radius = width / 1.67
	p = document.getElementById("pinput").value
	q = document.getElementById("qinput").value
	n = p * q
	fields = [{maxValue: n, interval: n/12>>0}]
	m = document.getElementById("messagenumber").innerHTML

	d3.selectAll("#pubkeywheel2 > *").remove()

	const svg = d3.select("#pubkeywheel2").append("svg")
	.attr("viewBox", [0, 0, 100, 100])
	.attr("text-anchor", "middle")

	const field = svg.append("g")
	.attr("transform", `translate(${width},${height/4})`)
	.attr("class", "field")
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
	  if (!list.includes(n)) {
	  	list.push({number: n, max: d.maxValue})
	  	console.log(n)
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

	var mcircle = field.append("g")
		.attr("transform", _ => {
			const angle = m / n * 2 * Math.PI - Math.PI / 2;
			return `translate(${Math.cos(angle) * 20}, ${Math.sin(angle) * 20})` 
		})

	mcircle.append("circle")
		.attr("fill", "cyan")
		.attr("class", "small-circle")
		.attr("r", "2")
		.attr("stroke", "currentColor")
		.attr("stroke-width", .5)
	
	field.append("text")
		.attr("transform", _ => {
			const angle = m / n * 2 * Math.PI - Math.PI / 2;
			return `translate(${Math.cos(angle) * 20}, ${Math.sin(angle) * 20 + .5})` 
		})
		.text("m")
		.attr("font-size", "2")


}