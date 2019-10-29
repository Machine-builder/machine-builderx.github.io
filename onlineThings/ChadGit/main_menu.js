window.onload = function () {
    document.getElementsByClassName("select_0")[0].onclick = s0
    document.getElementsByClassName("select_1")[0].onclick = s1
    document.getElementsByClassName("select_2")[0].onclick = s2
    document.getElementsByClassName("select_3")[0].onclick = s3
}

function s0() { select(0) }
function s1() { select(1) }
function s2() { select(2) }
function s3() { select(3) }

function select( index ) {
    let chref
    console.log("select : "+index.toString());
    bake_biscuit( "country_index", index )
    console.log("select : "+inspect_biscuit("country_index"))
    chref = window.location.href
    chref = chref.replace("Geography.html", "testgame.html")
    console.log(chref)
    window.location.href = chref
}