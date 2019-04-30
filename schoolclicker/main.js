let essays = 0
let perClick = 1

let points = 9000
let range_points_min = 4
let range_points_max = 6

var delay = 1000

var autos = [
    {
        "name": "+ Vocabulary",
        "current": 0,
        "per": 2,
        "costIncrements": 5
    },
    {
        "name": "+ Plagiarism Skills",
        "current": 0,
        "per": 10,
        "costIncrements": 25
    }
]

var autos_markers = [
    {
        "name": "+ Teacher Mk.1",
        "current": 0,
        "per": 2,
        "costIncrements": 5
    },
    {
        "name": "+ Teacher Mk.2",
        "current": 0,
        "per": 10,
        "costIncrements": 25
    }
]



function setP( p, text ) {
    document.getElementById(p).innerHTML = text
}

function updateValues() {
    var text_essays = " Useless Essays Written : " + essays
    var text_points = " School Points Earned : " + points

    setP("count_essays", text_essays)
    setP("count_points", text_points)
}

function gainClick() {
    essays += perClick
    updateValues()
}

function convertClickToPoints() {
    if (essays > 0) {

        var increase = Math.floor(
            Math.random() * (range_points_max - range_points_min) + range_points_min
        )

        points += increase
        essays += -1
    }
    updateValues()
}

function updateScrollRegionLeft(html) {
    document.getElementById("scrollRegionLeft").innerHTML = html
}
function updateScrollRegionRight(html) {
    document.getElementById("scrollRegionRight").innerHTML = html
}

function tryBuyIndex(index, tag) {
    if (tag=='essays'){
        var item = autos[index]
    }
    if (tag=='marker'){
        var item = autos_markers[index]
    }
    var name = item['name']
    var costInc = item['costIncrements']
    var current = item['current']

    var cost = (current + 1) * (costInc) * 10

    if (points >= cost) {
        points -= cost
        if (tag=='essays') {
            autos[index]['current'] += 1
        }
        if (tag=='marker') {
            autos_markers[index]['current'] += 1
        }

        console.log("Bought +1 for : " + name)

    } else {
        console.log("Cannot afford this buy : " + name)
    }

    updateValues()
    renderScrollRegion()
}

function renderScrollRegion() {
    var ci = 0 // generate the list of buttons for auto-essay writers
    var scrollRegion = "<div>"
    autos.forEach(function( value ) {
        var cost = (value["current"]+1) * value['costIncrements'] * 10 // Work out the cost for each thingo based on it's current value
        scrollRegion += `
        <button onclick='tryBuyIndex(`+ ci +`, "essays")' class='buttonSmoothSmaller'>Buy x1 ` + value["name"] + `
        <br>Cost : ` + cost + " points" + `
        <br>++ : ` + value['per'] + " per second" + "</button><br>"
        ci += 1
    })
    scrollRegion += "</div>"
    updateScrollRegionLeft(scrollRegion)
    
    var ci = 0 // generate the list of buttons for auto-markers
    var scrollRegion = "<div>"
    autos_markers.forEach(function( value ) {
        var cost = (value["current"]+1) * value['costIncrements'] * 10 // Work out the cost for each thingo based on it's current value
        scrollRegion += `
        <button onclick='tryBuyIndex(`+ ci +`, "marker")' class='buttonSmoothSmaller'>Buy x1 ` + value["name"] + `
        <br>Cost : ` + cost + " points" + `
        <br>++ : ` + value['per'] + " per second" + "</button><br>"
        ci += 1 // currently this button is linked to buying auto essay writers not marks FIX THIS RN / ASAP
    })
    scrollRegion += "</div>"
    updateScrollRegionRight(scrollRegion)
}

function afkgain() {
    let overAllClick = 0

    autos.forEach(function( value ) {
        var quickClick = value['per'] * value['current']
        overAllClick += quickClick
    })

    renderScrollRegion()

    essays += overAllClick
    updateValues()

    // auto-mark essays
    
    let overAllMark = 0

    autos_markers.forEach(function(value) {
        var quickMark = value['per'] * value['current']
        overAllMark += quickMark
    })

    if (overAllMark > essays) {
        overAllMark = essays
    }

    essays += -overAllMark
    console.log(overAllMark)

    var i = 0
    for (i=0; i < overAllMark; i++) {
        points += Math.floor( Math.random() * (range_points_max - range_points_min) + range_points_min )
    }

    updateValues()
    
    setP("persecondInfo", "Essays Written Per Second : " + overAllClick + ", Essays Marked Per Second : " + overAllMark)
}

window.setInterval(function() {
    afkgain()
}, delay)

renderScrollRegion()
updateValues()