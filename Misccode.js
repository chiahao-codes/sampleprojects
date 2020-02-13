

/*
 $('#next').on('click', function(){
        $('.active').removeClass('active').addClass('oldActive');
        if($('.oldActive').is(':last-child')){
            $('.slide').first().addClass('active');
        }
        
        else {
            $('.oldActive').next().addClass('active');
        }

         
            $('.oldActive').removeClass('oldActive');

            $('.slide').fadeOut(speed);
            $('.active').fadeIn(speed);
         })
    })



     function(){

    $('.active').removeClass('active').addClass('oldActive');

    if($('.oldActive').is(':last-child')){
        $('.slide').first().addClass('active');
    }else{
        $('.oldActive').next().addClass('active');
    }

    //this allows the last child active start over from the top; and add oldActive again;
    //otherwise, this element is already selected, and will not be able to be switched.
    //the last-child will have both .active and .oldActive; and will not be switched via .next()
        $('.oldActive').removeClass('oldActive');
  
    //this is the key action; the .active class is being continuously faded in, and the other .slide elements are faded out;
    $('.slide').fadeOut(speed);
    $('.active').fadeIn(speed);

    */