var baseURL = "https://randomuser.me/api";
var parameters = "?results=10";
var url = baseURL + parameters;
var httpOptions = {
    method: "GET"
  };

function turnJASONIntoObject (response) {
    return response.json();
}

function handleData (data){
    // data.results.forEach (function(person){
    //     document.body.innerHTML += `<p>Name: ${person.name.first}</p>`;
    // });

    var dataHTML = data.results.reduce (function (total, person){
        
        var personName = person.name.reduce(function (total, person) {
            console.log (total);
        },"");



        return (total += `<p>Name: ${person.email}</p>`);
        

    }, "");
    console.log(data);
    document.body.innerHTML += dataHTML;
}

fetch(url, httpOptions)
    .then (turnJASONIntoObject)
    .then (handleData)