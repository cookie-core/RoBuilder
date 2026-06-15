const POSSIBLE_EDGES_COUNT = [ 3, 4, 6, 8, 9, 12, 18, 24, 36, 72 ];

function updateSVG(edgesSize, edgesCount) {
    // lets cook
    const span = document.getElementById("cbes-angle-between-edges")
    const svg = document.getElementById("cbes-field");

    if (span) span.textContent = 180 - 360 / edgesCount;
    
    const radius = (edgesSize / 16) * 180; 
    let linesHTML = "";
    
    const addAngle = -Math.PI / 2;
    const mulAngle = 2 * Math.PI / edgesCount;
    for (let i = 0; i < edgesCount; i++) {
        const nextI = (i + 1) % edgesCount;
        const x1 = Math.cos(addAngle + mulAngle * i) * radius, y1 = Math.sin(addAngle + mulAngle * i) * radius;
        const x2 = Math.cos(addAngle + mulAngle * nextI) * radius, y2 = Math.sin(addAngle + mulAngle * nextI) * radius;
        linesHTML += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#000000" stroke-width="4" />`;
    }
    
    if (svg) svg.innerHTML = linesHTML;
}

export function init() {
    console.log("is this code starts");
    const sizeSlider = document.getElementById("cbes-edges-size-slider");
    const sizeLabel = document.getElementById("cbes-edges-size");
    const countSlider = document.getElementById("cbes-edges-count-slider");
    const countLabel = document.getElementById("cbes-edges-count");
    
    let edgesSize = +(localStorage.getItem("cbes-edges-size") ?? 0.2);
    let edgesCount = +(localStorage.getItem("cbes-edges-count") ?? 0); // what does 0 mean? It means 3!

    // oh its 2 am, ill go sleep
    if (sizeSlider) {
        sizeSlider.value = edgesSize;
    }
    if (countSlider) {
        countSlider.value = edgesCount;
    }
    
    if (sizeLabel) {
        sizeLabel.textContent = edgesSize.toString();
    }
    if (countLabel) {
        countLabel.textContent = POSSIBLE_EDGES_COUNT[edgesCount].toString();
    }

    sizeSlider?.addEventListener("input", (event) => {
        edgesSize = +event.target.value;
        localStorage.setItem("cbes-edges-size", edgesSize.toString());
        sizeLabel.textContent = edgesSize.toString();
        // dont ask me why i just dont use newSize as string 

        updateSVG(edgesSize, POSSIBLE_EDGES_COUNT[edgesCount]);
    });

    countSlider?.addEventListener("input", (event) => {
        edgesCount = +event.target.value;
        localStorage.setItem("cbes-edges-count", edgesCount.toString());
        countLabel.textContent = POSSIBLE_EDGES_COUNT[edgesCount].toString();

        updateSVG(edgesSize, POSSIBLE_EDGES_COUNT[edgesCount]);
    });
    updateSVG(edgesSize, POSSIBLE_EDGES_COUNT[edgesCount]);
}

export function destroy() {
}
