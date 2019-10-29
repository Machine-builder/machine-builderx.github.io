var enemy_army_strength = 10;
var money_adjust = 1;
var education_bonus = 1;
var money = 3;
var infrastructure = 4;
var save_money_inc = 1;
var hunger = 30;
var transaqua = 0;
var realhunger = hunger;

var education_cost = 2;
var effect_infrastructure = 1;
var military_cheap = 1;

var infrastructure_deteriorate = 1;

var event_decrease_chance = 2;
// all event chances are decreased based on this number.

var random_event_chances = {
    'civil_unrest': 5,
    'drought': 8,
    'food_shipment': 0.32
}

function round_num(n,d) {
    var m=10**d;
    return Math.round(n*m)/m;
}

function enemy_army_strength_increase() {
    console.log("enemy army strength :", enemy_army_strength)
    enemy_army_strength += 0.5 + round_num((enemy_army_strength/100)*3.5,1)
    console.log("enemy army strength (increased) :", enemy_army_strength)
}
function random_event_civil_unrest() {
    hunger += 2.5
    enemy_army_strength += 1.5
    infrastructure -= 0.5
}
function random_event_drought() {
	hunger += 5
	enemy_army_strength += 0.25
}
function random_event_food_shipment() {
    hunger -= 5.0625
    money += 2.5
}

function random_events() {
    var civil_unrest = Math.random() < ( (random_event_chances['civil_unrest']/event_decrease_chance) * 0.01);
    var drought = Math.random() < ( (random_event_chances['drought']/event_decrease_chance) * 0.01);
    var food_shipment = Math.random() < ( (random_event_chances['food_shipment']/event_decrease_chance) * 0.01);

    if (civil_unrest) {
        random_event_civil_unrest();
        alert("Civil Unrest Has Ocurred!");
    }
    if (drought) {
	    random_event_drought();
	    alert("A drought has occured!");
    }
    if (food_shipment) {
	    random_event_food_shipment();
	    alert("You have recieved a food shipment!");
    }
}

function military() {
    costr = ( 0.8 / money_adjust ) * military_cheap
    cost = round_num(costr, 2)
    console.log("military cost :", costr)

    if (money < cost) {
        alert("You cannot afford this! The cost is : "+String(cost))
        return
    }

	enemy_army_strength -= 1
	money -= cost
	infrastructure -= 0.25*infrastructure_deteriorate
    hunger -= 0.3
    
    random_events()
    turn_base()
}

function improve_infrastructure() {
    cost = round_num(( 0.44 / money_adjust ) * effect_infrastructure, 2)

    if (money < cost) {
        alert("You cannot afford this! The cost is : "+String(cost))
        return
    }

	infrastructure += 1*education_bonus
	money -= 0.44 / money_adjust
    hunger -= 0.22
    
    enemy_army_strength_increase()
    random_events()
    turn_base()
}

function save_money() {
	money += 2 * save_money_inc
	infrastructure -= 0.15*infrastructure_deteriorate
    hunger -= 0.2
    
    enemy_army_strength_increase()
    random_events()
    turn_base()
}

function educate() {
    cost = round_num(education_cost, 2)

    if (money < cost) {
        alert("You cannot afford this! The cost is : "+String(cost))
        return
    }

	money -= cost
	infrastructure -= 0.15*infrastructure_deteriorate
	money_adjust += 0.02
    save_money_inc += 0.2
    education_bonus += 0.02

    enemy_army_strength_increase()
    random_events()
    turn_base()

    animate_ship()
}

function trans_aqua() {
	cost = round_num(30 + (10 / money_adjust) + ((transaqua/10)*5), 2)
	
	if (money < cost) {
        alert("You cannot afford this! This cost is : "+String(cost))
        return
	}

	money -= cost
	infrastructure += 0.05
	transaqua += 10
	
	enemy_army_strength_increase()
	random_events()
	turn_base()
}


function animate_ship() {
    ship = document.getElementById('ship_animation')
    window.setTimeout(  )
}

function getrealhunger() {
    return ( hunger + ( 0.9 + ( enemy_army_strength * 0.12 ) ) - ( 1 + ( infrastructure * 0.8 ) ) );
}


function passer() { }

function turn_base() {
    if (infrastructure<0){infrastructure=0}
    realhunger = getrealhunger()

    die = false;
    win = false;

    if (realhunger >= 50) {
        die = true;
        alert("Chad lacks the food required for basic survival.")
    } else if (enemy_army_strength > 35) {
        die = true;
        alert("Boko Haram has become too powerful for Chad to hold back.")
    } else if (transaqua >= 100) {
        win = true;
        alert("Chad's transaqua is now sustainable and can support all of Chad.")
    } else if (realhunger <= 0) {
        win = true;
        alert("Chad has solved it's food crisis.")
    }

    if (die||win) {
    
        document.getElementById("military").onclick = passer
        document.getElementById("infrastructure").onclick = passer
        document.getElementById("save_money").onclick = passer
        document.getElementById("educate").onclick = passer
        document.getElementById("transaqua_button").onclick = passer

        if (win) {
            window.location.href = "win.html"
        }
        if (die) {
            window.location.href = "lose.html"
        }

    }
}


window.setInterval(timer, 10);

var page_content_loaded = false;

function timer() {
    if (page_content_loaded == false) {
        load_page_content();
        page_content_loaded = true;
    }
    realhunger = getrealhunger()
    if (hunger<0){hunger=0}
    if (realhunger<0){realhunger=0}
    if (enemy_army_strength<0){enemy_army_strength=0}

    document.getElementById("boko").innerHTML = round_num(enemy_army_strength,2);
    document.getElementById("struct").innerHTML = round_num(infrastructure,2);
    document.getElementById("bal").innerHTML = round_num(money,2);
    document.getElementById("food").innerHTML = Math.round(realhunger*10)/10;
    document.getElementById("trans").innerHTML = transaqua;
}

function load_page_content() {
    selected_country = inspect_biscuit("country_index")
    // China, USA, France, Australia
    // 0, 1, 2, 3
    
    placeholder_img = document.getElementById("port")
    oga = document.getElementById("oga")

    var xci0 = 'lpara_0ci'
    var xci1 = 'lpara_1ci'
    var xci2 = 'lpara_2ci'
    var xci3 = 'lpara_3ci'

    if (selected_country==0) { // China
        effect_infrastructure = 0.85
        placeholder_img.src = "china1.jpg"
        oga.innerHTML = String( oga.innerHTML ).replace( "PLACEHOLDER", "Xi Jinping" )
        // this.alert("You have selected the country China. Infrastructure cost has been reduced by 15%")

        var rm = [xci1,xci2,xci3]
    }

    if (selected_country==1) { // USA
        random_event_chances['food_shipment'] = 8.25541
        placeholder_img.src = "usa1.jpg"
        oga.innerHTML = String( oga.innerHTML ).replace( "PLACEHOLDER", "Martin Van Burren" )
        // this.alert("You have selected the country USA. Food shipments will come a lot more frequently")

        var rm = [xci0,xci2,xci3]
    }

    if (selected_country==2) { // France
        military_cheap = 0.8
        random_event_chances['civil_unrest'] = 0.8
        placeholder_img.src = "france1.jpg"
        oga.innerHTML = String( oga.innerHTML ).replace( "PLACEHOLDER", "Charles De Gaul" )
        // this.alert("You have selected the country France. Waging war on boko haram is now 20% cheaper, and civil unrest is slightly less likely to occur")

        var rm = [xci1,xci0,xci3]
    }

    if (selected_country==3) { // Australia
        education_cost = 1.5
        infrastructure_deteriorate = 0.4
        placeholder_img.src = "aus1.jpg"
        oga.innerHTML = String( oga.innerHTML ).replace( "PLACEHOLDER", "James Scullin" )
        // this.alert("You have selected the country Australia. Infrastructure deteriorates at 60% slower from any non-event cause (such as education, or military strengthening). Education now also costs 25% less.")

        var rm = [xci1,xci2,xci0]
    }

    this.console.log(rm)
    console.log("selected country : "+selected_country.toString())

    for (var i=0; i<rm.length; i++) {
        var r=rm[i]
        console.log(r)
        var elem = document.getElementById(r)
        elem.parentNode.removeChild(elem)
        this.console.log("removed : "+r)
    }
};

window.onload = function () {
    document.getElementById("military").onclick = military
    document.getElementById("infrastructure").onclick = improve_infrastructure
    document.getElementById("save_money").onclick = save_money
    document.getElementById("educate").onclick = educate
    document.getElementById("transaqua_button").onclick = trans_aqua
}
