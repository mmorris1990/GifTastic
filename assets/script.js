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

                critterDiv.addClass("critterDiv");

                var critterRating = $("<p>").text("Rating: " + critterData[i].rating);

                var critterImage = $("<img>");

                critterImage.attr("src", critterData[i].images.fixed_height_still.url);

                //Assign data states to determine if still or animated
                critterImage.attr("data-still", critterData[i].images.fixed_height_still.url);
                critterImage.attr("data-animate", critterData[i].images.fixed_height.url);

                critterImage.addClass("gif");
                critterImage.attr("data-state", "still")

                critterDiv.append(critterRating);
                critterDiv.prepend(critterImage);

                $("#gif-col").prepend(critterDiv);
            }
        });
    });

    // Change GIF to animate or still
    $(document).on("click", ".gif", function () {

        var state = $(this).attr("data-state");
        console.log(state);

        if (state === "still") {

            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        }
        else {

            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });

    renderButtons();
})