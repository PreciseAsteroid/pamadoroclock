
const sessionColor = '#449D44';
const breakColor = '#C9302C';

function Clock(iSession, iBreak) {
  'use strict';
  var Session     = iSession;
  var Break       = iBreak;
  var isRunning   = false;
  var mode        = 's'; // s session b Break
  var currentTime = iSession;
  var intervalID  = null;
  var dirty       = false;
  var sound = new Audio("http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Cartoon/Horns/Honk-Public_D-28/Honk-Public_D-28_hifi.mp3");


  refreshView('.currentTime',convSecTime(currentTime));
  refreshView('.Break',convSecTime(Break));
  refreshView('.Session',convSecTime(Session));

// private method
  var switchMode = function(){
    if (mode === 's') {
      mode = 'b';
      currentTime = Break;
      drawDial(clock.getBreakTime(),breakColor,sessionColor);

    } else {
      mode = 's';
      currentTime = Session;
      drawDial(clock.getSessionTime(),sessionColor,breakColor);

    }
    console.log('mode switched to: ' + mode );
    playSound();

  };

  var playSound = function() {
    sound.play();
  };


  // privilieged functions
  this.countdown = function() {
    // in case rest and session clocks were updated
      if (dirty) {
        dirty = false; // set situation back
        if (mode === 's') {
          currentTime = Session;
        } else {
          currentTime = Break;
        }
        refreshView('.currentTime',convSecTime(currentTime));
        drawDial(clock.getSessionTime(),sessionColor,breakColor);

      }
      if (isRunning       === false) {
          isRunning         = true;
          intervalID        = setInterval(function() {
            if (currentTime   === 0) {
              switchMode();
            }
            --currentTime;
            refreshView('.currentTime',convSecTime(currentTime));
            switch (mode) {
              case 's':
                updateKnob(Session - currentTime);
                break;
              default:
                updateKnob(Break - currentTime);
            }
            // updateKnob(currentTime);
          }, 1000);
        } else {
          console.log('cannot start: isRunning: ' + isRunning);
        }
      };

  this.pause = function(){
    if (!isRunning) {
      this.countdown();
    } else {
      // stop
      clearInterval(intervalID);
      isRunning = false;
      console.log('just stopped at: ' + convSecTime(currentTime));
      refreshView('.currentTime',convSecTime(currentTime));
    }

  };

  this.reset = function(){
    if(isRunning){ this.pause();} //first stop the clock
    // revert all attributes to initial state
    mode        = 's'; // s session b Break
    currentTime = Session;
    intervalID  = null;
    dirty       = false;
    refreshView('.currentTime',convSecTime(currentTime));
    console.log('reset. current time: ' + convSecTime(currentTime));
    drawDial(clock.getSessionTime(),sessionColor,breakColor);

  };

  this.getSessionTime = function() {return Session;};
  this.getBreakTime = function() {return Break;};
  this.getCurrentTime = function() {return currentTime;};
  this.getMode = function() {return mode;};
  this.update = function(mode,secs){
  if (mode === 's') {
    if (Session + secs > 0) {
      Session = Session + secs;
      dirty = true;
      refreshView('.Session',convSecTime(Session));
    }
  } else {
    if (Break + secs > 0) {
      Break = Break + secs;
      dirty = true;
      refreshView('.Break',convSecTime(Break));

    }
  }
};
}


// regular functions
refreshView = function(key, value){
  $(key).text(value);
};
convSecMin = function(secs){ return ~~(secs/60);};
convSecTime = function(secs) {
  var seconds = secs % 60;
  var minutes = ~~(secs/60);
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes  < 10) {
      minutes = '0' + minutes;
    }
    return minutes + ":" + seconds;
  };

convertSectoMinutes = function(secs){
    return ~~(secs/60);
};

updateKnob = function(secs){
$('.dial')
  .val(secs)
  .trigger('change');
};


drawDial = function(max,fgColor,bgColor){$(function() {
  $(".dial").knob();
  $(".dial").trigger(
       'configure',
       {
      'max':max,
      'min':0,
      'fgColor': fgColor,
      'bgColor': bgColor,
      'rotation': 'counterclockwise'
     }
   );

     updateKnob(0);
 });};

// afterload
jQuery(document).ready(function($) {
  clock = new Clock(25*60, 5*60);

  jQuery('.btncountdown').on('click',function(e){
    clock.countdown();
  });

  jQuery('.btnpause').on('click',function(e){
    clock.pause();
  });

  jQuery('.btnreset').on('click',function(e){
    clock.reset();
  });

  jQuery('.btnsessionupdateplus').click(function(){
    clock.update('s',60);
  });

  jQuery('.btnsessionupdateminus').click(function(){
    clock.update('s',-60);
  });

  jQuery('.btnbreakupdateplus').on('click',function(e){
    clock.update('b',60);
  });

  jQuery('.btnbreakupdateminus').on('click',function(e){
    clock.update('b',-60);
  });

  drawDial(clock.getSessionTime(),sessionColor,breakColor);


});
