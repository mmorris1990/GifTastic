$(document).ready(function () {

    // VARIABLES

    var topics = ["clown fish", "cuttlefish", "hermit crab", "jellyfish", "moray eel", "octopus", "puffer fish", "sea turtle", "stingray", "whale shark"];

    // FUNCTIONS

    // Render initial buttons based on my favorite sea critters
    function renderButtons() {

        $("#buttons").empty();

        for (i = 0; i < topics.length; i++) {

            var critterBtn = $("<button>");

            critterBtn.addClass("topic");

            critterBtn.attr("data-name", topics[i]);

            critterBtn.text(topics[i]);

            $("#buttons").append(critterBtn);
        }
    };

    // Add new buttons that user chooses
    $("#submit-btn").on("click", function (event) {

        // Keep submit button from attempting to send form
        event.preventDefault();

        var newCritter = $("#add-critter").val().trim();

        $("#add-critter").val("");

        topics.push(newCritter);

        console.log(topics);

        renderButtons();
    })

    // API request to get GIFs
    $(document).on("click", ".topic", function () {
        var critterName = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=x0nChmNES8CLgpjub4kpEiRVLppBNyrz&q=" + critterName + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(queryURL);
            console.log(response);

            // store the retrieved data
            var critterData = response.data;

            // Create divs for each GIF and rating
            for (var i = 0; i < critterData.length; i++) {

                var critterDiv = $("<div>");

                var critterRating = $("<p>").text("Rating: " + critterData[i].rating);

                var critterImage = $("<img>");

                critterImage.attr("src", critterData[i].images.fixed_height_still.url);

                critterDiv.append(critterRating);
                critterDiv.append(critterImage);

                $("#gif-col").prepend(critterDiv);
            }
        });
    });

    renderButtons();
})