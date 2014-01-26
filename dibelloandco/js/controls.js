jQuery(document).ready(function($){
	var html = '<div id="controls">'+
	'<ul>'+
		'<li><a class="yellow"></a></li>' +
		'<li><a class="green"></a></li>'+
		'<li><a class="orange"></a></li>'+
		'<li><a class="blue"></a></li>'+
	'</ul>'+
	'</div>';
	$('body').append(html);

	$('#controls a').click(function(){
		var aclass= $(this).attr('class');
		$('body').removeClass();
		$('body').addClass(aclass);
	});
});