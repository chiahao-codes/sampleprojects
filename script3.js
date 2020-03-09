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
                right:"10px"
           }, 400);

           $(this).css({"backgroundColor":"black", "color": "white"});
     
    });

    $(searchField).on('blur', function(){

        if(searchField.val() == ''){

            $(searchField).animate({
                width: "45%"
            }, 500, function(){});


            $(icon).animate({
                right:'390px'
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
    //Properties define the resource.
    //Note* Resources contain references to other resources. 

    //api quota is expired. exceeded daily limit. will reset at midnight Pacific time.
    //Update* api quota never reset. Needed to Create new project with Google Dev console, and create new Api Key;

    // parts parameter specifies certain resource properties you want the api response to INCLUDE;
    //fields parameter FILTERS the API response, saying you ONLY want these items;
    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: "snippet, id",
        q: q,
        type: "video",
        key: "AIzaSyBlZYGtJFZcSbk3NBYmVXBfc_bNxNR5rIw"
    }, 
        
        //run a callback function using the data from the api get response;
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);
            

            //iterate through the items inside the returned API object;
            //$.each() is used to iterate through specific jquery arrays/objects/array-like obj;
            //$.each(jq array or object to be iterated, callback function)
            //The callback function is passed the (index of the iteration round, value of the obj property or array index)
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
            
        
        );
}

//Next Page function;
function nextPage(){
    //variables for next page token;
    var token = $('#next-button').data('token');

    //Redundancy? Api still works with just the q variable below.
    var q = $('#next-button').data('query');

//Clear Results;
    $('#results').html('');
    $('#buttons').html('');

 //Get Form Input
 q = $('#query').val();

//put the query field value inside the api request
    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: "snippet, id",
        q: q,
        pageToken: token,
        type: "video",
        key: "AIzaSyBlZYGtJFZcSbk3NBYmVXBfc_bNxNR5rIw"
    },
        
        //run a callback function using the data from the api get response;
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

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
    );

}



//Prev Page function;
function prevPage(){
    //variables for next page token;
    var token = $('#prev-button').data('token');
   var q = $('#prev-button').data('query');

//Clear Results;
    $('#results').html('');
    $('#buttons').html('');

 //Get Form Input
 q = $('#query').val();

    $.get("https://www.googleapis.com/youtube/v3/search", {
        part: "snippet, id",
        q: q,
        pageToken: token,
        type: "video",
        key: "AIzaSyBlZYGtJFZcSbk3NBYmVXBfc_bNxNR5rIw"
    },

        //run a callback function using the data from the api get response;
            function(data){
                var nextPageToken = data.nextPageToken;
                var prevPageToken = data.prevPageToken;

                console.log(data);

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
    );
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
    var output = '<li>' + '<div class = "list-left">' + '<img src = "' + thumb + '">'
    + '</div>' + '<div class = " list-right">' + '<h3><a data-fancybox class = "fancybox fancybox.iframe" href = "http://www.youtube.com/embed/' + videoId +'">' + title + '</a></h3>' +
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
        + 'onclick = "nextPage()">Next Page</button></div>';
    } else {
        var btnoutput = '<div class = "button-container">' + 

        //Previous button created;
        ' <button id = "prev-button" class = "paging-button" data-token = "' + prevPageToken + '" data-query = "' + q +'" '
        +
        
        'onclick = "prevPage()">Prev Page</button>' +

       //Next button created;
        '<button id = "next-button" class = "paging-button" data-token = "' + nextPageToken + '" data-query = "' + q +'"'
        + 'onclick = "nextPage()">Next Page</button></div>';

    }

        return btnoutput; 

}