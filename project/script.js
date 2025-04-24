new Sortable(document.getElementById('inv-grid'),{
    animation: 150,
    swap: true
})

// Items
let items = [
    {
      "id": 0,
      "name": "Health Potion",
      "icon": "./img/potions/red.png",
      "itemCount": 0
    },
    {
      "id": 1,
      "name": "Mana Potion",
      "icon": "./img/potions/blue.png",
      "itemCount": 0
    },
    {
      "id": 2,
      "name": "Mega Potion",
      "icon": "./img/potions/mega.png",
      "itemCount": 0
    },
    {
      "id": 3,
      "name": "Luck Potion",
      "icon": "./img/potions/green.png",
      "itemCount": 3
    },
    {
      "id": 4,
      "name": "Golden Dog",
      "icon": "./img/Pets/golden-dog.png",
      "itemCount": 1
    },
    {
      "id": 5,
      "name": "XP Potion",
      "icon": "./img/potions/yellow (1).png",
      "itemCount": 1
    }
  ]
  

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
let xp = 0;

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
        if (value == 6) {
            luckyrolls++
        }
        for (let index = 0; index <= 6; index++) {
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
        xp += value * 60
        lvl = xp / 1000
        money += Math.ceil(parseInt(money) + value + Math.pow(value, lvl))
        moneyElem.innerHTML = money
        rolls++

        document.getElementById('luck').innerHTML = luck + "x"
        document.getElementById('xp-count').innerHTML = xp + "/1000 XP"
        document.getElementById('bar-empty').style.width = (xp/5) + "px"
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
        phi = phi % 360
        if(phi >=  0 && phi < 60){
            items[1].itemCount++
        }
        if(phi >=  60 && phi < 120){
            items[5].itemCount++
        }
        if(phi >=  120 && phi < 180){
            items[3].itemCount++
        }
        if(phi >=  180 && phi < 240){
            items[2].itemCount++
        }
        if(phi >=  240 && phi < 300){
            items[0].itemCount++
        }
        if(phi >=  300 && phi < 360){

            items[4].itemCount++
        }

        updateInventorySlots()
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
        document.getElementById('timer-wheel').innerHTML = ""
        document.getElementById('spin-wheel').style.backgroundColor = `#E8DA1B`
    }


    if (date.getHours() == 23 && date.getMinutes() == 59 && date.getSeconds() == 59) {
        state = 0;
    }
}

setInterval(updateState, 1)


 // Daily stuff

 let dailyCounter = 1;
 let claimed = false;
 let claimstate =  0;
 function claimDaily() {
     if(dailyCounter / 3 == 1){
        items[2].itemCount++
     }else if(dailyCounter / 2 == 1){
        items[5].itemCount++
     }else if(dailyCounter / 1 == 1){
        items[3].itemCount++
        console.log("test")
     }
     if(claimstate == 0){
     const currentDayElement = document.querySelector(`#daily-reward-grid div:nth-child(${dailyCounter})`);
     if (currentDayElement) {
         currentDayElement.style.backgroundColor = 'grey';
     }
     claimstate = 1;
     dailyCounter++
     claimed = true


     if (dailyCounter > 9) {
        for (let i = 1; i <= 9; i++) {
        document.querySelector(`#daily-reward-grid div:nth-child(${i})`).style.backgroundColor = 'white';
        }
         dailyCounter = 1
     }
     document.getElementById('daily-claim').style.backgroundColor = 'grey';
    }
 }
 
//BUG BEI RESET BEI MITTERNACHT
//MAN KANN KEIN ZWEITES MAL CLAIMEN

 function updateDailyState() {
    const date = new Date();
    let hoursLeft = 23 - date.getHours();
    let minutesLeft = 59 - date.getMinutes();
    let secondsLeft = 59 - date.getSeconds();
    
    

     if (claimed) {
 
         if(hoursLeft > 0 && minutesLeft > 0 && secondsLeft > 0){
            document.getElementById('dailyrewards-cd').innerHTML = (hoursLeft <= 9 ? "0" : "") + hoursLeft + ":" + (minutesLeft <= 9 ? "0" : "") + minutesLeft + ":" + (secondsLeft <= 9 ? "0" : "") + secondsLeft;
            document.getElementById('dailyrewards-cd').style.color = "lightgrey";
     }else if(hoursLeft <= 0 && minutesLeft <= 0 && secondsLeft <= 0){
        claimstate = 0
        claimed = false;
         document.getElementById('dailyrewards-cd').innerHTML = "Claim now!";
         document.getElementById('daily-claim').style.backgroundColor = '#E8DA1B';
     }
    }
}
 setInterval(updateDailyState, 50)
 setInterval(updateInventorySlots, 2000)


 function generateInventory() {
    let grid = document.getElementById('inv-grid');
    grid.innerHTML = ""

    for (let index = 0; index < 30; index++) {
        grid.innerHTML += `<div id="${index}_inv" class="inv-bg"></div>`;
    }
}
function updateInventorySlots() {
    for (let i = 0; i < 30; i++) {
        const slot = document.getElementById(`${i}_inv`);
        if (slot) slot.innerHTML = "";
    }
    let slotIndex = 0;
    for (let i = 0; i < items.length; i++) {
        if (items[i].itemCount >= 1 && slotIndex < 30) {
            let slot = document.getElementById(`${slotIndex}_inv`);
            if (slot) {
                slot.innerHTML = `
                    <img src="${items[i].icon}" class="item-icon" />
                    <span class="item-count">${items[i].itemCount}</span>
                `;
                slotIndex++;
            }
        }
    }
}

