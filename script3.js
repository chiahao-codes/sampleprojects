//javascript page;
//search field input animation effects;

//Search Bar Handler
//self-invoking function;
$(function(){
    var searchField = $('#query');
    var icon = $('#search-btn');

    //Focus Event Handler
    $(searchField).on("focus", function(){

           $(this).animate({
               width:'100%'
           }, 400, function(){});

           $(icon).animate({
                right:"50px"
           }, 400);

           $(this).css({"backgroundColor":"black", "color": "white"});
     
    });

    $(searchField).on('blur', function(){

        if(searchField.val() == ''){

            $(searchField).animate({
                width: "45%"
            }, 500, function(){});


            $(icon).animate({
                right:'460px'
            }, 400, function(){});

             $(this).css({"backgroundColor": "white", "color": "black"});

        }

    });
//.submit() can only be attached to form elements;
  $('#search-form').submit(function(e){
    e.preventDefault();
 })

})
    

/* YouTube api notes
Resources are groups of data entities(representations), that are also objects, with properties that can be accessed
via an API. They allow programs to interact with the API. Represented as JSON data type.
Parts parameter specifies certain groups of metadata objects within the Resource type. Fields are specific properties of the parts' groups
in an API request.
*/

function search(){
    //Clear Results
    $('#results').html('');
    $('#buttons').html('');

    //Get Form Input
    q = $('#query').val();

    //Run GET Request on API;
    //Url, data in an object literal form...containing parameters with properties and values;
    //the properties define what we want back from the api request;
    //Resources are RETRIEVED in a JSON format.
    //Resources have properties with values.
    //Properties define the resource.
    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: "snippet, id",
        q: "web design, web dev, web app, software engineering, building a website, web cms",
        type: "video",
        key: "AIzaSyBXbTBvYzL79lZmQgwcd-_C9hJB22Rhspc",
        key: "AIzaSyAbovDJ9CGtkKuT7fSerJ8O20vnfPgt9-Y"},

        
        
        //run a callback function using the data from the api get response;
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);
            

            //iterate through the items inside the returned API object;
            //$.each() is used to iterate through specific jquery arrays/objects/array-like obj;
            //$.each(jq array or object to be iterated, callback function)
            //The callback function is passed the (index of the iteration round, value of the obj propery or array index)
            // For objects: $.each(obj, function(key, value of key));
            // For arrays: $.each(array, function(index of iteration, value of each index inside array));

           
            $.each(data.items, function(i, item){
                //Get output;
                var output = getOutput(item);

                //display results;
                $('#results').append(output); 
            });

                var buttons = getButtons(prevPageToken, nextPageToken);
            
                //Display buttons;
                $('#buttons').append(buttons);

            }
            
        
        )
}

//Build Output;

function getOutput(item){
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    //Build Output String;
    var output = '<li>' + '<div class = "list=left">' + '<img src = "' + thumb + '">'
    + '</div>' + '<div class = " list-right">' + '<h3>' + title + '</h3>' +
    '<small>By <span class = "cTitle">' + channelTitle + ' </span> on ' +videoDate + '</small>' +
    '<p>' + description + '</p>' + 
    '</div>' +
    '</li>' + 
    '<div class = "clearfix"></div>' + 
    '';
    
    return output;
}

//Build buttons;

function getButtons(prevPageToken, nextPageToken){
    if(!prevPageToken){
        var btnoutput = '<div class = "button-container">' + 
        '<button id = "next-button" class = "paging-button" data-token = "' + nextPageToken + '" data-query = "' + q +'"'
        + 'onclick = "nextPage();">Next Page</button></div>';
    } else {
        var btnoutput = '<div class = "button-container">' + 
        //Previous button created;
        '<button id = "prev-button" class = "paging-button" data-token = "' + prevPageToken + '" data-query = "' + q +'"'
        + 'onclick = "prevPage();">Prev Page</button>' +

       //Next button created;
        '<button id = "next-button" class = "paging-button" data-token = "' + nextPageToken + '" data-query = "' + q +'"'
        + 'onclick = "nextPage();">Next Page</button></div>';

    }

        return btnoutput; 

}