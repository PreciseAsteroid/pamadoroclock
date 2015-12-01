
// singletone
var timer = {
  startTime: 25*60, //25 minutes
  start: function() {
      // alert(this.startTime);

  }
};

$(document).ready(function($) {
  $(".timer").text(timer.startTime);
  setInterval(function(){
      --timer.startTime;
      $(".timer").text(timer.startTime);
    },1000);
  timer.start();
});
