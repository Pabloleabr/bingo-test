const results = document.getElementById("results")
const button = document.getElementById("generate")
let bingojson
let bingos
let positions
let winners = {}

async function load(){
    await fetch('./bingo.json')
    .then((response) => response.json())
    .then((json) => {bingojson = json})
    await fetch('./positions.json')
    .then((response) => response.json())
    .then((json) => {positions = json})
    bingos = bingojson.bingos
    let resize = 5
    for (const name in bingos) {
        const h2 = document.createElement("H1");
        h2.innerText = name
        h2.id = name
        results.appendChild(h2)
        let middlemark = true
        for (let x = 0; x < resize; x ++) {
            const element = document.createElement("div")
            element.style.display = "flex"
            for (let y = 0; y < resize; y++) {
                let value = positions[name][x + "_" + y][1]
                let cell = createPortion(value)
                cell.innerText = value
                if(bingojson.middlemark){
                    cell.innerText = ""
                    cell.disabled = true
                    middlemark = false
                }
                element.appendChild(cell)
            }
            results.appendChild(element)
        }
        const space = document.createElement("div");
        space.style = "height: 100px;"
        results.appendChild(space)
    }
    checkWinner()
}

load()

function createPortion(value){
    let ele = document.createElement("button") 
    ele.name = value
    ele.classList.add("bingocard")
    ele.style.backgroundColor = "whitesmoke"
    ele.onclick = () => {
        let samevalue = document.querySelectorAll(`button[name="${value}"]`);
        samevalue.forEach(element => {
            element.style.backgroundColor = element.style.backgroundColor != "whitesmoke" ?  "whitesmoke" : "#D27685";
        });
        
        for (const name in bingos) {
            if (Object.hasOwnProperty.call(bingos, name)) {
                bingos[name][value][2] = !bingos[name][value][2]
                let pos = bingos[name][value][0] + "_" + bingos[name][value][1]
                positions[name][pos][0] = !positions[name][pos][0]
            }
        } 
       checkWinner()
    }

    return ele
}

function checkWinner(){
     //ugly code ahead
     for (const name in positions) {
        //comprueba todas la filas
        if((positions[name]["0_0"][0] && positions[name]["0_1"][0] && positions[name]["0_2"][0]  && positions[name]["0_3"][0]  && positions[name]["0_4"][0]) || (positions[name]["1_0"][0] && positions[name]["1_1"][0] && positions[name]["1_2"][0]  && positions[name]["1_3"][0]  && positions[name]["1_4"][0]) || (positions[name]["2_0"][0] && positions[name]["2_1"][0] && positions[name]["2_2"][0]  && positions[name]["2_3"][0]  && positions[name]["2_4"][0]) || (positions[name]["3_0"][0] && positions[name]["3_1"][0] && positions[name]["3_2"][0]  && positions[name]["3_3"][0]  && positions[name]["3_4"][0]) || (positions[name]["4_0"][0] && positions[name]["4_1"][0] && positions[name]["4_2"][0]  && positions[name]["4_3"][0]  && positions[name]["4_4"][0])){
            winners[name] = true
            
        }
        //comprueba todas las columanas
        else if((positions[name]["0_0"][0] && positions[name]["1_0"][0] && positions[name]["2_0"][0]  && positions[name]["3_0"][0]  && positions[name]["4_0"][0]) || (positions[name]["0_1"][0] && positions[name]["1_1"][0] && positions[name]["2_1"][0]  && positions[name]["3_1"][0]  && positions[name]["4_1"][0]) || (positions[name]["0_2"][0] && positions[name]["1_2"][0] && positions[name]["2_2"][0]  && positions[name]["3_2"][0]  && positions[name]["4_2"][0]) ||  (positions[name]["0_3"][0] && positions[name]["1_3"][0] && positions[name]["2_3"][0]  && positions[name]["3_3"][0]  && positions[name]["4_3"][0]) ||  (positions[name]["0_4"][0] && positions[name]["1_4"][0] && positions[name]["2_4"][0]  && positions[name]["3_4"][0]  && positions[name]["4_4"][0])){
            winners[name] = true
        }
        //comprueba todas las diagonales
        else if((positions[name]["1_1"][0] && positions[name]["2_2"][0] && positions[name]["0_0"][0]  && positions[name]["3_3"][0]  && positions[name]["4_4"][0]) || (positions[name]["0_4"][0] && positions[name]["1_3"][0] && positions[name]["2_2"][0]  && positions[name]["3_1"][0]  && positions[name]["4_0"][0])){
            winners[name] = true
        }
        else {
            winners[name] = false
            document.getElementById(name).innerText = name
            document.getElementById(name).style.animationName = undefined
        }
    }
    for (const name in winners) {
        if (Object.hasOwnProperty.call(winners, name)) {
            if (winners[name]) {
                console.log("the winners are:");
                //window.alert(name + ": Bingoooo!!")
                let nameEle = document.getElementById(name)
                nameEle.style.animationName = "textColorChange"
                nameEle.style.animationDuration =  "2s"
                nameEle.style.animationIterationCount = "infinite"
                nameEle.scrollIntoView({behavior: 'smooth'});
                nameEle.innerText = name + " Won!"
                console.log(name);
            }
        }
    }
    
}


/**
 * generates the bingo elements
 **/
function generate() {
    results.innerHTML = ""
    const bingoElement = document.getElementById("bingo").value //== "" ? bingo : document.getElementById("bingo").value
    const peopleEle = document.getElementById("people").value //== "" ? people : document.getElementById("people").value
    let PEOPLE = peopleEle.split("\n")
    let resize = 5
    for (const name of PEOPLE) {
        let BINGO = bingoElement.split("\n")
        BINGO.sort((a, b) => 0.5 - Math.random());
        const h2 = document.createElement("H1");
        h2.innerText = name
        h2.id = name
        bingos[name] = {}
        positions[name] = {}
        results.appendChild(h2)
        let middlemark = true
        for (let x = 0; x < resize; x ++) {
            const element = document.createElement("div")
            element.style.display = "flex"
            for (let y = 0; y < resize; y++) {
                let value = BINGO.pop()
                let cell = createPortion(value)
                cell.innerText = value
                bingos[name][value] = [x, y, false]
                positions[name][x + "_" + y] = false
                if(document.getElementById("middle").checked && x == 2 && y == 2 && middlemark){
                    cell.innerText = ""
                    cell.disabled = true
                    bingos[name][value] = [x, y, true]
                    positions[name][x + "_" + y] = true
                    middlemark = false
                }
                element.appendChild(cell)
            }
            results.appendChild(element)
        }
        const space = document.createElement("div");
        space.style = "height: 100px;"
        results.appendChild(space)
    }
}

button.addEventListener("click", generate);


