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