/*
function update() {
	validatePandQ()
	if (!isNaN(document.getElementById("messagenumber").innerHTML)) {
		msgToNumber()
		drawCircle()
		drawSelect()
		postMessageDoMath()
		drawCircleWithCyphertext()
		//calculateD()
	}
}*/


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
	  	//console.log(n)
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

function undrawCircle() {
	d3.selectAll("#pubkeywheel > *").remove()
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

	if (math.isPrime(p) && math.isPrime(q)) {
		//console.log("Primes")
		document.getElementById("nresult").innerHTML = n
		drawCircle()
		drawSelect()

	} else {
		document.getElementById("nresult").innerHTML = "p and q must be prime!"
		undrawCircle()
	}
}

function drawSelect() {
	var p = document.getElementById("pinput").value
	var q = document.getElementById("qinput").value
	var n = p * q

	var phipq = (p-1)*(q-1)
	//console.log(phipq)
	var relPrimeOptions = []

	for(var i = 2; i < 100; i++) {
		if (math.gcd(i, phipq) == 1) {
			relPrimeOptions.push(i)
		}
	}
	//console.log(relPrimeOptions)

	var sel = d3.select("#eselect")

	sel.selectAll("option")
		.data(relPrimeOptions)
		.join("option")
			.attr("value", d => d)
			.text(d => d)

}

function msgToNumber() {
	var msg = document.getElementById("messagebox").value
	var n = parseInt(document.getElementById("nresult").innerHTML)
	//console.log(n)
	if (isNaN(n)) {
		document.getElementById("messagenumber").innerHTML = "you need to finish the first step!"
		return
	}
	//console.log(msg)
	var number = 0
	for (var i = 0; i < msg.length; i++){
		number += msg.charCodeAt(i)
	}
	number = number % n
	//console.log(number);
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
	  	//console.log(n)
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

		postMessageDoMath()
}

function postMessageDoMath() {
	p = document.getElementById("pinput").value
	q = document.getElementById("qinput").value
	n = p * q
	m = document.getElementById("messagenumber").innerHTML
	select = document.getElementById("eselect")
	if (select == null) {
		return
	}
	e = select.options[select.selectedIndex].value

	c = Math.pow(m, e) % n

	if (isNaN(n) || isNaN(m) || isNaN(e)) {
		//console.log("nan error")
		return
	}
	document.getElementById("n_is").innerHTML = `n = ${n}`
	document.getElementById("m_is").innerHTML = `m = ${m}`
	document.getElementById("e_is").innerHTML = `e = ${e}`
	document.getElementById("equation").innerHTML = `c = (${m}^${e}) mod ${n} = ${c}`
	drawCircleWithCyphertext()
}

function drawCircleWithCyphertext() {
	console.log("hi")
	width = 50
	height = 100
	radius = width / 1.67
	p = document.getElementById("pinput").value
	q = document.getElementById("qinput").value
	n = p * q
	fields = [{maxValue: n, interval: n/12>>0}]
	m = document.getElementById("messagenumber").innerHTML
	select = document.getElementById("eselect")
	if (select == null) {
		return
	}
	console.log("didn't return")
	e = select.options[select.selectedIndex].value
	c = Math.pow(m, e) % n
	console.log(e)


	d3.selectAll("#pubkeywheel3 > *").remove()

	const svg = d3.select("#pubkeywheel3").append("svg")
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
	  	//console.log(n)
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
			const angle = c / n * 2 * Math.PI - Math.PI / 2;
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
			const angle = c / n * 2 * Math.PI - Math.PI / 2;
			return `translate(${Math.cos(angle) * 20}, ${Math.sin(angle) * 20 + .5})` 
		})
		.text("c")
		.attr("font-size", "2")

		calculateD()
}
//Code derived from https://math.stackexchange.com/questions/67171/calculating-the-modular-multiplicative-inverse-without-all-those-strange-looking
function modinv(a,m) {
    var v = 1;
    var d = a;
    var u = (a == 1);
    var t = 1-u;
    if (t == 1) {
        var c = m % a;
        u = Math.floor(m/a);
        while (c != 1 && t == 1) {
               var q = Math.floor(d/c);
               d = d % c;
               v = v + q*u;
               t = (d != 1);
               if (t == 1) {
                   q = Math.floor(c/d);
                   c = c % d;
                   u = u + q*v;
               }
        }
        u = v*(1 - t) + t*(m - u);
    }
    return u;
}

function calculateD() {
	p = document.getElementById("pinput").value
	q = document.getElementById("qinput").value
	n = p * q
	console.log(`n is ${n}`)
	m = document.getElementById("messagenumber").innerHTML
	c = Math.pow(m, e) % n

	originalMessage = document.getElementById("messagebox").value

	d = modinv(e, n)
	console.log(`d is ${d}`)

	newm = Math.pow(c, d) % n
	console.log(`m is ${newm}`)

	document.getElementById("d_is").innerHTML = `d is ${d}`
	document.getElementById("final_m_is").innerHTML = `Translated message number: ${m}`
	document.getElementById("final_m_translated").innerHTML = `Translated message: ${originalMessage}`

}



