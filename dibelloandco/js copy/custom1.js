jQuery(document).ready(function($){
	$('.homeslider').flexslider({
		controlNav:false,
		start: function(){
			$('#homeslider').waypoint(function() {
      				$('.herotext').toggleClass('minifade');
      		},{ offset: -80 });

      		$('#homeslider').waypoint(function() {
      				$('.herotext').toggleClass('smallfade');
      		},{ offset: -180 });

      		$('#homeslider').waypoint(function() {
      				$('.herotext').toggleClass('fade');
      		},{ offset: -300 });


		}
	});
});

