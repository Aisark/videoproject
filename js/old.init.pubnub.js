var video_out = document.getElementById("vid-box")
var vid_thumb = document.getElementById("vid-thumb");

function login(form) {
  var phone = window.phone = PHONE ({
    number : form.username.value || "Anonymous",
    publish_key : 'pub-c-a4620d2c-d1dc-4c74-b93f-ab92ab5dac44',
    subscribe_key : 'sub-c-127e0bb8-9f9c-11e6-96cb-02ee2ddab7fe',
  });

  var ctrl = window.ctrl = CONTROLLER(phone);
	ctrl.ready(function(){
		form.username.style.background="#55ff5b";
		form.login_submit.hidden="true";
		ctrl.addLocalStream(vid_thumb);
	});



 return false;
}



function makeCall(form){
	if (!window.phone) alert("Login First!");
	var num = form.number.value;
	if (phone.number()==num){
    return false; // No calling yourself!
  } else{

  ctrl.isOnline(num, function(isOn){
    if (isOn) ctrl.dial(num);
    else alert("User if Offline");
  });
  return false;
  }

}
