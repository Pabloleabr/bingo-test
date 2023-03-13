const results = document.getElementById("results")
const button = document.getElementById("generate")


function createPortion(value){
    let ele = document.createElement("button") 
    ele.name = value
    ele.classList.add("bingocard")
    ele.style.backgroundColor = "whitesmoke"
    ele.onclick = () => {
        let samevalue = document.querySelectorAll(`button[name="${value}"]`);
        console.log(samevalue, `button[name="${value}"]`);
        samevalue.forEach(element => {
            element.style.backgroundColor = element.style.backgroundColor != "whitesmoke" ?  "whitesmoke" : "rgb(149, 236, 163)";
        });
    }

    return ele
}

/** example
 * 1
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
 * 54
 */
function generate() {
    results.innerHTML = ""
    const bingoElement = document.getElementById("bingo")
    
    const peopleEle = document.getElementById("people")
    const PEOPLE = peopleEle.value.split("\n")
    let resize = 5

    for (const name of PEOPLE) {
        const BINGO = bingoElement.value.split("\n")
        BINGO.sort((a, b) => 0.5 - Math.random());
        const h2 = document.createElement("H2");
        h2.innerText = name
        results.appendChild(h2)
        for (let index = 0; index < resize; index ++) {
            const element = document.createElement("div")
            element.style.display = "flex"
            for (let y = 0; y < resize; y++) {
                let value = BINGO.pop()
                let cell = createPortion(value)
                cell.innerText = value
                element.appendChild(cell)
            }
            results.appendChild(element)
        }
        const space = document.createElement("div");
        space.style = "height: 100px;"
        results.appendChild(space)
    }
}

button.addEventListener("click", generate)
