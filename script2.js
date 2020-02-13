$(document).ready(function(){
    //Set speed from img to img;
    var speed = 500; // fade speed;
    var autoswitch = true; //auto slider options;
    var autoswitch_speed = 4000 //Auto slider speed;


    //Add initial active class
    $('.slide').first().addClass('active');

    //Hide all slides;
    $('.slide').hide();

    //Show first slide
    $('.active').show();


//Next id gets pushed. and it will shuffle to the next slide

$('img#next').on("click", nextSlide);

//Previous button;
$('img#prev').on('click', prevSlide);

//Create the autoslide functionality;
//use setInterval() function;
//first use if statement to give the option of an autoslide;

if(autoswitch == true){
    setInterval(function(){
    
        $('.active').removeClass('active').addClass('oldActive');

        if($('.oldActive').is(':last-child')){
            $('.slide').first().addClass('active');
        }else{
            $('.oldActive').next().addClass('active');
        }

        $('.oldActive').removeClass('oldActive');

        $('.slide').fadeOut(speed);
        $('.active').fadeIn(speed);
    


    }, autoswitch_speed)

}


// create a nextSlide() function for optimization of code; Make it cleaner;

function nextSlide(){
    
        $('.active').removeClass('active').addClass('oldActive');

        if($('.oldActive').is(':last-child')){
            $('.slide').first().addClass('active');
        }else{
            $('.oldActive').next().addClass('active');
        }

        $('.oldActive').removeClass('oldActive');

        $('.slide').fadeOut(speed);
        $('.active').fadeIn(speed);

    };



//prevslide () intervals;

function prevSlide(){

    $('.active').removeClass('active').addClass('oldActive');

if($('.oldActive').is(':first-child')){

 $('.slide').last().addClass('active');

}else{

    $('.oldActive').prev().addClass('active');
}
    
$('.oldActive').removeClass('oldActive');

$('.slide').fadeOut(speed);
$('.active').fadeIn(speed);
}


});