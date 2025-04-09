// Deklarations Part

let rng = 0
let value = 0
let rarity = ""
let delay = 50
let color = ""

// Multiplizierer
let multiplicity = 1;

// Money
let moneyElem = document.getElementById('money');
let money = 0

// LVL 
let lvl = 0

//Luck
let luck = 1
let megaluck = 1

//stats
let rolls = 0
let luckyrolls = 0


let checkCooldown = false
function rollStart() {
    if (checkCooldown) return

    checkCooldown = true
    document.getElementById('overlay').style.visibility = "visible"
    document.getElementById('overlay').style.opacity = "0.8"
    document.getElementById('roll-btn').disabled = true
    for (let index = 0; index < 20; index++) {
        setTimeout(() => {
            rng = Math.ceil(Math.random() * 1000)
            if (rng >= 0 && rng <= 400) {
                value = 1
                rarity = "common"
                color = "green"
                document.getElementById('image-block').src = "./img/lucky-blocks/common.png"
            }
            if (rng > 400 && rng <= 650) {
                rarity = "uncommon"
                color = "lightblue"
                value = 2
                document.getElementById('image-block').src = "./img/lucky-blocks/cyan.png"
            }
            if (rng > 650 && rng <= 800) {
                rarity = "rare"
                color = "darkblue"
                value = 3
                document.getElementById('image-block').src = "./img/lucky-blocks/rare.png"
            }
            if (rng > 800 && rng <= 950) {
                rarity = "epic"
                color = "purple"
                value = 4
                document.getElementById('image-block').src = "./img/lucky-blocks/epic.png"
            }
            if (rng > 950 && rng <= 980) {
                rarity = "ultra rare"
                color = "red"
                value = 5
                document.getElementById('image-block').src = "./img/lucky-blocks/ultrarare.png"
            }
            if (rng > 980 && rng <= 1000) {
                value = 6
                rarity = "legendary"
                color = "yellow"
                document.getElementById('image-block').src = "./img/lucky-blocks/legendary.png"
            }

        }, (index * delay));
        delay += 10

    }
    setTimeout(() => {

        for (let index = 0; index <= 6; index++) {
            if (value == 6) {
                luckyrolls++
            }
            if (index == value) {
                document.getElementById('rarity').innerHTML = rarity
                document.getElementById('rarity').style.opacity = 1
                document.getElementById('image-block').style.filter = `drop-shadow(10px 10px 35px ${color}) drop-shadow(-5px -5px 35px ${color})`
            }
            setTimeout(() => {
                document.getElementById('image-block').style.filter = `none`
                document.getElementById('image-block').src = "./img/lucky-blocks/default.png"
                document.getElementById('rarity').innerHTML = ""
                document.getElementById('overlay').style.visibility = "hidden"
                document.getElementById('overlay').style.opacity = "0"
                document.getElementById('roll-btn').disabled = false
                checkCooldown = false
                delay = 0;
            }, 2000);
        }
        console.log(money)
        money = parseInt(money) + value + Math.pow(value, lvl)
        moneyElem.innerHTML = money
        rolls++
        document.getElementById('luck').innerHTML = luck + "x"
        document.getElementById('megaluck').innerHTML = megaluck + "x"
        document.getElementById('rolls').innerHTML = rolls
        document.getElementById('luckyrolls').innerHTML = luckyrolls
    }, 5000);

}


function openStats() {
    document.getElementById('stats-pop').style.display = "block"
}


function closeStats() {
    document.getElementById('stats-pop').style.display = "none"
}
function openCalendar() {
    document.getElementById('daily-pop').style.display = "block"
}


function closeCalendar() {
    document.getElementById('daily-pop').style.display = "none"
}
function openWheel() {
    document.getElementById('spinning-pop').style.display = "block"
}


function closeWheel() {
    document.getElementById('spinning-pop').style.display = "none"
}

let phi = 0;
let state = 0;
function spinWheel() {

    if (state === 0) {
        state = 1;
        phi += Math.ceil(Math.random() * 8000) + 3000;
        document.getElementById('wheel').style.transform = `rotate(${phi}deg)`
    }
    
}

function updateState() {
    const date = new Date();
    let hoursLeft = 23 - date.getHours();
    let minutesLeft = 59 - date.getMinutes();
    let secondsLeft = 59 - date.getSeconds();
    if(state == 1){
        document.getElementById('spin-wheel').style.backgroundColor = `grey`
        document.getElementById('timer-wheel').innerHTML = (hoursLeft <= 9 ? "0" : "") + hoursLeft + ":" + (minutesLeft <= 9 ? "0" : "") + minutesLeft + ":" + (secondsLeft <= 9 ? "0" : "") + secondsLeft

    }else{
        document.getElementById('spin-wheel').style.backgroundColor = `#E8DA1B`
    }


    if (date.getHours() == 23 && date.getMinutes() == 59 && date.getSeconds() == 59) {
        state = 0;
    }
}

setInterval(updateState, 1)

