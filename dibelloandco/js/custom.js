;(function($) {
  $.expr[":"].onScreen = function(elem) {
    var $window = $(window);
    var viewport_top = $window.scrollTop()
    var viewport_height = $window.height()
    var viewport_bottom = viewport_top + viewport_height
    var $elem = $(elem)
    var top = $elem.offset().top
    var height = $elem.height()
    var bottom = top + height

    return (top >= viewport_top && top < viewport_bottom) ||
           (bottom > viewport_top && bottom <= viewport_bottom) ||
           (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
  }
})(jQuery);

;(function($) {



jQuery(document).ready(function($){
     NProgress.inc();
    SidebarMenuEffects();
    
    jQuery('#hometicker').each(function(){
                        jQuery(this).vTicker();
    });

    $('.scrollover').each(function(){
        $(this).children().waypoint(function(){
            $(this).toggleClass('fade');
        },{offset:40})
    });

     $('#about').waypoint(function() {
      $('header').toggleClass('dark');
      },{ offset: 60 });
     $('.parallax').waypoint(function(direction) {
          if (direction === 'up') {
            $('header').removeClass();
            $('header').toggleClass('dark');
          }else{
            $('header').removeClass();  
            $('header').toggleClass('light');
          } 
      },{ offset: 60 });
     $('#services').waypoint(function() {
          $('header').toggleClass('dark');
      },{ offset: 60 });

     $('#portfolio').waypoint(function() {
        $('header').toggleClass('dark');
      },{ offset: 60 });

      $('footer').waypoint(function() {
        $('header').toggleClass('dark');
      },{ offset: 60 });

        jQuery('.percentage-counter').each(function(){
           var dataval = parseInt(jQuery(this).attr('data-val'));
            var datadelay = parseInt(jQuery(this).attr('data-delay'));
            jQuery(this).find('.count').delay(1000).countTo({ 
                   startNumber: 0,     
                   endNumber: dataval,
                   interval: datadelay
            });
    });   

/*=== Most Delayed Function ===*/

    $('.testimonial_slider').flexslider({
        animation: 'slide',
        directionNav:false,
        });    

    jQuery('.fitvids').fitVids();
    jQuery('#scrolltop a').click(function(event){
      event.preventDefault();
      $('body,html').animate({
              scrollTop: 0
            }, 1200);
            return false;
    });
 $('.chart').each(function(){
    $(this).easyPieChart({ 
        barColor: '#41bdd1',
        trackColor: '#F6f6f6',
        scaleColor: false,
        lineWidth:5,
        lineCap:'butt',
        size: 240,
        animate: 2000,
        onStep: function(from, to, percent) {
          $(this.el).find('.percent').text(Math.round(percent)+'%');
          }
    });
 });
    


    $('#filters li a').click(function(){
        if($(this).attr('data-filter') != '*' || $(this).hasClass('firstgo')){
          $('#filters').toggleClass('display');  
        }else{
          $(this).addClass('firstgo');
        }
    });
});         

jQuery(document).ready(function($){
   $('#home').each(function(){
        var $bgobj = $(this);
        $(window).scroll(function(e) {
            e.preventDefault();
            var $window = jQuery(window);
            var yPos = -Math.round(($window.scrollTop()/2));
            var coords;
            coords = '50% '+yPos + 'px';
            // Move the background
            $bgobj.css({backgroundPosition: coords});
        }); 
      }); 

    $('.parallax').each(function(){
        var $bgobj = $(this);
        $(window).scroll(function(e) {
            e.preventDefault();
            var $window = jQuery(window);
            var yPos = -Math.round(($window.scrollTop()/2));
            var coords;
            coords = '50% '+yPos + 'px';
            // Move the background
            $bgobj.css({backgroundPosition: coords});
        }); 
      });   
}); 

      
jQuery(document).ready(function($) { 
 // Cache selectors
 var lastId;
 var topMenu = $(".scrollmenu"); 
 var topMenuHeight = 0;//topMenu.outerHeight()+15
     // All list items
 var menuItems = topMenu.find("a"),
     // Anchors corresponding to menu items
     scrollItems = menuItems.map(function(){
       var item = $($(this).attr("href"));
       
       if (item.length) { return item; }
     });
  

 // Bind click handler to menu items
 // so we can get a fancy scroll animation
menuItems.click(function(e){
  e.preventDefault();
   var href = $(this).attr("href"),
       offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;

   $('html, body').stop().animate({ 
       scrollTop: offsetTop
   }, 800);
  //return false;
 });


        $(window).scroll( function ()
        {
            var fromTop = $(this).scrollTop()+25;
            var cur = scrollItems.map(function(){
              if ($(this).offset().top < fromTop)
                return this;
            });
            cur = cur[cur.length-1];
            var id = cur && cur.length ? cur[0].id : "";
            if (lastId !== id) {
                lastId = id;
                menuItems
                  .parent().removeClass("active");
                  menuItems.filter("[href=#"+id+"]").parent().addClass("active");              
                   }
                   
                 // Animation function  
                   $('.animate').filter(":onScreen").not('.load').each(function(i){ 
                      var $this=$(this);
                           var ind = i * 100;
                           var docViewTop = $(window).scrollTop();
                           var docViewBottom = docViewTop + $(window).height();
                           var elemTop = $this.offset().top;      
                               if (docViewBottom >= elemTop) { 
                                   setTimeout(function(){ 
                                        $this.addClass('load');
                                    }, ind);
                                   }      
                       });
                      //End function 
                   
        });
});


      
jQuery(document).ready(function($){    
           
    // cache container
    var $container = $('#filtercontainer');
    // initialize isotope
    $container.imagesLoaded( function(){
        $container.isotope({ 
          filter: '.filteritem',
          animationOptions: {
               duration: 750,
               queue: false
             }
           });  
     });
    // filter items when filter link is clicked
    $('#filters a').click(function(event){
      event.preventDefault();
      $('#filters a').removeClass('active');
      $(this).addClass('active');
      var selector = $(this).attr('data-filter');
      $container.isotope({ 
        filter: selector ,
        animationOptions: {
             duration: 750,
             queue: false
           }  
        });
      });
      $('#filters li:first a').trigger('click');     

      $('#load_projects').click(function(event){
        event.preventDefault();
        $('#load_projects').addClass('loading');
        $.ajax({
                url: 'projects/ajaxprojects.html',
                context: document.body,
                cache: false,
                success: function (html) {
                          var $newElems = jQuery( html ).hide();
                          $newElems.imagesLoaded(function(){
                              $newElems.fadeIn(); // fade in when ready
                                    $container.isotope( 'insert', $newElems,function(){
                                      $('#load_projects').removeClass('loading');
                                      $('#load_projects').addClass('fade');
                                    });
                            });
                           
                              
                }
            });
      });   
});

jQuery(document).ready(function($){  

  var map;
       
           function initialize() {
          
              var point = new google.maps.LatLng(43.730325,7.422155);
              var centrePoint = new google.maps.LatLng(43.730325,7.422155 );
             
             var stylez = [
                 {
                   featureType: "all",
                   elementType: "all",
                   stylers: [
                     { saturation: -100 } // <-- THIS
                   ]
                 }
             ];
             
              var myOptions = {
                 center: centrePoint,
                 zoom: 17,
                 mapTypeId: google.maps.MapTypeId.ROADMAP,
                 mapTypeControlOptions: {
                         mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
                    },
                 disableDefaultUI:true,
                 scrollwheel:false,
                 zoomControl: true,
                 zoomControlOptions: {
                     style: google.maps.ZoomControlStyle.LARGE,
                     position: google.maps.ControlPosition.RIGHT_CENTER
                 }
              };
          
              map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
        
        var mapType = new google.maps.StyledMapType(stylez, { name:"Grayscale" });    
        map.mapTypes.set('tehgrayz', mapType);
        map.setMapTypeId('tehgrayz');
          
              var image = new google.maps.MarkerImage(
                 'images/marker.png',
                 new google.maps.Size(51,32),
                 new google.maps.Point(0,0),
                 new google.maps.Point(51,32)
              );

              var shape = {
                coord: [25,0,28,1,30,2,31,3,33,4,33,5,34,6,35,7,36,8,36,9,36,10,37,11,37,12,37,13,37,14,37,15,37,16,37,17,37,18,37,19,37,20,37,21,37,22,37,23,36,24,36,25,36,26,35,27,35,28,34,29,34,30,33,31,33,32,32,33,32,34,31,35,31,36,30,37,30,38,29,39,29,40,28,41,27,42,27,43,26,44,26,45,25,46,24,47,24,48,23,49,23,50,22,51,21,52,16,52,15,51,14,50,14,49,13,48,13,47,12,46,11,45,11,44,10,43,10,42,9,41,8,40,8,39,7,38,7,37,6,36,6,35,5,34,5,33,4,32,4,31,3,30,3,29,2,28,2,27,1,26,1,25,1,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,0,12,0,11,1,10,1,9,1,8,2,7,3,6,4,5,4,4,6,3,7,2,9,1,12,0,25,0],
                type: 'poly'
              };

              var marker = new google.maps.Marker({
                draggable: false,
                raiseOnDrag: false,
                animation: google.maps.Animation.DROP,
                icon: image,
                shape: shape,
                map: map,
                position: point
              });
          
              google.maps.event.addListener(marker, 'click', toggleBounce);
          
              function toggleBounce() {
                if (marker.getAnimation() != null) {
                  marker.setAnimation(null);
                  $('.mapmore').show(200);
                } else {
                  marker.setAnimation(google.maps.Animation.BOUNCE);
                  $('.mapmore').hide(200);
                }   
              }
           }
       
          $('#map-canvas').each(function(){
            setTimeout(initialize, 2000);
          }); 




          // Grab the Latest tweet from twitter
          twitterFetcher.fetch('404258439645253633', 'tweet', 1, true);

  

          //Ajax projects
          $(document).on('click','.ajax-content',function(event){
                event.preventDefault();
                var url=$(this).attr('href');
                var offsetTop = $('#ajaxcontent').offset().top;
                var portfoliotop = $('#filters').offset().top;
                $.ajax({
                url: url,
                context: document.body,
                cache: false,
                success: function (html) {
                          $('#ajaxcontent').html('');
                          var $newElems = jQuery( html ).hide();
                          $newElems.imagesLoaded(function(){
                              $newElems.fadeIn(); // fade in when ready
                              $('html, body').stop().animate({ 
                                  scrollTop: offsetTop
                              }, 400);
                            });

                          $('#ajaxcontent').append($newElems);

                          // Reinitializing functions 
                            $('.fitvids').fitVids();
                            $('.projectslider').flexslider({
                                directionNav: false
                            }); 

                            // END Reinitializing functions 

                          $('.close').click(function(e){
                            e.preventDefault();
                            $('#ajaxcontent .contentproject').fadeOut('400');
                            $('#ajaxcontent').html('');
                            $('html, body').stop().animate({ 
                                  scrollTop: portfoliotop
                              }, 400);
                          });
                }
            });
                
          });
          $('#filtercontainer').magnificPopup({
          delegate: '.gallery',
          type: 'image',
          tLoading: 'Loading image #%curr%...',
          mainClass: 'mfp-img-mobile',
          gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0,1] // Will preload 0 - before current, and 1 after the current image
          },
          image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
          }
        });
         

          $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
          disableOn: 700,
          type: 'iframe',
          mainClass: 'mfp-fade',
          ype: 'inline',
          fixedContentPos: false,
          fixedBgPos: true,
          overflowY: 'auto',
          closeBtnInside: true,
          preloader: false,
          midClick: true,
          removalDelay: 300,
          mainClass: 'my-mfp-zoom-in'
        });

         $('.gallery-popup').magnificPopup({
                  type: 'image',
                  closeOnContentClick: true,
                  closeBtnInside: false,
                  fixedContentPos: true,
                  mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
                  image: {
                    verticalFit: true
                  },
                  items: {
                    
                  },
                  zoom: {
                  enabled: true,
                  duration: 300 // don't foget to change the duration also in CSS
                  }
              });
});    

jQuery(window).load(function(){
  NProgress.done();
      $('.animate').not('.load').each(function(i){
        var $this=$(this);
        var ind = i * 100;
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $this.offset().top;   
            if (docViewBottom >= elemTop) { 
                setTimeout(function(){ 
                     $this.addClass('load');
                  }, ind);
                }
    });

$('.scrollover').each(function(){
        $(this).children().waypoint(function(direction){
            if(direction === 'up'){
              $(this).removeClass('fadeOut');
            }else{
              $(this).addClass('fadeOut');
            }
        },{offset:80})
    });

});       


      
jQuery(document).ready(function($){  
    var submit =  $("#submit").html();
            $("#submit").click(function (event) {
                event.preventDefault();
                
                var valid = "";
                
                var name = $("#name").val();
                var phone = $("#phone").val();
                var mail = $("#email").val();
                var message = $("#message").val();

                if (!mail.match(/^([a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,4}$)/i)) {
                    valid += ' Invalid email';
                }
                if (valid !== "") {
                    $('#email').addClass('error');
                } else {
                  $('#email').removeClass('error');

                  $('#submit').html('<i class="icon icon-refresh spin animate cssanim load"></i> Sending message...');

                    setTimeout(function(){
                        sendmail(name,mail,phone,message);
                      }, 2000);
                }
                return false;
            });
            
        
        
        function sendmail(name,mail,phone,message) { 
          
          $.ajax({
                type: "POST",
                url: 'php/mail.php',
                data: { 
                        email:mail,
                        name:name,
                        phone:phone,
                        message:message
                      },
                cache: false,
                success: function (html) {
                    $('#submit').html(html);
                    setTimeout(function(){
                        $('#submit').html(submit);
                      }, 2000);
                }
            });
        }
});

jQuery(document).ready(function($){
              $('.scrollto').click(function(event){
                event.preventDefault();
                var href=$(this).attr('href');
                var top=$(href).offset().top;
                 $('html, body').stop().animate({ 
                     scrollTop: top
                 }, 800);
              });

              $(window).resize(function() {
                clearTimeout($.data(this, 'resizeTimer'));
                $.data(this, 'resizeTimer', setTimeout(function(){

                    jQuery('#hometicker').each(function(){
                        jQuery(this).vTicker();
                      });

                }, 200)
              );
            });         
});

jQuery(document).ready(function($){
jQuery(window).load(function(){
    $('header.down').each(function(){ 
    var $this=$(this);
    var offsettop= $this.offset().top;
    $(window).scroll(function(){
      var windowtop=$(window).scrollTop();
      if(offsettop <= windowtop){
        $this.removeClass('down')
        $('#about').addClass('addtopmargin');
      }else{
        $this.addClass('down');
        $('#about').removeClass('addtopmargin');
      }
    });
   }); 
  });
});

})(jQuery);