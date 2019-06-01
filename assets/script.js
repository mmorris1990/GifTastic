$(document).ready(function () {

// VARIABLES

var topics = ["clown fish" , "cuttlefish" , "hermit crab" , "jellyfish" , "moray eel" , "octopus" , "puffer fish" , "sea turtle" , "stingray" , "whale shark"];

// FUNCTIONS

// Render initial buttons based on my favorite sea critters
function renderButtons() {

    $("#buttons").empty();

    for (i = 0; i < topics.length; i++) {

      var critter = $("<button>");

      critter.text(topics[i]);

      $("#buttons").append(critter);
    }
  };

// Add new buttons that user chooses
$("#submit-btn").on("click" , function (event) {

    // Keep submit button from attempting to send form
    event.preventDefault();

    var newCritter = $("#add-critter").val();
    console.log(newCritter);
    
    topics.push(newCritter);

    $("#add-critter").val("");

    renderButtons();
})

  renderButtons();
})