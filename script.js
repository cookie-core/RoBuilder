// yooo hi!!! 
// Have a good day :)

const ERROR_HTML = `
<h1>Error while loading a tab :d</h1>
<p>please tell cookie this if you see this</p>
<img src="https://media1.tenor.com/m/AsTrA5cKBZMAAAAC/frieren-crying.gif" />
`;


// just a tab loading function??
// idk how to write comments, sorry :<
let previousTab = "whaaaaat, theres no previous tab! wahtre you talking about???";
let previousModule = { sospecial: "ig you know what i wanna write here", destroy: ()=>{} };
async function loadTab(tab) {
    try {
        const response = await fetch(`tabs/${tab}.html`);
        if (!response.ok) throw new Error(`Download error: ${response.status}`);
        
        previousModule.destroy();
        document.getElementById(tab).setAttribute("disabled", "true");
        document.getElementById("tab-content").innerHTML = await response.text();
        document.getElementById(previousTab)?.removeAttribute("disabled");
        previousTab = tab;
        await aliveCurrentTab();
    } catch (error) {
        console.error("error!!!:", error);
        document.getElementById("tab-content").innerHTML = ERROR_HTML;
    }
}

async function aliveCurrentTab() {
    // yep previousTab now is current tab 
    console.log("is THIS code starts???", previousTab);
    if (previousTab === "circle-by-edge-size") {
        const module = await import("./scripts/circle-by-edge-size.js");
        module.init();
        previousModule = module;
    } else {
        previousModule = { destroy: ()=>{} };
    }
}


// umm i really dont know how to write em 
const tabsContainer = document.getElementById("tabs");
for (const child of tabsContainer.children) {
    child.addEventListener("click", () => {
        loadTab(child.id);
    });
}


// bam
loadTab("welcome");

