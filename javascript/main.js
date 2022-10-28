function getInputValue() {

  var city = document.getElementById("searchTxt").value;
  console.log(city);
  const uri = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?aggregateHours=24&locationMode=single&contentType=json&unitGroup=us&key=D6F43Y44NGZJHU5WQVF3J8ZDA&locations=" + city;
  console.log(uri);
    requestXMLHttpRequest(uri);
}
// AJAX Request
function requestXMLHttpRequest(uri) {

  var xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  xhr.open('GET', uri); xhr.send();

  xhr.onload = function() {
    if (xhr.status !== 200) {
      console.log("XMLHttpRequest error: " + xhr.status);
      return;
    }
    processWeatherData(xhr.response);
  };
  xhr.onerror = function() {
    console.log("XMLHttpRequest Request failed");
  };
}
// Output


function processWeatherData(response) {
  var result = document.querySelector(".results");
  console.log(result);

  if (!response) {
    console.log("Empty response");
    return;
  }
  if (response.errorCode > 0) {
    console.log("Error detected. errorCode=" + response.errorCode + ", message=" + response.message);
    return;
  }
  var location = response.location;
  var values = response.location.values;






  console.log("Location: " + location.address);
  for (var i = 0; i < 1; i++) {
    console.log(values[i].datetimeStr + ": maxt=" + values[i].maxt + ", mint=" + values[i].mint + ", Conditions=" + values[i].conditions);

     // write the .conditions to the html page in the .conditions class
        var conditions = document.querySelector(".conditions");
        conditions.innerHTML += "<br><span class=\"conditionstext\">" + values[i].conditions + "</span>";

        // write the .maxt to the html page in the .maxt class
        var maxt = document.querySelector(".maxt");
        maxt.innerHTML += "<br><span class=\"maxtemptext\">" + values[i].maxt + "&#8457;\n </span>";

        // write the .mint to the html page in the .mint class

        var mint = document.querySelector(".mint");
        mint.innerHTML += "<br><span class=\"mintemptext\">" + values[i].mint + "&#8457;\n </span>";

        // write the .location to the html page in the .location class

        var location = document.querySelector(".location");
        location.innerHTML += "<br><span class=\"locationtext\">" + response.location.address + " </span>";

        var temp = document.querySelector(".temp");
        temp.innerHTML += "<br><span class=\"temptext\">" + values[i].temp + "&#8457;\n </span>";


  }
}