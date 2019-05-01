function setCookie(cname, cvalue, exdays = 50000) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function deleteCookie(cname, cvalue, exdays = -50) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + "delete" + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

function bake_cookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
}

function read_cookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));

    console.log("first result :")
    console.log(result)

    result && (result = JSON.parse(result[1]));

    console.log("second result :")
    console.log(result)

    return result;
}

function delete_cookie(name) {
    document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}

function seconds_time() {
    var time = Math.floor(new Date().getTime() / 1000)
    return time
}

let essays = 0
let perClick = 1

let points = 0
let range_points_min = 4
let range_points_max = 6

var delay = 1000

var autos = [
    {
        "name": "Minimal Afternoon Activities",
        "current": 0,
        "per": 2,
        "costIncrements": 5
    },
    {
        "name": "Handwriting Speed",
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
    }
]

var autos_markers = [
    {
        "name": "+ Substitute Teacher",
        "current": 0,
        "per": 2,
        "costIncrements": 5
    },
    {
        "name": "+ Half-Time Teacher",
        "current": 0,
        "per": 10,
        "costIncrements": 40
    },
    {
        "name": "+ Full-Time Teacher",
        "current": 0,
        "per": 20,
        "costIncrements": 120
    },
    {
        "name": "+ Highschool Teacher",
        "current": 0,
        "per": 40,
        "costIncrements": 680
    }
]

var loadData = read_cookie( "gamesavedata" )
console.log(loadData)

if (loadData=="") {
    loadData = {
        "essays": essays,
        "perClick": 1,
        "points": points,
        "autos": autos,
        "autos_markers": autos_markers
    }
    setCookie( "gamesavedata", JSON.stringify(loadData) )
} else {
    loadData = JSON.parse( "gamesavedata" )
    setCookie( "gamesavedata", JSON.stringify(loadData) )
}

essays = loadData['essays']
perClick = loadData['perClick']
points = loadData['points']
autos = loadData['autos']
autos_markers = loadData['autos_markers']

function clearSave() {
    deleteCookie("gamesavedata")
}

function savegame() {
    loadData = {
        "essays": essays,
        "perClick": 1,
        "points": points,
        "autos": autos,
        "autos_markers": autos_markers
    }
    setCookie( "gamesavedata", JSON.stringify(loadData) )
}

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

        // console.log("Bought +1 for : " + name)

    } else {
        // console.log("Cannot afford this buy : " + name)
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
        <br>++ : ` + value['per'] + " per second" + `
        <br>Current Level : ` + value['current'] + "</button><br>"
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
        <br>++ : ` + value['per'] + " per second" + `
        <br>Current Level : ` + value['current'] + "</button><br>"
        ci += 1 // currently this button is linked to buying auto essay writers not marks FIX THIS RN / ASAP
    })
    scrollRegion += "</div>"
    updateScrollRegionRight(scrollRegion)

    calculatePerSecond()
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
    renderScrollRegion()
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

    setP("persecondInfo", "Essays Written Per Second : " + overAllClick + ", Essays Marked Per Second : " + overAllMark)
}

calculatePerSecond()
renderScrollRegion()
updateValues()