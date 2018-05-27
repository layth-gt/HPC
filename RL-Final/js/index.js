//Get the player stats function
const targetDiv = document.querySelector("#output");
const artBox = document.querySelector("#two");
let allPlayers = [];

function getPlayerStats(playerName) {
  const API_KEY = "8J2LDOGO4LMSMXD0G8RMJWO2CHCXYGYC";
  const baseURL = "https://api.rocketleaguestats.com/v1/search/players";

  const url = `${baseURL}?apikey=${API_KEY}&display_name=${playerName} `;
  targetDiv.innerHTML = "Loading...";
  return fetch(url);
  console.log(url);
}

// //turn response to json
function turnIntoJSON(response) {
  return response.json();
}

function renderAllPlayers() {
  const playerMarkup = allPlayers.reduce(function(allHTML, currentPerson) {
    var html = `
    <div class="card">
      <div class="avatarImg" style ="background-image: url(${currentPerson.avatar})"></div>
      <div class="info">
        <h3>${currentPerson.displayName} (${currentPerson.platform})</h3>
        <p>Wins: <strong>${currentPerson.wins}</strong>
        Goals: <strong>${currentPerson.goals}</strong>
        MVPs: <strong>${currentPerson.mvps}</strong>
        <br>
        Saves: <strong>${currentPerson.saves}</strong>
        Shots: <strong>${currentPerson.shots}</strong>
        Assists: <strong>${currentPerson.assists}</strong></p>
      </div>
    </div>
      `;

    return allHTML + html;
  }, "");
  var targetDiv = document.querySelector("#output");
  targetDiv.innerHTML = playerMarkup;
}

//html output
function displayPlayerStates(data) {
  if (data.message) {
    throw new Error(data.message);
  } else if (data.results === 0) {
    throw new Error("Sorry no results!");
  }

  console.log(data);

  var targetDiv = document.querySelector("#output");

  if (data.results === 1) {
    const playerData = data.data[0];
    //to replace the ps4 avatar
    if (playerData.avatar === null) {
      playerData.avatar =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSGYM-k8LmkqNUCC_uEVT2TfVI4H_VwO9zChQbc660SM_Y4Ba-";
    }
    //add the player to the allplayers container to compair them later
    let playerProfile = {
      displayName: playerData.displayName,
      avatar: playerData.avatar,
      wins: playerData.stats.wins,
      goals: playerData.stats.goals,
      mvps: playerData.stats.mvps,
      saves: playerData.stats.saves,
      shots: playerData.stats.shots,
      assists: playerData.stats.assists,
      platform: playerData.platform.name
    };

    allPlayers.push(playerProfile);

    allPlayers = allPlayers.sort(function(a, b) {
      return b.wins - a.wins;
    });

    renderAllPlayers();

    console.log(allPlayers);
  } else {
    throw new Error(
      `There are ${data.totalResults} with that name, please be more precise`
    );
  }
}

//Error function
function errorHandler(errorMessage) {
  var html = `<h2>${errorMessage}</h2>`;

  targetDiv.innerHTML = html;
  console.log(errorMessage);
}

//function to run when search button pressed

var form = document.querySelector("form");
form.addEventListener("submit", function(event) {
  event.preventDefault(); //to prevent refreshing the page
  var input = document.querySelector(".player-id");

  console.log(input.value);
  var playerName = input.value;

  getPlayerStats(playerName)
    .then(turnIntoJSON)
    .then(displayPlayerStates)
    .catch(errorHandler);
});



//to draw cars and sort them by selected value eg. 
function rank(key) {
  var ratio = Math.max(allPlayers[0][key]) / 500;
  artBox.innerHTML = ``;
  let i = 180; // to controll height of each car
  let angle = 60; //to rotate car
  allPlayers.forEach(function(item) {
    let pRank = Math.round(item[key] / ratio);
    let carImage = new Image(40, 40);
    carImage.src = `assets/octane.gif`;
    carImage.className = `icon`;
    // carImage.style.left = pRank + "px";
    let div = document.createElement('div');
    div.className = `tagName`;
    div.style.marginLeft = pRank + "px";
    div.style.marginTop = i + "px";
    div.style.transform = `rotate(-${angle}deg)`;
    div.innerHTML = `<p>${item.displayName}</p>`;

    artBox.appendChild(div);
    div.appendChild(carImage);
    i += 100;
    angle -= 20;
    // console.log(pRank);
  });
}


//sort by value buttons 
var mvpButton = document.querySelector("#mvps");
mvpButton.addEventListener("click", function() {
  allPlayers = allPlayers.sort(function(a, b) {
    return b.mvps - a.mvps;
  });
  renderAllPlayers();
  rank('mvps');
});

var winButton = document.querySelector("#wins");
winButton.addEventListener("click", function() {
  allPlayers = allPlayers.sort(function(a, b) {
    return b.wins - a.wins;
  });
  renderAllPlayers();
  rank('wins');
});

var goalsBtn = document.querySelector("#goals");
goalsBtn.addEventListener("click", function() {
  allPlayers = allPlayers.sort(function(a, b) {
    return b.goals - a.goals;
  });
  renderAllPlayers();
  rank('goals');
});



// function rank() {
//   var ratio = Math.max(allPlayers[0].mvps) / 800;
//   artBox.innerHTML = "";
//   allPlayers.forEach(function(item) {
//     let pRank = Math.round(item.mvps / ratio);
//     var carImage = new Image(40, 40);
//     carImage.src = `assets/octane.png`;
//     carImage.className = `icon`;
//     carImage.style.left = pRank + "px";
//     artBox.appendChild(carImage);
//     console.log(pRank);
//   });
// }
