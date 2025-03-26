let rng = 0 
let value = 0
let rarity = ""
let delay = 50
function rollStart(){
    document.getElementById('overlay').style.visibility = "visible"
    document.getElementById('overlay').style.opacity = "0.8"
    for (let index = 0; index < 20; index++) {
        setTimeout(() => {  
            rng = Math.ceil(Math.random() * 1000)
            if(rng >= 0 && rng <= 400){
                value = 1
                rarity = "common"
                document.getElementById('image-block').src = "./img/lucky-blocks/common.png"
            }    
            if(rng >400  && rng <= 650){
                rarity = "uncommon"
                value = 2
                document.getElementById('image-block').src = "./img/lucky-blocks/cyan.png"
            }
            if(rng >650  && rng <= 800){
                rarity = "rare"
                value = 3
                document.getElementById('image-block').src = "./img/lucky-blocks/rare.png"
            }
            if(rng >800  && rng <= 950){
                  rarity = "epic"
                value = 4
                document.getElementById('image-block').src = "./img/lucky-blocks/epic.png"
            }
            if(rng >950  && rng <= 980){
                  rarity = "ultra rare"
                value = 5
                document.getElementById('image-block').src = "./img/lucky-blocks/ultrarare.png"
            }
            if(rng >980  && rng <= 1000){
                value = 6
                rarity = "legendary"
                document.getElementById('image-block').src = "./img/lucky-blocks/legendary.png"
            }

        }, (index * delay));
        delay += 10
        
       
        setTimeout(() => {
             for (let index = 0; index <= 6; index++) {
        document.getElementById('rarity').innerHTML = rarity
        document.getElementById('rarity').style.opacity = 1

    }
        }, 5000);
        
        
        
    }
}