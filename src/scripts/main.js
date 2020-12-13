import * as maintain from "./ui-elements/maintain.js"
import * as inventory from "./ui-elements/inventory.js"
import * as btn from "./ui-elements/button.js"
import * as util from "./util.js"

util.loadJS("./scripts/ui-elements/production-control.js");

setTimeout(fecthMaintainsStatus, 1);
setTimeout(fecthInventoryStatus, 1);

// Production name and time
const pTime = document.getElementById("pTime");
const pName = document.getElementById("pName");
let pId = 0;

const btnTemp = document.getElementById("btnTemp");
const btnState = document.getElementById("btnState");
const btnProd = document.getElementById("btnProd");
const btnHum = document.getElementById("btnHum");
const btnATP = document.getElementById("btnATP");
const btnAP = document.getElementById("btnAP");
const btnVib = document.getElementById("btnVib");
const btnPPM = document.getElementById("btnPPM");
const btnRP = document.getElementById("btnRP");

fetch("https://api.bierproductie.nymann.dev/batches/latest/")
    .then(response => response.json())
    .then(data => {
        pId = data.identifier;
        btnPPM.innerText = data.speed;
        pName.innerText = data.recipe_id;
        btnATP.innerText = data.amount_to_produce;
    });

fetch("https://api.bierproductie.nymann.dev/data_over_time/3?page_size=1&page=1")
    .then(response => response.json())
    .then(data => {
        if (data.results[0] !== undefined) {
            btnTemp.innerText = data.results[0].temperature;
            btnState.innerText = MachineState[data.results[0].state];
            btnProd.innerText = data.results[0].produced;
            btnHum.innerText = data.results[0].humidity;
            btnAP.innerText = data.results[0].produced - data.results[0].rejected;
            btnVib.innerText = data.results[0].vibration;
            btnRP.innerText = data.results[0].rejected;
        } else {
            console.log("no entries");
        }

    });



new btn.button('humidity', "HUMIDITY");
new btn.button('vibration', "VIBRATION");
new btn.button('temp', "TEMPERATURE");
new btn.button('state', "STATE");
// new btn.button('DefectProducts', "REJECTED PRODUCTS");
// new btn.button('acceptableProducts', "ACCEPTABLE PRODUCTS");
// new btn.button('produced', "PRODUCED");
//

function fecthInventoryStatus() {
    fetch("https://api.bierproductie.nymann.dev/inventory_statuses/?page_size=20&page=1")
        .then(response => response.json())
        .then(data => {
            data.results.forEach(v => {
                new inventory.inventory(v.name, v.current_value, v.max_value);
            });
        })
    setTimeout(fecthInventoryStatus, 10000);
}

function fecthMaintainsStatus(){
    fetch("https://api.bierproductie.nymann.dev/maintenance/")
        .then(response => response.json())
        .then(data => {
            maintain.setMaintain(data.value);
        })
    setTimeout(fecthMaintainsStatus, 10000);
}



const MachineState = {
    0 : 'DEACTIVATED',
        1 : 'CLEARING',
        2 : 'STOPPED',
        3 : 'STARTING',
        4 : 'IDLE',
        5 : 'SUSPENDED',
        6 : 'EXECUTE',
        7 : 'STOPPING',
        8 : 'ABORTING',
        9 : 'ABORTED',
        10 : 'HOLDING',
        11 : 'HELD',
        15 : 'RESETTING',
        16 : 'COMPLETING',
        17 : 'COMPLETE',
        18 : 'DEACTIVATING',
        19 : 'ACTIVATING'
}
