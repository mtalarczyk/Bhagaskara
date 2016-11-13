$(function(){

//    var nav = document.querySelector('nav');
//    var button = document.querySelector('button');
//
//    button.addEventListener('click', function(){
//
//        nav.classList.toggle('visible');
//
//    });
//
//    window.addEventListener('resize', function(){ //ta funkcja odpala się za każdym razem gdy zostanie zmieniona szerokość okna
//
//        if(window.matchMedia("(min-width: 768px)".matches)){
//            nav.classList.remove('visible');
//        }
//
//
//    });



//Scroll menu
    var menu = $('#header, #navigation');
    var nav = $('nav');
    //$.waypoints.settings.scrollThrottle=0;

    menu.on('click', 'a', function(){

        var href = $(this).attr('href');
        var offsetNav = $(href).offset().top-nav.height();

        $('html, body').animate({
                    scrollTop: offsetNav
        }, 1000);

    });

//Sticky menu
    var navTop = $('#navigation');
//    var navTop = $('#navigation');
//    var top = navTop.position().top;

    $(window).on('scroll resize', function(){
        var top = navTop.position().top;
        var distanceTop = $(document).scrollTop();
//        top = navTop.position().top;

        (distanceTop > top) ? nav.addClass('sticky') : nav.removeClass('sticky');
    });

//    $(window).on('resize', function(){
//        var distanceTop = $(document).scrollTop();
//        top = navTop.position().top;

//        (distanceTop > top) ? nav.addClass('sticky') : nav.removeClass('sticky');
//
//    });

 //Portfolio - Zoom
    var list = $('.gallery').find('[class^="img-"]');
    var body = $('body');

    var div = $("<div>").addClass('fullScreen').html('<img title="Click to close!" />').appendTo(body);
    var imgZoom = div.find('img');

    list.on('click', function(){
        imgZoom.attr('src', "./images/portfolio/0"+$(this).attr('data-id')+".png");
        div.fadeIn(500);
    });

    imgZoom.on('click', function(){
        div.fadeOut(500);
    });

//Portolio - filter

    var btns = $('.categories').find('div');
    var lablelList = list.siblings('p');
    btns.eq(0).addClass('checked');

    btns.on('click', function(){
        var btnText = $(this).text().toLowerCase();
        btns.removeClass('checked');
        $(this).addClass('checked');

        lablelList.each(function(){
           ($(this).text().search(btnText) != -1) ? $(this).parent().removeClass('invisible') : $(this).parent().addClass('invisible');
        });
    });


//Rate bars

    var rate = $('#experience');
    var bars = rate.find('.rate');

    $(window).on('scroll', function(){
        var top = rate.position().top;
        var distanceTop = $(document).scrollTop();

        console.log(top);
        console.log(distanceTop);

        if(distanceTop >= top-nav.height()){

            bars.each(function(){
                var percent = $(this).attr('data-rate');
                var bar = $(this).find('.value');
                var paragraph = $(this).find('p');

                var counter = 0;

                    for(i=0; i<percent; i++){
                        counter++;
                        paragraph.delay(100).text(counter+" %");
                        console.log(counter +" / "+ percent);
                    }

                bar.animate({
                    width: +percent+"%"
                }, 1000);
            });

            $(this).off('scroll');
        }
    });



});
