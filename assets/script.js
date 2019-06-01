$(document).ready(function() {

    // VARIABLES

    var topics = ["clown fish", "cuttlefish", "hermit crab", "jellyfish", "moray eel", "octopus", "puffer fish", "sea turtle", "stingray", "whale shark"];

    // FUNCTIONS

    // Render initial buttons based on my favorite sea critters
    function renderButtons() {

        $("#buttons").empty();

        for (i = 0; i < topics.length; i++) {

            var critter = $("<button>");

            critter.addClass("topic");

            critter.attr("data-name", topics[i]);

            critter.text(topics[i]);

            $("#buttons").append(critter);
        }
    };

    // Add new buttons that user chooses
    $("#submit-btn").on("click", function(event) {

        // Keep submit button from attempting to send form
        event.preventDefault();

        var newCritter = $("#add-critter").val().trim();

        $("#add-critter").val("");

        topics.push(newCritter);
        
        console.log(topics);

        renderButtons();
    })

    // API request to get GIFs
        $(document).on("click", ".topic", function() {
            var critterName = $(this).attr("data-name");

            var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x0nChmNES8CLgpjub4kpEiRVLppBNyrz&q=" + critterName + "&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {

                console.log(response);
            });
        });

    renderButtons();
})