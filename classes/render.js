//Create a class for player's stats

const output = document.querySelector("#output");
class AddPlayer {
    constructor (title, sub, copy) {
        this.title = title;
        this.sub = sub;
        this.copy = copy;
        console.log (title, sub, copy);
    }

    renderToOutput () {
        let statsDiv = document.createElement("div");
        statsDiv.className = "player-stats";
        output.appendChild(statsDiv);
        statsDiv.innerHTML = `
        <div id="${this.title}">
            <h1>${this.title}</h1><br>
            <h2>${this.sub}</h2><br>
            <p>${this.copy}</p><br>
        </div>`
    }
    
}

let player1 = new AddPlayer("Layth","Web Dev", "Father of two");
let player2 = new AddPlayer("Haidar","Chef", "good boy");
let player3 = new AddPlayer("Amjad","Gamer", "talented");

player1.renderToOutput();
player2.renderToOutput();
player3.renderToOutput();

