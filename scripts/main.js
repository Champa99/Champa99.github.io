'use strict';

var workGroupsI = 0;
var workGroups = [];

const getRandomInt = function(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createWorkGroup = function(args) {

	workGroups[workGroupsI] = {
		name: args.name,
		color: args.color,
		overWidth: args.overWidth,
		undername: args.undername,
		images: args.images,
		tags: args.tags
	};

	var dom = '';
	var broken = args.name.split("");
	var i = 0;
	var length = broken.length;
	var random1 = getRandomInt(1, length) - 1;
	var random2 = getRandomInt(1, length) - 1;
	var random3 = getRandomInt(1, length) - 1;

	broken[random1] = '<span>' + broken[random1] + '</span>';
	broken[random2] = '<span>' + broken[random2] + '</span>';
	broken[random3] = '<span>' + broken[random3] + '</span>';

	args.name = broken.join("");

	dom += '<div class="col s6 col-mobile-full">' +
		'<div class="work-holder" data-id="' + workGroupsI + '">' +
			'<div class="stacked-images">' + 
				'<div class="first-image images z-depth-4" style="background-image: url(' + args.images[0] + ');"></div>' +
				'<div class="second-image images z-depth-4" style="background-image: url(' + args.images[1] + ');"></div>' +
			'</div>' +

			'<div class="neon-sign ' + args.color + '">' +
				'<div class="inner-text">' + args.name + '</div>' +
				'<div class="over-text" ' + ((args.overWidth !== undefined) && 'style="width: ' + args.overWidth +'"') + '>' +
				 args.undername + '</div>' +
			'</div>' +
		'</div>' +
	'</div>';

	$("#add-work-here").append(dom);

	workGroupsI ++;
}

$(document).ready(function(){

	const windowHeight = $(window).height();
	const options = {
        throttle: 100,
        scrollOffset: 200,
        activeClass: 'active',
        getActiveElement: function(id) {

			setTimeout(function() {

				$("#" + id).addClass('animate');
			}, 500);
			return 'a[href="#' + id + '"]';
        }
    };
	const elems = document.querySelectorAll('.scrollspy');
    const instances = M.ScrollSpy.init(elems, options);

	createWorkGroup({
		name: 'Customer Relation',
		undername: 'Manager',
		images: [
			'./images/work/crm_1.png',
			'./images/work/crm_2.png'
		],
		color: 'red',
		tags: ['PHP7', 'Laravel', 'MySQL', 'HTML5', 'CSS']
	});

	createWorkGroup({
		name: 'eduCommuniCation',
		undername: 'Study network',
		images: [
			'./images/work/educom_2.png',
			'./images/work/educom_1.png'
		],
		overWidth: '83%',
		color: 'aqua',
		tags: ['PHP7', 'MySQL', 'Node.js', 'Socket.io', 'HTML5', 'CSS']
	});

	createWorkGroup({
		name: 'Tutor.ba',
		undername: 'Tutor finder',
		images: [
			'./images/work/tutor_2.png',
			'./images/work/tutor_1.png'
		],
		overWidth: '72%',
		color: 'purple',
		tags: ['PHP7', 'MySQL', 'Node.js', 'Socket.io', 'HTML5', 'CSS']
	});

	createWorkGroup({
		name: 'Uploaduj.me',
		undername: 'File hosting',
		images: [
			'./images/work/uploaduj_2.png',
			'./images/work/uploaduj_1.png'
		],
		overWidth: '67%',
		color: 'yellow',
		tags: ['PHP7', 'MySQL', 'HTML5', 'CSS']
	});

	$("#resize-parallax").css('height', windowHeight + 'px');
	$("#resize-text-holder").css({'height': windowHeight + 'px', 'margin-top': '-' + windowHeight + 'px'});

	$('.parallax').parallax();

	$('#slide-page').click(function() {
		
		$(this).fadeOut("fast", function() {
			$(this).remove();
		})

		$('html, body').animate({
			scrollTop: $('#ovdje').offset().top
		}, 500);
	});

	$("#close-button").click(function() {

		$("#closer-look").fadeOut("fast");
	});

	$(".work-holder").click(function() {

		const id = $(this).data('id');

		$("#project-color").attr('class', 'neon-sign ' + workGroups[id].color);

		$("#project-name").text(workGroups[id].name);
		$("#project-desc").text(workGroups[id].undername);
		$("#project-desc").css('width', workGroups[id].overWidth);

		$("#dump-images").html('');

		const lenImg = workGroups[id].images.length;
		var i = 0;

		for(i = 0; i < lenImg; i ++) {

			$("#dump-images").append('<a href="' + workGroups[id].images[i] + '" target="_blank">' +
				'<img src="' + workGroups[id].images[i] + '" class="preview"></a>');
		}

		$("#dump-tags").html('');

		const lenTag = workGroups[id].tags.length;
		
		for(i = 0; i < lenTag; i ++) {

			$("#dump-tags").append('<div class="tag">' + workGroups[id].tags[i] + '</div>');
		}

		$("#closer-look").fadeIn("fast");
	});

	$(document).keydown(function(e) {

		if(e.keyCode === 27) {

			$("#closer-look").fadeOut("fast");
		}
	})
});