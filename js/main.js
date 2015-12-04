
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
  },
  updateStartTime: function(updateVal) {
      this.end();
      console.log(timer.startTime);
      this.startTime = this.startTime + updateVal;
      console.log("raised start time by " + updateVal);
      $(".timer").text(timer.startTime);

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
  $('#bPlus').on('click', function (e) {
    timer.updateStartTime(60);
  });
  $('#bMinus').on('click', function (e) {
    timer.updateStartTime(-60);
  });
//   var data = [4, 8, 15, 16, 23, 42];
//
// var x = d3.scale.linear()
//     .domain([0, d3.max(data)])
//     .range([0, 420]);
//
// d3.select(".chart")
//   .selectAll("div")
//     .data([15])
//   .enter().append("div")
//     .style("width", function(d) { return x(d) + "px"; })
//     .text(function(d) { return d; });
});
