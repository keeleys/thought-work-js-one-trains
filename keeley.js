const input_str = 'AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7'

const graph = input_str.split(',').map(it=>it.trim()).reduce((acc, it)=>{
	if(!acc[it[0]]) acc[it[0]] = []
	acc[it[0]].push({ point: it[1], weight: Number(it[2])})
	return acc
}, {});


const func1 = function(points) {
	if(!points || points.length < 2) return -1;
	let result = 0;
	for (let i = 0; i < points.length -1; i++) {
		let nextPoint = graph[points[i]].find(it=>it.point === points[i+1])
		if(!nextPoint) return -1
		result += nextPoint.weight
	}
	return result;
}
// max step
const func6= function(start, end, left, result, path) {
	if(left == 0)
		return result;
	graph[start].forEach(it =>{
		let nextPath = path + '-' + it.point
		if(it.point === end)
			result.push(nextPath);
		else
			func6(it.point, end, left - 1, result, nextPath);
	})	
	return result;
}

// equal step
const func7= function(start, end, left, result, path) {
	if(left == 0)
		return result;
	graph[start].forEach(it =>{
		let nextPath = path + '-' + it.point
		if(it.point === end && left == 1)
			result.push(nextPath);
		else
			func7(it.point, end, left - 1, result, nextPath);
	})	
	return result;
}
// shortest 
const func8 = function(start, end) {
	let lenList = [],
		link = [];

	let maxWeight = Infinity
	Object.keys(graph).forEach(x=>{
		lenList[x] = maxWeight
	})
	graph[start].forEach(it=>{
		lenList[it.point] = it.weight
		link.unshift(it.point)
	})

	while (link.length > 0) {
		let p = link.shift()
		graph[p].forEach(it=>{
			let v = lenList[p] + it.weight
			if(lenList[it.point] > v) {
				lenList[it.point] = v
				link.unshift(it.point)
			}

		})
	}
	return lenList[end]
}


// max step
const func10= function(start, end, left, result, path) {
	if(left < 0)
		return result;
	graph[start].forEach(it =>{
		let nextPath = path + '-' + it.point
		let nextLeft = left - it.weight;
		if(it.point === end && nextLeft > 0 )
			result.push(nextPath);
		func10(it.point, end, nextLeft, result, nextPath);
	})	
	return result;
}

console.log('graph: %o', graph)

console.log('result1: %o', func1(['A','B','C']))
console.log('result2: %o', func1(['A','D']))
console.log('result3: %o', func1(['A','D','C']))
console.log('result4: %o', func1(['A','E','B','C','D']))
console.log('result5: %o', func1(['A','E','D']))

console.log('result6 %o', func6('C', 'C', 3, [], 'C'))
console.log('result7 %o', func7('A', 'C', 4, [], 'A'))
console.log('result8 %d', func8('A', 'C'))
console.log('result9 %d', func8('B', 'B'))
console.log('result10 %o', func10('C', 'C', 30, [], 'C'))

