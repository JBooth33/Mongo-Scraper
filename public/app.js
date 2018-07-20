//on-click event to scrape NYT site
$("#scrape").on("click", function() {
    $.ajax({
        method: "GET", url: "/scrape",
    }).done(function(data) {
        console.log(data)
        window.location = "/"
    })
});

//Grab the articles as JSON

$.getJSON("/articles", function(data) {
    for(var i =0; i < data.length; i++) {
        $("#articles").append("<p data-id'" + data[i].id + "';" + data[i].title + "<br />" + data[i].link + "</p>");
    }
})

//when user clicks a p tag
$(document).on("click", "p", function() {
    //empty the notes from note section
    $("#notes").empty();
    //save the id from the p tag
    var thisID = $(this).attr("data-id");
    //make ajax call for the article
    $.ajax({
        method: "GET",
        url: "/articles/" +thisID
    })
    //add the note information to page
    .then(function(data) {
        console.log(data);
        //article title
        $("#notes").append("<h2>" + data.ittle + "</h2>");
        //input to enter new title
        $("#notes").append("<input id='titleinput' name='title' >");
        //text area to add new note body
        $("#notes").append("textarea id='bodyinput' name='body'></textarea>");
        //button to submit new note with id of article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>SaveNote</button>");

        //if there's a note in the article
        if (data.note) {
            //place title of note in title input
            $("#titleinput").val(data.note.title);
            //place body of note in body textarea
            $("#bodyinput").val(data.note.body);
        }
    })
});

//when savenote button is clicked
$(document).on("click", "#savenote", function() {
    //grab id associated with article from the submit button
    var thisID = $(this).attr("data-id");
    
    //run POST request to change note to use what's entered in the inputs
    $.ajax({
        method: "POST",
        url: "/articles/" + thisID,
        data: {
            //value from the title input
            title: $("#titleinput").val(),
            //value from note text area
            body: $("#bodyinput").val()
        }
    })
    .then(function(data) {
        //log response
        console.log(data);
        //empty the notes section
        $("#notes").empty();
    });

    //remove values entered in input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
});