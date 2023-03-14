const results = document.getElementById("results")
const button = document.getElementById("generate")
let bingos = {}
let positions = {}
let winners = {}    

function createPortion(value){
    let ele = document.createElement("button") 
    ele.name = value
    ele.classList.add("bingocard")
    ele.style.backgroundColor = "whitesmoke"
    ele.onclick = () => {
        let samevalue = document.querySelectorAll(`button[name="${value}"]`);
        samevalue.forEach(element => {
            element.style.backgroundColor = element.style.backgroundColor != "whitesmoke" ?  "whitesmoke" : "rgb(149, 236, 163)";
        });
        
        for (const name in bingos) {
            if (Object.hasOwnProperty.call(bingos, name)) {
                bingos[name][value][2] = !bingos[name][value][2]
                let pos = bingos[name][value][0] + "_" + bingos[name][value][1]
                positions[name][pos] = !positions[name][pos]
            }
        } 
        //ugly code ahead
        for (const name in positions) {
            //comprueba todas la filas
            if((positions[name]["0_0"] && positions[name]["0_1"] && positions[name]["0_2"]  && positions[name]["0_3"]  && positions[name]["0_4"]) || (positions[name]["1_0"] && positions[name]["1_1"] && positions[name]["1_2"]  && positions[name]["1_3"]  && positions[name]["1_4"]) || (positions[name]["2_0"] && positions[name]["2_1"] && positions[name]["2_2"]  && positions[name]["2_3"]  && positions[name]["2_4"]) || (positions[name]["3_0"] && positions[name]["3_1"] && positions[name]["3_2"]  && positions[name]["3_3"]  && positions[name]["3_4"]) || (positions[name]["4_0"] && positions[name]["4_1"] && positions[name]["4_2"]  && positions[name]["4_3"]  && positions[name]["4_4"])){
                winners[name] = true
            }
            //comprueba todas las columanas
            else if((positions[name]["0_0"] && positions[name]["1_0"] && positions[name]["2_0"]  && positions[name]["3_0"]  && positions[name]["4_0"]) || (positions[name]["0_1"] && positions[name]["1_1"] && positions[name]["2_1"]  && positions[name]["3_1"]  && positions[name]["4_1"]) || (positions[name]["0_2"] && positions[name]["1_2"] && positions[name]["2_2"]  && positions[name]["3_2"]  && positions[name]["4_2"]) ||  (positions[name]["0_3"] && positions[name]["1_3"] && positions[name]["2_3"]  && positions[name]["3_3"]  && positions[name]["4_3"]) ||  (positions[name]["0_4"] && positions[name]["1_4"] && positions[name]["2_4"]  && positions[name]["3_4"]  && positions[name]["4_4"])){
                winners[name] = true
            }
            //comprueba todas las diagonales
            else if((positions[name]["1_1"] && positions[name]["2_2"] && positions[name]["0_0"]  && positions[name]["3_3"]  && positions[name]["4_4"]) || (positions[name]["0_4"] && positions[name]["1_3"] && positions[name]["2_2"]  && positions[name]["3_1"]  && positions[name]["4_0"])){
                winners[name] = true
            }
            else {
                winners[name] = false
            }
        }
        
        console.log(positions, winners);
    }

    return ele
}
const strExample = `* 1
* 2
* 3
* 4
* 5
* 11
* 21
* 31
* 41
* 51
* 12
* 22
* 32
* 42
* 52
* 13
* 23
* 33
* 43
* 53
* 14
* 24
* 34
* 44
* 54`

function generate(bingo, people) {
    results.innerHTML = ""
    const bingoElement = document.getElementById("bingo").value == "" ? bingo : document.getElementById("bingo").value
    
    const peopleEle = document.getElementById("people").value == "" ? people : document.getElementById("people").value
    const PEOPLE = peopleEle.split("\n")
    let resize = 5

    for (const name of PEOPLE) {
        const BINGO = bingoElement.split("\n")
        BINGO.sort((a, b) => 0.5 - Math.random());
        const h2 = document.createElement("H2");
        h2.innerText = name
        bingos[name] = {}
        positions[name] = {}
        results.appendChild(h2)
        for (let x = 0; x < resize; x ++) {
            const element = document.createElement("div")
            element.style.display = "flex"
            for (let y = 0; y < resize; y++) {
                let value = BINGO.pop()
                let cell = createPortion(value)
                cell.innerText = value
                bingos[name][value] = [x, y, false]
                positions[name][x + "_" + y] = false
                element.appendChild(cell)
            }
            results.appendChild(element)
        }
        const space = document.createElement("div");
        space.style = "height: 100px;"
        results.appendChild(space)
    }
}
const nameExample=`pablo
tu`
generate(strExample, nameExample);

button.addEventListener("click", generate);
