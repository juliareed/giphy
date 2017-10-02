// VARIABLES
// Button array
var baseballTeams = ['Boston Red Sox', 'Houston Astros', 'Cincinatti Reds', 'New York Yankees', 'Cleveland Indians', 'Chicago Cubs', 'Washington Nationals', 'Colorado Rockies', 'Arizona Diamondbacks', 'Los Angeles Dodgers'];
var baseballImage = " ";

//FUNCTIONS
//Show all the buttons at the top of the page
function showButtons () {
    $("#buttonItems").empty();
    $("#user-input").val("");
    for (var i = 0; i < baseballTeams.length; i++) {
        var button = $("<button class='btn btn-primary'>");
        button.addClass("baseball");
        button.attr("baseball-name", baseballTeams[i]);
        button.text(baseballTeams[i]);
        $("#buttonItems").append(button);
        $("#buttonItems").append(" ");
    }
}
showButtons();

// When the user clicks green button, add it to the button array and update the buttons
$("#addGiphy").on("click", function(event) {
    $("#entry").empty();
    event.preventDefault();
    var userInput = $("#user-input").val().trim();
    var baseballTerm = $(this).attr("baseball-name");
    // Test to make sure the user's button has at least 10 giphs for it
    // If there aren't 10, an error message will be shown and no button will be created
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + userInput + "&limit=2&api_key=dc6zaTOxFJmzC";
    $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
        if (response.pagination.total_count >= 10) {
            baseballTeams.push(userInput);
            showButtons(); }
            else if (response.pagination.total_count === 0) {
                $("#entry").html(" Sorry, there were no results for this.  Please try again."); }
                else if (response.pagination.total_count === 1) { $("#entry").html(" Sorry, there was only 1 result for this.  Please try again."); }
                else { $("#entry").html(" Sorry, there were only " + response.pagination.total_count + " results for this.  Please try again."); }
                $("#user-input").val("");
            });
});


$(document).on("click", ".baseball", display);
function display() {
    // Clear error message if there is one
    $("#entry").empty();
    var baseballTerm = $(this).attr("baseball-name");
    // The GIPHY query (limits to 10 results)
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + baseballTerm + "&limit=10&api_key=dc6zaTOxFJmzC";
    $.ajax({ url: queryURL, method: "GET"}).done(function(response) {
        // Runs 10 times to show all the GIPHY pictures from the website
        for (var j = 0; j < response.data.length; j++) {

            // Get the animated gif URL
            var active = response.data[j].images.fixed_width.url;

            // Get the still gif URL
            var still = response.data[j].images.fixed_width_still.url;
            var rating = "Rating: " + (response.data[j].rating).toUpperCase();

            // Create the new img item
            var baseballImage = $("<img>");
            
            // Create a new div for the rating so that it maintains the gifs size
            var ratingDiv = $("<div id='ratingDiv'>" + rating + "</div>");
            $(ratingDiv).css({"text-align":"center", "font-size":"20px", "width":"200", "display":"block"});
            baseballImage.attr({"active":active, "still":still, "src":still, "state":"still"});

            // This holds the new div for both rating and the image
            var ratingAndImage = $("<div>");
            $(ratingAndImage).css({"float":"left"});
            $(ratingAndImage).prepend(ratingDiv, baseballImage);

            // Add the rating and image to the page
            $("#ratings").prepend(ratingAndImage);

            // Start and stop animation upon click
            $(baseballImage).on("click", function(event) {
                // Clear any error message if there is one
                $("#entry").empty();
                
                var state = $(this).attr("state");
                var source = $(this).attr("src");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("active"));
                    $(this).attr("state", "active"); }
                    else {
                        $(this).attr("src", $(this).attr("still"));
                        $(this).attr("state", "still"); } 
                    });
        }
    });

}