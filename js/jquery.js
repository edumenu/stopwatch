//Created by: Edem Dumenu
//Date: 5/30/2018
//Description: Stop Watch

$(function(){
   $('#collapse3').collapse('toggle');
    
    //Variables
    var mode = 0;  //Stop watch mode
    var mode_timer = 0;  //Timer mode 
    var timeCounter = 0 //Time counter
    var lapCounter = 0 //Lap counter
    var action;  //variable for setInterval
    var timer_action;
    var lapNumber = 0; //Number of laps
    //Minutes, seconds, centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    var timer_minutes,timer_seconds,input_timer = 5;
    
    //Hide everything
    hideEverthing();    
    
    $(".stop_watch_button").click(function(){
        
     //stop timeraction
     clearInterval(timer_action);    
          
    $(".select_one").hide();    
        
    //On App load, show start andlap buttons
    hideshowButtons("#start_button","#lap_button", "stop_watch");
    
    //Click on the start button
     $("#start_button").click(function(){
        //mode on
        mode = 1;
         
        resetTimer();
         
        //Show the stop and lap button 
        hideshowButtons("#stop_button","#lap_button", "stop_watch");
         
        //Start counter 
         startAction();
         
         //Play sound 
        document.getElementById("beep_sound").play();  
     });
    
    //Clicking on the stop button
    $("#stop_button").click(function(){
        
        if(mode == 1){
           //show the resume and reset buttons
           hideshowButtons("#resume_button","#reset_button", "stop_watch");
        
           //Stop counter
          clearInterval(action);   
        }  
         
    });
    
    //Clicking on the resume button
      $("#resume_button").click(function(){
          
        if(mode == 1){
           //show the stop and lap buttons
           hideshowButtons("#stop_button","#lap_button", "stop_watch");
        
           //Start counter
           startAction(); 
          
           //Play sound 
           document.getElementById("beep_sound").play();    
        }   
    });
    
      //Clicking on the reset button
      $("#reset_button").click(function(){
        //Reload the page
        location.reload();      
      });
    
    //Clicking on the lap button
      $("#lap_button").click(function(){
        //If mode is On
          if(mode == 1){
            //stop action
            clearInterval(action);
              
            //Reset the lap
             lapCounter = 0;
              
            //Add lap function
              addLap();
            //Start the action
            startAction();  
          }
      });
        
    });    
    
    
    //Click on timer button, display timer buttons
    $(".timer_button").click(function(){
        
       //Hide everything
       hideEverthing(); 

         //stop action
        clearInterval(action);
         
        hideshowButtons("#start_button_timer","#reset_button_timer", "timer"); 
       $("#laps_collapse").hide();
        
       $(".stop_watch_button").unbind().click(function(){ 
           $("#timer").hide();
            //Hide everything
            hideEverthing();
             //stop action
            clearInterval(action);
            //stop timeraction
            clearInterval(timer_action);
          //On App load, show start andlap buttons
          hideshowButtons("#start_button","#lap_button", "stop_watch");
          $("#laps_collapse").show();
      });  
        
      //Click on the ok button
      $("#ok_timer").click(function(){
         
          //Assigning 1 to the timer mode
          mode_timer = 1;
          
          //Obtain the value in the input box
          input_timer = $("#timer_minutes").val();
          input_timer = input_timer * 6000;
          
          //Calling the updateTimer function
          timerAction();
          
          //Display stop
          hideshowButtons("#stop_button_timer", "#reset_button_timer", "timer");

          $("#stop_button_timer").click(function(){
             if(mode_timer == 1){
                 
                 //Chaning the buttons
                 hideshowButtons("#resume_button_timer", "#reset_button_timer", "timer");
                 
                 //Stopping the timer action
                 clearInterval(timer_action); 
               }
          });
          
          //Click on resume button
          $("#resume_button_timer").click(function(){
             if(mode_timer == 1){
                 
                 //Chaning the buttons
                 hideshowButtons("#stop_button_timer", "#reset_button_timer", "timer");
                 
                  //Calling the updateTimer function
                  timerAction(); 
               }
          });
      });    
        
     //Click on start after clicking on stop
     $("#reset_button_timer").click(function(){
        //Reload the page
        location.reload();
     });       
  });
    
   //Function to hide and show 2 buttons
   function hideshowButtons(x, y, z){
        if(z == "stop_watch"){
            $(".control").hide();
            $("#time").show();
            $("#lap_time").show();
            $(x).show();
            $(y).show(); 
        }else{
          $(".control").hide();
          $("#time").hide();
          $("#lap_time").hide();
          $("#timer").show();
          $(x).show();
          $(y).show();  
        }
    }
    //Function to hide all buttons and time
    function hideEverthing(){
        $(".control").hide();
        $("#time").hide();
        $("#lap_time").hide();
    }
    
    //Function to start counter
    function startAction(){
        //Increasing out time counter and lap counter by 1 every 10 miliseconds
        action = setInterval(function(){
        //Increasing the counter
        timeCounter++;
        //Checking the counter limit 
        if(timeCounter == 100*60*100){
            timeCounter = 0;
            }    
        lapCounter++;
         //Checking the lap counter limit 
        if(lapCounter == 100*60*100){
            timeCounter = 0;
            }
            
        //Function to update time    
        updateTime();
        },10)
    }
    
    function timerAction(){
       timer_action = setInterval(function(){
          //Decrease the input timer       
          input_timer--;
              
           updateTimer();
           
          },10);    
    }
    
    //Function is going to convert counters to min,sec,centsec
    function updateTime(){
      //1min=60*100centiseconds=6000centiseconds
        timeMinutes = Math.floor(timeCounter/6000);
      //1sec=100centiseconds
       timeSeconds = Math.floor((timeCounter%6000)/100) //remainder of timeCounter/600 divided by 100.
        timeCentiseconds = (timeCounter%6000)%100; //remainder of timeCounter/600 divided 100
        
        //Displaying the time 
        $("#timeminute").text(format(timeMinutes));
        $("#timesecond").text(format(timeSeconds));
        $("#timecentisecond").text(timeCentiseconds);
        
        //1min=60*100centiseconds=6000centiseconds
        lapMinutes = Math.floor(lapCounter/6000);
      //1sec=100centiseconds
       lapSeconds = Math.floor((lapCounter%6000)/100) //remainder of lapCounter/600 divided by 100.
        lapCentiseconds = (lapCounter%6000)%100; //remainder of lapCounter/600 divided 100
        
        //Displaying the lap time
        $("#lapminute").text(format(lapMinutes));
        $("#lapsecond").text(format(lapSeconds));
        $("#lapcentisecond").text(lapCentiseconds);
    }
    
    //update time for timer
    function updateTimer(){
       //1min=60*100centiseconds=6000centiseconds
       timer_minutes = Math.floor(input_timer/6000);
        
       //1sec=100centiseconds
       timer_seconds = Math.floor((input_timer%6000)/100) //remainder of input_timer/600 divided by 100.
        
        //Display time on timer page
       $("#timerminute").text(format(timer_minutes));
       $("#timersecond").text(format(timer_seconds));    
        
    }
    
    //Function to format the numbers. Display 0 infront of each number
    function format(number){
        if(number < 10){
            //Adding 0 infront of each number
            return "0" + number;
           }else{
               return number;
           }
    }
    
    //Function to print the lap details 
    function addLap(){
        //Increment the number every time the lap button has been selected
        lapNumber++;
       var lapDetails = "<div class='lap'>"
                        + "<div class='lap_time_title'>Lap " + lapNumber + "</div>" 
                           + "<div class='laptimes'><span>"+ format(lapMinutes) +"</span>:<span>"+ format(lapSeconds) +"</span>:<span>"+ format(lapCentiseconds) +"</span></div>" 
                              +"</div>";
       //Add to the list of laps    
       $(lapDetails).appendTo("#laps_collapse");
    }
    
    //Function to reset all timers
    function resetTimer(){
        //Stop watch
        $("#timeminute").text("00");
        $("#timesecond").text("00");
        $("#timecentisecond").text("00");
        
        //Lap time
        $("#lapminute").text("00");
        $("#lapsecond").text("00");
        $("#lapcentisecond").text("00");
    }
});