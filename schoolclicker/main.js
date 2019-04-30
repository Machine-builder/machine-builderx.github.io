let essays = 0
let perClick = 1

let points = 0
let range_points_min = 4
let range_points_max = 6



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

function afkgain() {
    essays += 1
    updateValues()
}

window.setInterval(function() {
    afkgain()
}, 1000)


updateValues()