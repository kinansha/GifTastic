$(document).ready(function() {
  var futbol = ["PSG", "Lazio", "Atletico Madrid", "Roma", "Lyon"];

  renderButtons();

  // Add new button
  $("#addfutbol").on("click", function(event) {
    // Prevents the page from reloading as this is the default action for a submit button in a form
    event.preventDefault();
    // Gets the value of the text box input and also removes spaces before and after the text
    var futbol = $("#futbolInput").val().trim();
    // Add the new search term to the futbols array
    futbol.push(futbol);

    renderButtons();
    // Clear out the text field after adding a new search button
    $("#futbolInput").val("");
  });

  // Search the Giphy Api based on the value of the button clicked
  function searchGiphyAPI() {
    // Clears out the results from the previous search before populating new results
    $("#futbol").empty();
  
    // Captures the value of the data-name attribute from the button that was pressed
    var futbolSearch = $(this).attr("data-name");
    // QueryURL for Giphy API
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=futbol&api_key=QtUwaUDbVaOwrwi5nQclM9tPEzsw5jz7";
    // Ajax call to pull in the objects from the Giphy API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      var results = response.data;
      // Loops through only 10 gifs
      for (var i = 0; i < 10; i++) {
        // Create 10 Divs to hold gifs
        var futbolDiv = $("<div class=col-md-4>" + "<br>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        // Create img tags and add some attributes
        var futbolImage = $("<img>");
        futbolImage.attr("src", results[i].images.fixed_width_still.url);
        futbolImage.attr("data-still", results[i].images.fixed_width_still.url);
        futbolImage.attr("data-animate", results[i].images.fixed_width.url);
        futbolImage.attr("data-state", "still");
        futbolImage.attr("class", "gif");

        futbolDiv.append(p);
        futbolDiv.append(futbolImage);

        $("#futbol").prepend(futbolDiv);
      }
    });
  }

  // Create buttons
  function renderButtons() {
    $("#futbolButtons").empty();

    for (var i = 0; i < futbol.length; i++) {
      var createButton = $("<button>");
      createButton.addClass("btn btn-primary");
      createButton.attr("data-name", futbol[i]);
      createButton.text(futbol[i]);
      $("#futbolButtons").append(createButton);
    }
  }

  // Turn motion on and off when image is clicked
  function gifAnimate() {
    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  }

  $(document).on("click", ".btn-primary", searchGiphyAPI);
  $(document).on("click", "img", gifAnimate);
});
