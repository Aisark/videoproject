var video_out = document.getElementById("vid-box");
var vid_thumb = document.getElementById("vid-thumb");
var vidCount  = 0;

function vid_thumb_res(numb) {
	var alto = numb -135
	$("#vid-thumb video").css({'top':alto});
}

function login(form) {
	var phone = window.phone = PHONE({
	    number        : form.username.value || "Anonymous", // listen on username line else Anonymous
	    publish_key   : 'pub-c-561a7378-fa06-4c50-a331-5c0056d0163c', // Your Pub Key
	    subscribe_key : 'sub-c-17b7db8a-3915-11e4-9868-02ee2ddab7fe', // Your Sub Key
	});
	var ctrl = window.ctrl = CONTROLLER(phone, get_xirsys_servers);

	ctrl.ready(function(){
		//
    ctrl.addLocalStream(vid_thumb)
		$('#vid-thumb video').animate({width: "100%"},800,'linear');
		//
		//vid_thumb_res(largo_vid)
	});

	ctrl.receive(function(session){
	  session.connected(function(session){
			var largo_vid = $("#vid-box").height();
			var alto = largo_vid - 135;

      video_out.appendChild(session.video);
			$('#vid-thumb video').animate({
				maxWidth: '140px',
			  height: 'auto',
			  opacity: '1',

			  left: '30px',
				top: alto
			},200,'linear',function () {
				$("#vid-thumb video").css({'z-index': '2','position': 'absolute',
					'border': '3px solid #607d8b'});
				$('#vid-thumb video').addClass('responsive-video hide-on-med-and-down')
				$('#vid-box video').animate({width: "100%"},800,'linear');
				$('#vid-box video').addClass('responsive-video');
			});



			vidCount++;

		});
	  session.ended(function(session) {
			ctrl.getVideoElement(session.number).remove();
			vidCount--;
		});

	});

	ctrl.videoToggled(function(session, isEnabled){
		ctrl.getVideoElement(session.number).toggle(isEnabled);
	});

	ctrl.audioToggled(function(session, isEnabled){
		ctrl.getVideoElement(session.number).css("opacity",isEnabled ? 1 : 0.75);
	});

	return false;
}

function makeCall(form){
	if (!window.phone) alert("Login First!");
	var num = form.number.value;
	if (phone.number()==num) return false; // No calling yourself!
	ctrl.isOnline(num, function(isOn){
		if (isOn) ctrl.dial(num);
		else alert("User if Offline");
	});
	return false;
}

function mute(){
	var audio = ctrl.toggleAudio();
	if (!audio) $("#mute").html("mic_off");
	else $("#mute").html("mic_none");
}

function end(){
	ctrl.hangup();
}

function pause(){
	var video = ctrl.toggleVideo();
	if (!video) $('#pause').html('play_arrow');
	else $('#pause').html('pause');
}

function getVideo(number){
	return $('*[data-number="'+number+'"]');
}

function addLog(log){
	$('#logs').append("<p>"+log+"</p>");
}

function get_xirsys_servers() {
    var servers;
    $.ajax({
        type: 'POST',
        url: 'https://service.xirsys.com/ice',
        data: {
            room: 'sala',
            application: 'video-chat',
            domain: 'aisark.com',
            ident: 'aisark',
            secret: '6baf634a-a7b1-11e6-b966-2475d09318bc',
            secure: 1,
        },
        success: function(res) {
	        console.log(res);
            res = JSON.parse(res);
            if (!res.e) servers = res.d.iceServers;
        },
        async: true
    });
    return servers;
}

function errWrap(fxn, form){
	try {
		return fxn(form);
	} catch(err) {
		alert("WebRTC is currently only supported by Chrome, Opera, and Firefox");
		return false;
	}
}
