new Sortable(document.getElementById('inv-grid'),{
    animation: 150,
    swap: true
})

let click = new Audio("./audio/click.mp3")
let spin = new Audio("./audio/spin.mp3")
let wow = new Audio("./audio/wow.mp3")
let swipe = new Audio("./audio/swipe.mp3")

function playNavSound() {
    playSwipeSound();
}

// Items
let items = [
    {
      "id": 0,
      "name": "Health Potion (Slightly increases money)",
      "icon": "./img/potions/red.png",
      "itemCount": 2,
      "function": "useHealth()"
    },
    {
      "id": 1,
      "name": "Mana Potion (Slightly increases XP)",
      "icon": "./img/potions/blue.png",
      "itemCount": 3,
      "function": "useMana()"
    },
    {
      "id": 2,
      "name": "Mega Potion (Increases Megaluck by +1x)",
      "icon": "./img/potions/mega.png",
      "itemCount": 4,
      "function": "useMega()"
    },
    {
      "id": 3,
      "name": "Luck Potion (Increases Luck by +2x)",
      "icon": "./img/potions/green.png",
      "itemCount": 2,
      "function": "useLuck()"
    },
    {
      "id": 4,
      "name": "Golden Dog (Increases Pet Luck by +2x)",
      "icon": "./img/Pets/golden-dog.png",
      "itemCount": 0
    },
    {
      "id": 5,
      "name": "XP Potion (Boost current XP)",
      "icon": "./img/potions/yellow (1).png",
      "itemCount": 1000,
      "function": "useXP()"
    }
    ,
    {
      "id": 6,
      "name": "egg",
      "icon": "./img/eggs/egg1.png",
      "itemCount": 1,
      "function": "rollEgg(6)"
    }
    ,
    {
      "id": 7,
      "name": "egg",
      "icon": "./img/eggs/egg2.png",
      "itemCount": 1,
      "function": "rollEgg(7)"
    }
    ,
    {
      "id": 8,
      "name": "egg",
      "icon": "./img/eggs/egg3.png",
      "itemCount": 1,
      "function": "rollEgg(8)"
    }
    ,
    {
      "id": 9,
      "name": "egg",
      "icon": "./img/eggs/egg4.png",
      "itemCount": 1,
      "function": "rollEgg(9)"
    }
    ,
    {
      "id": 10,
      "name": "egg",
      "icon": "./img/eggs/egg5.png",
      "itemCount": 1,
      "function": "rollEgg(10)"
    }
    ,
    {
      "id": 11,
      "name": "egg",
      "icon": "./img/eggs/egg6.png",
      "itemCount": 1,
      "function": "rollEgg(11)"
    }
    ,
    {
      "id": 12,
      "name": "key",
      "icon": "./img/key/keyBlue.png",
      "itemCount": 1
    }
    ,
    {
      "id": 13,
      "name": "key",
      "icon": "./img/key/keyGold.png",
      "itemCount": 4
    }
    ,
    {
      "id": 14,
      "name": "key",
      "icon": "./img/key/keyBlack.png",
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
let petLuck = 0
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
            playSpinSound();
            rng = Math.ceil(Math.random() * 1000)
            console.log("rng:" + rng)
            rng+= luck + 4 * megaluck + petLuck
            console.log("rng:" + rng)
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
            if (rng > 1000) {
                value = 6
                rarity = "SECRET"
                color = "white"
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
                wow.play()
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
        money += Math.ceil(parseInt(money) + value + Math.pow(lvl, value))
        moneyElem.innerHTML = money
        rolls++
        document.getElementById('luck').innerHTML = luck + "x"
        document.getElementById('xp-count').innerHTML = xp + "/1000 XP"
        document.getElementById('xp-level').innerHTML = "LVL: " + Math.ceil(lvl)
        document.getElementById('bar-empty').style.width = (xp/5) + "px"
        document.getElementById('megaluck').innerHTML = megaluck + "x"
        document.getElementById('rolls').innerHTML = rolls
        document.getElementById('luckyrolls').innerHTML = luckyrolls
    }, 5000);
    
}

function startTutorial() {
      document.getElementById('overlay').style.visibility = "visible"
      document.getElementById('overlay').style.opacity = "0.9"
      document.getElementById('navigation').style.zIndex = "-1"
      document.getElementById('image-block').style.zIndex = "-1"
      document.getElementById('roll-btn').disabled = true

        document.getElementById('tut-story').innerHTML = "Welcome to the Loot RNG!"
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "This is the Main Page!"     
            document.getElementById('tut-image').src = "./img/nav/lucky.png"     
            
        }, 1600);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "Here You can Roll the Cube to get Money!"     
        }, 5600);

        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "Speaking of Money there is also the Egg Shop!"     
            document.getElementById('tut-image').src = "./img/nav/egg.png"     
        }, 8600);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "You can buy Eggs to get Pets!"     
        }, 11600);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "Pets Increase your Luck permanently They wont go away on a rebirth!"     
        }, 14600);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "Now lets go to the Inventory!"     
            document.getElementById('tut-image').src = "./img/nav/backpack.png"     
        }, 17000);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "You can use Items to get more Money or XP!"     
        }, 20000);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "You can also use Eggs to get Pets! or Keys to get more Eggs!"     
        }, 23000);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "Also dont forget to claim your Daily Reward!"     
        }, 26000);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "Now for the explore Page!"     
            document.getElementById('tut-image').src = "./img/nav/sword.png"     
        }, 28000);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "Simply click the Key to get a level based amount of Eggs!"        
        }, 31000);
        setTimeout(() => {
            document.getElementById('tut-story').innerHTML = "Also dont use the Key on low levels! Im sure you will find your way around!"        
        }, 34000);
        setTimeout(() => {
            
            document.getElementById('tut-image').src = ""     
            document.getElementById('tut-story').innerHTML = ""        
            document.getElementById('overlay').style.visibility = "hidden"
            document.getElementById('overlay').style.opacity = "0"
            document.getElementById('roll-btn').disabled = false
            document.getElementById('navigation').style.zIndex = "1000"
            document.getElementById('image-block').style.zIndex = "1000"
        }, 38000);

      

      
}

function useHealth() {
   playUseSound()
    if (items[0].itemCount >= 1) {
        items[0].itemCount--
        money +=  Math.ceil(parseInt(money) + 3 + Math.pow(lvl, 3)) * 10
        moneyElem.innerHTML = money
        console.log(money)
        updateInventorySlots()
    }
}
function useMana() {
     playUseSound()
    if (items[1].itemCount >= 1) {
        items[1].itemCount--
        xp += Math.ceil((lvl * 120) + 100)
        document.getElementById('xp-count').innerHTML = xp + "/1000 XP"
        document.getElementById('bar-empty').style.width = (xp/5) + "px"
        updateInventorySlots()
    }
}
function useMega() {
     playUseSound()
    if (items[2].itemCount >= 1) {
        items[2].itemCount--
        document.getElementById('luck').innerHTML = luck + "x"
        luck += 3
        megaluck += 1
        document.getElementById('megaluck').innerHTML = megaluck + "x"
        document.getElementById('rolls').innerHTML = rolls
        console.log(money)
        updateInventorySlots()
    }
}
function useLuck() {
     playUseSound()
    if (items[3].itemCount >= 1) {
        items[3].itemCount--
        document.getElementById('luck').innerHTML = luck + "x"
        luck += 2
        document.getElementById('megaluck').innerHTML = megaluck + "x"
        document.getElementById('rolls').innerHTML = rolls
        console.log(money)
        updateInventorySlots()
    }
}
function useXP() {
    playUseSound()
    if (items[5].itemCount >= 1) {
        items[5].itemCount--
        xp += Math.ceil((lvl * 220) + 500)
       document.getElementById('xp-count').innerHTML = xp + "/1000 XP"
       document.getElementById('bar-empty').style.width = (xp/5) + "px"
        updateInventorySlots()
    }
}
function rollEgg(idEgg) {
    playUseSound()
    if (items[idEgg].itemCount >= 1) {
        items[idEgg].itemCount--
        let rng = Math.ceil(Math.random() * 3)
        if (rng == 1 || rng == 2) {
            items[4].itemCount++
            petLuck += 2 
        }
        updateInventorySlots()
    }
}

function exploreStart() {
    let msg = `<div><h2>No keys available</h2></div>`;
    let foundKey = false;

    if (planet == "normal" && items[12].itemCount >= 1) {
         document.getElementById('overlay2').style.visibility = "visible"
        document.getElementById('overlay2').style.opacity = "0.8"
        items[12].itemCount--;
        msg = `<h2>You Lost a</h2> <img class="imgExplore" src="${items[12].icon}"> <h2>and got ${lvl}</h2> <img class="imgExplore" src="${items[4].icon}">`;
        
        items[4].itemCount += lvl;
        foundKey = true;
        setTimeout(() => {
            playChestkSound();
        }, 2000);
    }
    if (planet == "vip" && items[13].itemCount >= 1) {
        document.getElementById('overlay2').style.visibility = "visible"
        document.getElementById('overlay2').style.opacity = "0.8"
        items[13].itemCount--;
        setTimeout(() => {
            let chest = new Audio("./audio/chest.mp3")
        chest.play()
        }, 2000);
        msg = `<h2>You Lost a</h2> <img class="imgExplore" src="${items[13].icon}"> <h2>and got ${lvl}</h2> <img class="imgExplore" src="${items[4].icon}">`;
        items[4].itemCount += lvl;
        foundKey = true;
    }
    if (planet == "hell" && items[14].itemCount >= 1) {
        document.getElementById('overlay2').style.visibility = "visible"
        document.getElementById('overlay2').style.opacity = "0.8"
        items[14].itemCount--;
       setTimeout(() => {
            let chest = new Audio("./audio/chest.mp3")
        chest.play()
        }, 2000);
        msg = `<h2>You Lost a</h2> <img class="imgExplore" src="${items[14].icon}"> <h2>and got ${lvl}</h2> <img class="imgExplore" src="${items[4].icon}">`;
        items[4].itemCount += lvl;
        foundKey = true;
    }

    document.getElementById('messageEx').innerHTML = msg;
    document.getElementById('messageEx').style.display = "block";
    document.getElementById('chestOpen').style.display = "block";
    document.getElementById('messageEx').style.opacity = 1;
    setTimeout(() => {
        document.getElementById('overlay2').style.visibility = "hidden"
                document.getElementById('overlay2').style.opacity = "0"
        document.getElementById('messageEx').style.opacity = 0;
        document.getElementById('chestOpen').style.display = "none";
    }, 4000);
    setTimeout(() => {
        document.getElementById('chestPNG').src="./img/key/494ddb182835971.65350ee2037a9.gif";
    }, 1000);
    setTimeout(() => {
        document.getElementById('messageEx').style.display = "none";
    }, 5000);

    if (foundKey) updateInventorySlots();
}

function openStats() {
    document.getElementById('stats-pop').style.display = "block"
    playClickSound()
}
function openShop() {
    document.getElementById('shop-pop').style.display = "block"
    playClickSound()
}
function openSettings() {
    document.getElementById('settings-pop').style.display = "block"
     playClickSound()
}
function openLevel(){
    document.getElementById('lvl-pop').style.display = "block"
     playClickSound()
}
function openRebirth() {
    document.getElementById('rebirth-pop').style.display = "block"
    if( lvl >= 0 && lvl < 5){
        document.getElementById('key-reward').src = `./img/gui/X 2nd Outline 256px.png`
    }
    if( lvl >= 5 && lvl < 10){
        document.getElementById('key-reward').src = `./img/key/keyBlue.png`
    }
    if( lvl >= 10 && lvl < 15){
        document.getElementById('key-reward').src = `./img/key/keyGold.png`
    }
    if( lvl >= 15){
        document.getElementById('key-reward').src = `./img/key/keyBlack.png`
    }
    playClickSound()
}



function closeStats() {
    playClickSound()
    document.getElementById('stats-pop').style.display = "none"
}

function closeRebirth() {
    playClickSound()
    document.getElementById('rebirth-pop').style.display = "none"
}

function closeLevel() {
     playClickSound()
    document.getElementById('lvl-pop').style.display = "none"
}
function closeShop() {
    playClickSound()
    document.getElementById('shop-pop').style.display = "none"
}
function closeSettings() {
     playClickSound()
    document.getElementById('settings-pop').style.display = "none"
}
function openCalendar() {
    playClickSound()
    document.getElementById('daily-pop').style.display = "block"
}


function closeCalendar() {
    let click = new Audio("./audio/click.mp3")
     playClickSound()
    document.getElementById('daily-pop').style.display = "none"
}
function openWheel() {
    let click = new Audio("./audio/click.mp3")
     playClickSound()
    document.getElementById('spinning-pop').style.display = "block"
}


function closeWheel() {
    let click = new Audio("./audio/click.mp3")
     playClickSound()
    document.getElementById('spinning-pop').style.display = "none"
}

let phi = 0;
let state = 0;
function spinWheel() {
    playRollSound();
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
        
        setTimeout(() => {
        wow.play() 
        }, 6000);
        updateInventorySlots()
    }
    

}
function playClickSound() {
    let click = new Audio("./audio/click.mp3");
    click.volume = document.getElementById('sfx-range').value / 100;
    if (document.getElementById('sfx-toggle').checked) {
        click.play();
    }
}
function playSpinSound() {
    let spin = new Audio("./audio/spin.mp3");
    spin.volume = document.getElementById('sfx-range').value / 100;
    if (document.getElementById('sfx-toggle').checked) {
        spin.play();
    }
}
function playRollSound() {
    let roll = new Audio("./audio/roll.mp3");
    roll.volume = document.getElementById('sfx-range').value / 100;
    if (document.getElementById('sfx-toggle').checked) {
        roll.play();
    }
}

function playUseSound() {
    let use = new Audio("./audio/use.mp3");
    use.volume = document.getElementById('sfx-range').value / 100;
    if (document.getElementById('sfx-toggle').checked) {
        use.play();
    }
}
function playChestSound() {
    let chest = new Audio("./audio/chest.mp3");
    chest.volume = document.getElementById('music-range').value / 100;
    if (document.getElementById('music-toggle').checked) {
        chest.play();
    }
}
function playSwipeSound() {
    let swipe = new Audio("./audio/swipe.mp3");
    swipe.volume = document.getElementById('sfx-range').value / 100;
    if (document.getElementById('sfx-toggle').checked) {
        swipe.play();
    }
}

let counterR = 0;
function UpgradeRank(){
    console.log(counterR)
    console.log(lvl)
    if(lvl >= 5 && counterR == 0){
        counterR++;
        luck += 10
        document.getElementById('rankImg').src = `./img/gui/3.png`
        playUseSound()
    }else if(lvl >= 10 && counterR == 1){
        document.getElementById('rankImg').src = `./img/gui/2.png`
        luck += 30
        playUseSound()
    }else{
    document.getElementById('upgrade-btn').innerHTML = "Not Ready yet!"
    document.getElementById('upgrade-btn').style = "background-color: grey;"
        let timeoutId = setTimeout(() => {
            document.getElementById('upgrade-btn').innerHTML = "UPGRADE"
            document.getElementById('upgrade-btn').style = "background-color:rgb(10, 228, 10)"
            clearTimeout(timeoutId);
        }, 900);

    }
}

function Rebirth(){
    closeRebirth()
    playUseSound()
    document.getElementById('rankImg').src = `./img/gui/1.png`
    money = 0
    xp = 0
    lvl = 0
    luck = 1
    megaluck = 1
    document.getElementById('money').innerHTML = money
    document.getElementById('luck').innerHTML = luck + "x"
    document.getElementById('megaluck').innerHTML = megaluck + "x"
    document.getElementById('xp-count').innerHTML = xp + "/1000 XP"
    document.getElementById('bar-empty').style.width = "0px"
    document.getElementById('xp-level').innerHTML = "LVL: " + Math.ceil(lvl)
//repoint keys
     if( lvl >= 0 && lvl < 5){
        document.getElementById('key-reward').src = `./img/gui/X 2nd Outline 256px.png`
    }
    if( lvl >= 5 && lvl < 10){
        items[12].itemCount++
        document.getElementById('key-reward').src = `./img/key/keyBlue.png`
    }
    if( lvl >= 10 && lvl < 15){
    items[13].itemCount++
        document.getElementById('key-reward').src = `./img/key/keyGold.png`
    }
    if( lvl >= 15){
    items[14].itemCount++
        document.getElementById('key-reward').src = `./img/key/keyBlack.png`
    }
}

function updateState() {
    if(document.getElementById('sfx-toggle').checked == false){
    wow.muted = true
    spin.muted = true
    }

    if(xp >= 1000){
        xp = 0;
        lvl++
        document.getElementById('xp-level').innerHTML = "LVL: " + Math.ceil(lvl)
    }
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
    wow.play()
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
                    <img onclick="${items[i].function}" src="${items[i].icon}" class="item-icon" title="${items[i].name}" />
                    <span class="item-count">${items[i].itemCount}</span>
                `;
                slotIndex++;
            }
        }
    }
}

function buyEggs(idBuy , price , color){
    if(money >= price){
        playClickSound();
        money -= price
        document.getElementById('money').innerHTML = money
        items[idBuy].itemCount++
        updateInventorySlots()
        color.style.filter = "drop-shadow(0 0 7px green)";
        setTimeout(() => {
           color.style.filter = "none"
        }, 1000);
    }else{
        let wrong = new Audio("./audio/wrong.mp3")
        wrong.play()
       color.style.filter = "drop-shadow(0 0 7px red)";
        setTimeout(() => {
            color.style.filter = "none"
        }, 1000);  
    }
    
    }


    let counterSlider = -1;
    let SliderLock = true;
    let planet = "normal"
    function sliderNext(){
        if(SliderLock == true && counterSlider == -1){
            counterSlider = 2
            SliderLock = false
        }

        counterSlider--
        if(counterSlider < 0){
            counterSlider = 2
        }
        updateSlider()
}
    function sliderBack(){
        counterSlider++
        if(counterSlider > 2){
            counterSlider = 0
        }
        updateSlider()
}

function updateSlider(){
    if(counterSlider == 0){
    playClickSound()
        document.getElementById('planet1').src = `./img/planets/hell.png`
        document.getElementById('planet2').src = `./img/planets/vip.png`
        document.getElementById('planet3').src = `./img/planets/normal.png`
        document.getElementById('skybox').style.background = `linear-gradient(180deg,rgb(246, 255, 0) 0%,rgb(196, 201, 168) 77%,rgb(235, 237, 127) 92%,rgb(220, 220, 220) 100%)`
        planet = "vip"
    }
    if(counterSlider == 1){
    playClickSound()
        document.getElementById('planet1').src = `./img/planets/normal.png`
        document.getElementById('planet2').src = `./img/planets/hell.png`
        document.getElementById('planet3').src = `./img/planets/vip.png`
        document.getElementById('skybox').style.background = `linear-gradient(180deg,rgb(180, 68, 16) 0%,rgb(206, 163, 5) 77%,rgb(202, 237, 127) 92%,rgb(167, 84, 81) 100%)`
        planet = "hell"
        
    }
    if(counterSlider == 2){
    playClickSound()
        document.getElementById('planet1').src = `./img/planets/vip.png`
        document.getElementById('planet2').src = `./img/planets/normal.png`
        document.getElementById('planet3').src = `./img/planets/hell.png`
        document.getElementById('skybox').style.background = `linear-gradient(180deg, #08205B 0%, #385191 77%, #3F5794 92%, #5169A7 100%)`
        planet = "normal"
        return
    }
}