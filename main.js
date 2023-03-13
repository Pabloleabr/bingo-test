

const results = document.getElementById("results")
const button = document.getElementById("generate")


function createPortion(pNum){
    let ele = document.createElement("button") 
    ele.id = "portion" + pNum
    ele.className = "bingocard"
    ele.style.backgroundColor = "whitesmoke"
    ele.onclick = () => {
        ele.style.backgroundColor = ele.style.backgroundColor != "whitesmoke" ?  "whitesmoke" : "rgb(149, 236, 163)";
    }

    return ele
}



function generate() {
    results.innerHTML = ""
    const BINGO = ["1","2","tegadushduqwh","asñjkdñaksd","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh"
    ,"tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh","tegadushduqwh"]
    BINGO.sort((a, b) => 0.5 - Math.random());
    let resize = 5
    let cellSize = 100

    for (let index = 0; index < resize; index ++) {
        const element = document.createElement("div")
        element.style.display = "flex"
        for (let y = 0; y < resize; y++) {
            let cell = createPortion(index + " " + y)
            cell.innerText = BINGO.pop()
            element.appendChild(cell)
        }
        results.appendChild(element)
    }
}

button.addEventListener("click", generate)
