
function Clock(iSession, iBreak) {
  'use strict';
  var Session     = iSession;
  var Break       = iBreak;
  var isRunning   = false;
  var mode        = 's'; // s session b Break
  var currentTime = iSession;
  var intervalID  = null;
  var dirty       = false;

  refreshView('.currentTime',convSecTime(currentTime));
  refreshView('.Break',convSecMin(Break));
  refreshView('.Session',convSecMin(Session));

// private method
  var switchMode = function(){
    if (mode === 's') {
      mode = 'b';
      currentTime = Break;
    } else {
      mode = 's';
      currentTime = Session;
    }
    console.log('mode switched to: ' + mode );
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
      }
      if (isRunning       === false) {
          isRunning         = true;
          intervalID        = setInterval(function() {
            if (currentTime   === 0) {
              switchMode();
            }
            --currentTime;
            refreshView('.currentTime',convSecTime(currentTime));
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
  };
  this.getCurrentTime = function() {return currentTime;};
  this.getMode = function() {return mode;};
  this.update = function(mode,secs){
  if (mode === 's') {
    if (Session + secs > 0) {
      Session = Session + secs;
      dirty = true;
      refreshView('.Session',convSecMin(Session));
    }
  } else {
    if (Break + secs > 0) {
      Break = Break + secs;
      dirty = true;
      refreshView('.Break',convSecMin(Break));

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

// afterload
jQuery(document).ready(function($) {
  clock = new Clock(120, 60);

  jQuery('.btncountdown').on('click',function(e){
    clock.countdown();
  });

  jQuery('.btnpause').on('click',function(e){
    clock.pause();
  });

  jQuery('.btnreset').on('click',function(e){
    clock.reset();
  });

  jQuery('.btnsessionupdateplus').on('click',function(e){
    clock.update('s',60);
  });

  jQuery('.btnsessionupdateminus').on('click',function(e){
    clock.update('s',-60);
  });

  jQuery('.btnbreakupdateplus').on('click',function(e){
    clock.update('b',60);
  });

  jQuery('.btnbreakupdateminus').on('click',function(e){
    clock.update('b',-60);
  });
});
