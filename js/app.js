// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


players = [null, null];
playerIsReady = [false, false];

function init() {
    gapi.client.setApiKey("AIzaSyCywYNuzyVMECpHaRXIXE1AS2bbLChJ9D0");
    gapi.client.load("youtube", "v3", function() {
        console.log('yt api is ready');
    });
}


function tplawesome(e,t){
    res = e;

    for(var n=0;n<t.length;n++){
        res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})
    }
    return res;
}

$(function() {
    $("form").on("submit", function(e) {
        var formId = $(this).attr('formId');
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search" + formId).val()).replace(/%20/g, "+"),
            maxResults: 10,
            order: "viewCount",
            publishedAfter: "2015-01-01T00:00:00Z"
       });

       // execute the request
       request.execute(function(response) {
          var results = response.result;
          var ret = JSON.stringify(response.result);
          $("#results" + formId).html("");
          $.each(results.items, function(index, item) {
            $.get("tpl/item2.html", function(data) {
                $("#results"+ formId).append(tplawesome(data,[{"title":item.snippet.title, "videoid":item.id.videoId, "photo":item.snippet.thumbnails.high.url, "formId": formId}]));
            });
          });
          //resetVideoHeight();
       });
    });
    
    //$(window).on("resize", resetVideoHeight);
});

/*$(function() {
    $("form").on("submit", function(e) {
       e.preventDefault();
       // prepare the request
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search2").val()).replace(/%20/g, "+"),
            maxResults: 10,
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
});*/

/*
function resetVideoHeight() {
    $(".video").css("height", $("#results1").width() * 9/16);
};
*/


//playerIsready = false;


var direBite = function(formId, index){
    if (playerIsReady[formId - 1]){
        players[formId-1].destroy();
        playerIsReady[formId - 1] = false;
    }
        players[formId -1 ]= new YT.Player('ytplayer' + formId, {
            height: '300',
            width: '480',
            videoId: index,
            loop: 1,
            events: {
                'onReady': function () {
                    playerIsReady[formId - 1] = true;
                }
            },
            playerVars: {
              autoplay: 1
            }
        });
};

var slider = new Slider('#ex1', {
    formatter: function(value) {
        for(var i = 0; i<2; ++i) {
            if(playerIsReady[i]) {
                players[i].setVolume(i == 0 ? 100 - value : value);
            }
        }

        /*if (playerIsready) {
            player.setVolume(100 - value);
        }
        if (playerIsready1) {
            player1.setVolume(value);
            return 'Current value: ' + value;
        }*/
    }
});


var transite = function () {
    v = slider.getValue();

    if(v == 0 || v == 100) {
        if(v == 0) {
            var increment = 1;
            var stop = 100;
        }
        else {
            var increment = -1;
            var stop = 0;
        }

        var interval = setInterval(function () {
            slider.setValue(v += increment);
            if (v == stop) {
                clearInterval(interval);
            }
        }, 40);
    }

    /*if (v == 0) {
        var interval = setInterval(function () {
            slider.setValue(v += 1);
            if (v == 100) {
                clearInterval(interval);
            }
        }, 40);
    }
    else if (v == 100) {
        var interval = setInterval(function () {
            slider.setValue(v -= 1);
            if (v == 0) {
                clearInterval(interval);
            }
        }, 40);
    }*/
};

$(function () {
    if ($("#bt-transition").is(':checked')) {
        console.log("Le checkbox est coché");
    }}
);

//autocompletion de la recherche

/* AutoComplete */
$("#search1").autocomplete({
    source: function(request, response){
        /* google geliştirici kimliği (zorunlu değil) */
        var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';
        /* aranacak kelime */
        var query = request.term;
        /* youtube sorgusu */
        $.ajax({
            url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",
            dataType: 'jsonp',
            success: function(data, textStatus, request) {
                response( $.map( data[1], function(item) {
                    return {
                        label: item[0],
                        value: item[0]
                    }
                }));
            }
        });
    },
    /* seçilene işlem yapmak için burayı kullanabilirsin */
    select: function( event, ui ) {
        $.youtubeAPI(ui.item.label);
    }
});

$("#search2").autocomplete({
    source: function(request, response){
        /* google geliştirici kimliği (zorunlu değil) */
        var apiKey = 'AI39si7ZLU83bKtKd4MrdzqcjTVI3DK9FvwJR6a4kB_SW_Dbuskit-mEYqskkSsFLxN5DiG1OBzdHzYfW0zXWjxirQKyxJfdkg';
        /* aranacak kelime */
        var query = request.term;
        /* youtube sorgusu */
        $.ajax({
            url: "https://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q="+query+"&key="+apiKey+"&format=5&alt=json&callback=?",
            dataType: 'jsonp',
            success: function(data, textStatus, request) {
                response( $.map( data[1], function(item) {
                    return {
                        label: item[0],
                        value: item[0]
                    }
                }));
            }
        });
    },
    /* seçilene işlem yapmak için burayı kullanabilirsin */
    select: function( event, ui ) {
        $.youtubeAPI(ui.item.label);
    }
});

/* Butona Basınca Arama */
$('button#submit').click(function(){
    var value = $('input#youtube').val();
    $.youtubeAPI(value);
});

/* Youtube Arama Fonksiyonu */
$.youtubeAPI = function(kelime){
    var sonuc = $('#sonuc');
    sonuc.html('Arama gerçekleştiriliyor...');
    $.ajax({
        type: 'GET',
        url: 'https://gdata.youtube.com/feeds/api/videos?q=' + kelime + '&max-results=15&v=2&alt=jsonc',
        dataType: 'jsonp',
        success: function( veri ){
        }
    });
};
