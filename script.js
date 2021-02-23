let api_key = config.API_KEY;

document.getElementById("wordSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("wordInput").value;
  if (value === "")
    return;
  console.log(value);
  var trend = document.getElementById("trendingResults");
  trend.style.display = "none";
  document.getElementById("randomResults").style.display = "none";

  const url = "https://api.giphy.com/v1/gifs/search?" +
    "api_key=" + api_key +
    "&q=" + value +
    "&limit=12" +
    "&offset=0" +
    "&rating=pg" +
    "&lang=en";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += "<div class='container gif-box'>";
      results += "<div class='row justify-content-center'>";

      for (let i = 0; i < json.data.length; i++) {
        results += "<div class='col-lg my-auto img-box' align='center'>";
        results += "<img class='img-search-result' src='" + json.data[i].images.fixed_width.url + "'></img>";
        results += "<div class='overlay'>";
        results += "<div class='img-overlay-txt'>" + json.data[i].title + "</div>";
        results += "</div>";
        results += "</div>";
      }

      results += "</div>";
      results += "</div>";
      document.getElementById("searchResults").innerHTML = results;
      document.getElementById("searchResults").style.display = "block";

    }).then(function() {
      var foot = document.getElementById("footer");
      foot.style.bottom = "auto";
      foot.style.position = "";
    })
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function loadTrending() {
  const urlTrending = "https://api.giphy.com/v1/gifs/trending?" +
    "api_key=" + api_key +
    "&limit=12" +
    "&rating=pg";
  fetch(urlTrending)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += "<h2 class='resultsTitle'>Trending</h2>";
      results += "<div class='container gif-box'>";
      results += "<div class='row justify-content-center'>";

      for (let i = 0; i < json.data.length; i++) {
        results += "<div class='col-lg my-auto img-box' align='center'>";
        results += "<img class='img-search-result' src='" + json.data[i].images.fixed_width.url + "'></img>";
        results += "<div class='overlay'>";
        results += "<div class='img-overlay-txt'>" + json.data[i].title + "</div>";
        results += "</div>";
        results += "</div>";
      }

      results += "</div>";
      results += "</div>";
      document.getElementById("trendingResults").innerHTML = results;
      document.getElementById("trendingResults").style.display = "auto";

    }).then(function() {
      var foot = document.getElementById("footer");
      foot.style.bottom = "auto";
      foot.style.position = "";
    })
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function loadRandom() {
  document.getElementById("trendingResults").style.display = "none";
  document.getElementById("searchResults").style.display = "none";

  const urlTrending = "https://api.giphy.com/v1/gifs/random?" +
    "api_key=" + api_key +
    "&tag=" +
    "&rating=pg";
  fetch(urlTrending)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let results = "";
      results += "<h2 class='resultsTitle'>Random Gif</h2>";
      results += "<div class='container gif-box'>";
      results += "<div class='row justify-content-center'>";

      results += "<div class='col-lg my-auto img-box' align='center'>";
      results += "<img class='img-search-result' src='" + json.data.images.fixed_width.url + "'></img>";
      results += "<div class='overlay'>";
      let title = json.data.title;
      if (title.length === 0) title = "Untitled";
      results += "<div class='img-overlay-txt'>" + title + "</div>";
      results += "</div>";
      results += "</div>";

      results += "</div>";
      results += "</div>";
      document.getElementById("randomResults").innerHTML = results;
      document.getElementById("randomResults").style.display = "block";

    }).then(function() {
      var foot = document.getElementById("footer");
      foot.style.bottom = "auto";
      foot.style.position = "";
    })
}
