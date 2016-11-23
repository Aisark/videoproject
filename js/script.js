$('document').ready(($)=>{
  var ancho_vid, largo_vid;

  vid_box_res();


  function vid_box_res(){
    ancho_vid = $("#videos").width();
    largo_vid = (ancho_vid*.75)-10;

    $("#vid-box").height(largo_vid);
    vid_thumb_res(largo_vid);

  }

  function vid_thumb_res(numb) {
    var alto = numb-135
    $("#vid-thumb video").css({'top':alto});
  }

  $(window).resize(function() {
    vid_box_res();
  });


});
