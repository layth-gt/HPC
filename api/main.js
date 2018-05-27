// var map;
//     function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: -34.397, lng: 150.644},
//           zoom: 8
//         });
//      }

var baseURL = "https://randomuser.me/api";
var parameters = "?results=100";
var url = baseURL + parameters;

var httpOptions = {
  method: "GET"
};

function turnJASONIntoObject (response) {
  return response.json();
}

function handleData(data) {
  document.body.innerHTML = "<h1>Users Loaded</h1>";
  data.results.forEach(function(person){
    var html = `
    <p>${person.name.first} ${person.name.last} - ${person.email}</p>
    `;
    document.body.innerHTML += html;
    console.log(person);
  });
 
}

function loading() {
  document.body.innerHTML = "Loading...";
}

loading();

fetch(url, httpOptions)
  .then(turnJASONIntoObject)
  .then(handleData)
  .catch(function(){
      console.log("sorry not loading");
  });

