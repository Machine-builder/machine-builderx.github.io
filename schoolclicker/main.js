let essays = 0
let perClick = 1

let points = 0
let range_points_min = 4
let range_points_max = 6

var delay = 1000
var counter = 0

var autos = [
    {
        "name": "Fewer Afternoon Activities",
        "current": 0,
        "per": 2,
        "costIncrements": 5
    },
    {
        "name": "Increased Handwriting Speed",
        "current": 0,
        "per": 10,
        "costIncrements": 40
    },
    {
        "name": "Hired Essay Writers",
        "current": 0,
        "per": 20,
        "costIncrements": 120
    },
    {
        "name": "Advanced Hired Essay Writers",
        "current": 0,
        "per": 40,
        "costIncrements": 680
    },
    {
        "name": "Free Online Essay Generator",
        "current": 0,
        "per": 75,
        "costIncrements": 1500
    },
    {
        "name": "Premium Online Essay Generator",
        "current": 0,
        "per": 210,
        "costIncrements": 3800
    },
    {
        "name": "Robotic Essay Writer",
        "current": 0,
        "per": 500,
        "costIncrements": 9000
    },
    {
        "name": "Server-farm Essay Writer",
        "current": 0,
        "per": 1800,
        "costIncrements": 50000
    },
    {
        "name": "AI Essay Writer",
        "current": 0,
        "per": 5500,
        "costIncrements": 450000
    },
    {
        "name": "Bribed Nerd Writer",
        "current": 0,
        "per": 8750,
        "costIncrements": 1800000
    },
    {
        "name": "Speedy Nerd Writer",
        "current": 0,
        "per": 16500,
        "costIncrements": 7500000
    },
    {
        "name": "The OG Nerd Gang",
        "current": 0,
        "per": 80000,
        "costIncrements": 25000000
    }
]

var autos_markers = [
    {
        "name": "Substitute Teacher",
        "current": 0,
        "per": 2,
        "costIncrements": 5
    },
    {
        "name": "Half-Time Teacher",
        "current": 0,
        "per": 10,
        "costIncrements": 40
    },
    {
        "name": "Full-Time Teacher",
        "current": 0,
        "per": 20,
        "costIncrements": 120
    },
    {
        "name": "Highschool Teacher",
        "current": 0,
        "per": 40,
        "costIncrements": 680
    },
    {
        "name": "Dedicated Marker",
        "current": 0,
        "per": 75,
        "costIncrements": 1500
    },
    {
        "name": "Online Essay Marker",
        "current": 0,
        "per": 210,
        "costIncrements": 3800
    },
    {
        "name": "Automated Essay Marker",
        "current": 0,
        "per": 500,
        "costIncrements": 9000
    },
    {
        "name": "Large-scale Essay Marker",
        "current": 0,
        "per": 1800,
        "costIncrements": 50000
    },
    {
        "name": "AI Essay Marker",
        "current": 0,
        "per": 5500,
        "costIncrements": 450000
    },
    {
        "name": "Teacher Gang",
        "current": 0,
        "per": 8750,
        "costIncrements": 1800000
    },
    {
        "name": "OP Teacher Club",
        "current": 0,
        "per": 16500,
        "costIncrements": 7500000
    },
    {
        "name": "Harry The Octopus",
        "current": 0,
        "per": 80000,
        "costIncrements": 25000000
    }
]

var saveautos = autos
var saveautos_markers = autos_markers

var loadData = read_cookie( "gamesavedata" )

console.log("Original load data")
console.log(loadData)

if (loadData == null) {
    console.log("Creating first load data because no cookie was found")
    loadData = {
        "essays": essays,
        "perClick": perClick,
        "points": points,
        "autos": autos,
        "autos_markers": autos_markers
    }
    bake_cookie( "gamesavedata", loadData )
}

essays = loadData['essays']
perClick = loadData['perClick']
points = loadData['points']
autos = loadData['autos']
autos_markers = loadData['autos_markers']

saveautos.forEach(function(value) {
    var index = saveautos.indexOf(value)
    if (index >= autos.length) {
        autos.push(value)
    }
})

saveautos_markers.forEach(function(value) {
    var index = saveautos_markers.indexOf(value)
    if (index >= autos_markers.length) {
        autos_markers.push(value)
    }
})

for (current = 0; (current < autos.length); current++) {
    var val_autos = autos[current]
    var val_autos_save = saveautos[current]
    var val_name = val_autos_save['name']
    var val_per = val_autos_save['per']
    var val_costInc = val_autos_save['costIncrements']

    autos[current]['name'] = val_name
    autos[current]['per'] = val_per
    autos[current]['costIncrements'] = val_costInc
}

for (current = 0; (current < autos_markers.length); current++) {
    var val_autos = autos_markers[current]
    var val_autos_save = saveautos_markers[current]
    var val_name = val_autos_save['name']
    var val_per = val_autos_save['per']
    var val_costInc = val_autos_save['costIncrements']

    autos_markers[current]['name'] = val_name
    autos_markers[current]['per'] = val_per
    autos_markers[current]['costIncrements'] = val_costInc
}

function clearsave() {
    
    loadData = {
        'essays': 0,
        'perClick': 1,
        'points': 0,
        'autos': saveautos,
        'autos_markers': saveautos_markers
    }

    bake_cookie("gamesavedata", loadData)

    location.reload()
}

function savegame() {

    console.log("Save game initiated")

    loadData = {
        "essays": essays,
        "perClick": perClick,
        "points": points,
        "autos": autos,
        "autos_markers": autos_markers
    }

    console.log("Current game data...")
    console.log(loadData)

    bake_cookie( "gamesavedata", loadData)
}

function setP( p, text ) {
    document.getElementById(p).innerHTML = text
}

function updateValues() {
    var text_essays = " Useless Essays Written : " + tostring(essays)
    var text_points = " School Points Earned : " + tostring(points)

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

        // console.log("Bought +1 for : " + name)

    } else {
        // console.log("Cannot afford this buy : " + name)
    }

    updateValues()
    renderScrollRegion()
    calculatePerSecond()
}

function renderScrollRegion() {
    var ci = 0 // generate the list of buttons for auto-essay writers
    var scrollRegion = "<div>"
    autos.forEach(function( value ) {
        var cost = (value["current"]+1) * value['costIncrements'] * 10 // Work out the cost for each thingo based on it's current value
        scrollRegion += `
        <button onclick='tryBuyIndex(`+ ci +`, "essays")' class='buttonSmoothSmaller'>Buy x1 ` + value["name"] + `
        <br>Cost : ` + tostring(cost) + " points" + `
        <br>++ : ` + tostring(value['per']) + " per second" + `
        <br>Current Level : ` + tostring(value['current']) + "</button><br><br>"
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
        <br>Cost : ` + tostring(cost) + " points" + `
        <br>++ : ` + tostring(value['per']) + " per second" + `
        <br>Current Level : ` + tostring(value['current']) + "</button><br><br>"
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

    essays += overAllClick

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
    // console.log(overAllMark)

    var i = 0
    for (i=0; i < overAllMark; i++) {
        points += Math.floor( Math.random() * (range_points_max - range_points_min) + range_points_min )
    }

    updateValues()
    calculatePerSecond()
}

window.setInterval(function() {
    afkgain()
}, delay)

function calculatePerSecond() {
    let overAllClick = 0

    autos.forEach(function( value ) {
        var quickClick = value['per'] * value['current']
        overAllClick += quickClick
    })
    
    let overAllMark = 0
    autos_markers.forEach(function(value) {
        var quickMark = value['per'] * value['current']
        overAllMark += quickMark
    })

    let ratioValue = overAllClick - overAllMark

    setP("persecondInfo", "Essays Written Per Second : " + tostring(overAllClick) + ", Essays Marked Per Second : " + tostring(overAllMark))
    setP("persecondInfo2", "Essays Written/Marked Difference <i>(Hint : Keep this close to 0)</i> : " + tostring(ratioValue))
}

calculatePerSecond()
renderScrollRegion()
updateValues()
