$(document).ready(function() {
  var brands = ["Gucci", "Prada", "Chanel", "Louis Vuitton", "Hermes", "Salvatore Ferragamo"];

// Code to get Gif's
  $(document).on("click", ".brand-button", function() {
    $("#brands").empty();
    $(".brand-button").removeClass("active");
    $(this).addClass("active");

    var clickedbrand = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + clickedbrand + "&api_key=dc6zaTOxFJmzC&limit=10";
      
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .done(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var brandDiv = $("<div class=\"brand-item\">");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;
        var brandGif = $("<img>");
        brandGif.attr("src", still);
        brandGif.attr("data-still", still);
        brandGif.attr("data-animate", animated);
        brandGif.attr("data-state", "still");
        brandGif.addClass("brand-image");
        brandDiv.append(p);
        brandDiv.append(brandGif);
        $("#brands").append(brandDiv);
      }
    });
  });

// Code to make the Gif start/stop
  $(document).on("click", ".brand-image", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


// Code to Add new Buttons
function addButtons(arrayToUse, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < arrayToUse.length; i++) {
      var a = $("<button>");
      a.addClass(classToAdd);
      a.attr("data-type", arrayToUse[i]);
      a.text(arrayToUse[i]);
      $(areaToAddTo).append(a);
    }
  }

$("#add-brand").on("click", function(event) {
    event.preventDefault();
    var newbrand = $("input").eq(0).val();
    if (newbrand.length > 2) {
      brands.push(newbrand);
    }
      addButtons(brands, "brand-button", "#brand-buttons");
  });
    addButtons(brands, "brand-button", "#brand-buttons");
});
