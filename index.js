$(document).ready(function(){

    var key = "AIzaSyD4qscMMpv7RbBuZewCTVsmqkExnvmzbsQ";
    var playlistId = "PLlVlyGVtvuVkBDG4LX-UFmjhUWX2d0qk2";
    var URL = "https://www.googleapis.com/youtube/v3/playlistItems";

    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }

    loadVideos();
    function loadVideos() {
        $.getJSON(URL, options, function(data){
            console.log(data);
            var id = data.items[0].snippet.resourceId.videoId;
            mainVideo(id);
            resultLoop(data);
        });
    }

    function mainVideo(id){
        $('#video').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
    }

    function resultLoop(data){

        $.each(data.items, function(i, item){
            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var description = item.snippet.description;

            $('main').append('<article><img src="'+thumb+'" alt="" class="thumb"><div class="details"><h4>'+title+'</h4><p>'+description+'</p></div></article>');
        });
    }
});