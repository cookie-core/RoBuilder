// yooo hi!!! 
// Have a good day :)

const ErrorHTML = `
<h1>Error while loading a tab :d</h1>
<p>please tell cookie this if you see this</p>
<img src="https://media1.tenor.com/m/AsTrA5cKBZMAAAAC/frieren-crying.gif" />
`;


// just a tab loading function??
// idk how to write comments, sorry :<
let previousTab = "whaaaaat, theres no previous tab! wahtre you talking about???";
async function loadTab(tab) {
    try {
        const response = await fetch(`tabs/${tab}.html`);
        if (!response.ok) throw new Error(`Download error: ${response.status}`);
        
        document.getElementById(tab).setAttribute("disabled", "true");
        document.getElementById("tab-content").innerHTML = await response.text();
        document.getElementById(previousTab)?.removeAttribute("disabled");
        previousTab = tab;
    } catch (error) {
        console.error("error!!!:", error);
        document.getElementById("tab-content").innerHTML = ErrorHTML;
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

