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
        
    var div = $("<div>").addClass('fullScreen').html('<img title="Click to close!" />');
    var imgZoom = div.find('img');
    
    list.on('click', function(){
    
        imgZoom.attr('src', "../images/portfolio/0"+$(this).attr('data-id')+".png");
        div.appendTo(body);
    });
    
    imgZoom.on('click', function(){
        div.detach();
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
    
    
    
});   