// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


function init() {
    gapi.client.setApiKey("AIzaSyCywYNuzyVMECpHaRXIXE1AS2bbLChJ9D0");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}


function tplawesome(e,t){
    res=e;
    for(var n=0;n<t.length;n++){
        res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})
    }
        return res}
$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search1").val()).replace(/%20/g, "+"),
            maxResults: 9,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       });

       // execute the request
       request.execute(function(response) {
          var results = response.result;
          var ret = JSON.stringify(response.result);
          $("#results1").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item1.html", function(data) {
                $("#results1").append(tplawesome(data,[{"title":item.snippet.title, "videoid":item.id.videoId, "photo":item.snippet.thumbnails.high.url}]));
            });
          });
          //resetVideoHeight();
       });


    });
    
    //$(window).on("resize", resetVideoHeight);
});$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search2").val()).replace(/%20/g, "+"),
            maxResults: 9,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       });
       // execute the request
       request.execute(function(response) {
          var results = response.result;
          var ret = JSON.stringify(response.result);
          $("#results2").html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item2.html", function(data) {
                $("#results2").append(tplawesome(data,[{"title":item.snippet.title, "videoid":item.id.videoId, "photo":item.snippet.thumbnails.high.url}]));
            });
          });
          //resetVideoHeight();
       });
    });

    //$(window).on("resize", resetVideoHeight);
});


function resetVideoHeight() {
    $(".video").css("height", $("#results1").width() * 9/16);
};



playerIsready = false;
var direBite = function(index){
    if (playerIsready){
        player.destroy();
    }
    playerIsready = false;
    //$("#ytplayer1").html('<iframe class="video w100" width="640" height="360" src="//www.youtube.com/embed/'+index+'" frameborder="0" allowfullscreen onvolumechange=slider></iframe>')
    //function onYouTubePlayerAPIReady() {
        player = new YT.Player('ytplayer1', {
            height: '300',
            width: '480',
            videoId: index,
            events: {
                'onReady': function () {
                    playerIsready = true;
                }
            }
        });
    //}
};
playerIsready1 = false;
var direBite1 = function(index){
    if (playerIsready1){
        player1.destroy();
    }
    playerIsready1 = false;
    //$("#ytplayer1").html('<iframe class="video w100" width="640" height="360" src="//www.youtube.com/embed/'+index+'" frameborder="0" allowfullscreen onvolumechange=slider></iframe>')
    //function onYouTubePlayerAPIReady() {
        player1 = new YT.Player('ytplayer2',{
            height: '300',
            width: '480',
            videoId: index,
            events: {
                'onReady': function () {
                    playerIsready1 = true;
                }
            }
        });
        $("#ytplayer2").append(player1);
    //}
};

var slider = new Slider('#ex1', {
    formatter: function(value) {
        if (playerIsready) {
            player.setVolume(100-value);
        }
        if (playerIsready1){
            player1.setVolume(value);
        }
        //console.log(value);
        // player.setVolume(value);
        return 'Current value: ' + value;
    }
});



