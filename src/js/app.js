$(document).ready(function(){

    $('.link').mouseover(function(){
        $(this).find('.icon-text').css('visibility', 'visible');
    });
    $('.link').mouseout(function(){
        $(this).find('.icon-text').css('visibility', 'hidden');
    });
    $('#mail-link').on('click', function(event){
        event.preventDefault();
    });

});
