
// singletone
// var state;
var timer = {
  intervalid:0,
  status: 0, // is it runnning
  startTime: 25*60, //25 minutes
  start: function() {
      if (this.status === 0) {
        this.intervalid = setInterval(function(){
            --timer.startTime;
            $(".timer").text(timer.startTime);
          },1000);
          this.status = 1;
          console.log("started");
      } else{
          console.log("already running");
      }



  },
  end: function() {
      clearInterval(this.intervalid);
      console.log("stopped");
      this.status = 0;
  }
};



$(document).ready(function($) {
  $(".timer").text(timer.startTime);



  $('#bStart').on('click', function (e) {
    timer.start();
  });
  $('#bEnd').on('click', function (e) {
    timer.end();
  });
});
