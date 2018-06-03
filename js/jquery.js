$(function(){
   $('#collapse3').collapse('toggle');
    
    //Variables
    var mode = 0;  //App mode
    var timeCounter = 0 //Time counter
    var lapCounter = 0 //Lap counter
    var action;  //variable for ssetInterval
    var lapNumber = 0; //Number of laps
    //Minutes, seconds, centiseconds for time and lap
    var timeMinutes, timeSeconds, timeCentiseconds, lapMinutes, lapSeconds, lapCentiseconds;
    
    //On App load, show start andlap buttons
    hideshowButtons("#start_button","#lap_button");
    
    //Click on the start button
     $("#start_button").click(function(){
        //mode on
        mode = 1;
         
        //Show the stop and lap button 
        hideshowButtons("#stop_button","#lap_button");
         
        //Start counter 
         startAction();
     });
    
    
    //Clicking on the stop button
    $("#stop_button").click(function(){
       //show the resume and reset buttons
        hideshowButtons("#resume_button","#reset_button");
        
       //Stop counter
        clearInterval(action);    
        
    });
    
    //Clicking on the resume button
      $("#resume_button").click(function(){
       //show the stop and lap buttons
        hideshowButtons("#stop_button","#lap_button");
        
       //Start counter
        startAction();    
        
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
           //resetLap and print lap buttons
           //start action
            
      });
    
    
    
    
    
    
    //Function to hide and show 2 buttons
    function hideshowButtons(x, y){
        $(".control").hide();
        $(x).show();
        $(y).show();
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
        lapNumber++;
       var lapDetails = "<div class='lap'>"
                        + "<div class='lap_time_title'>Lap " + lapNumber + "</div>" 
                           + "<div class='laptimes'><span>"+ format(lapMinutes) +"</span>:<span>"+ format(lapSeconds) +"</span>:<span>"+ format(lapCentiseconds) +"</span></div>" 
                              +"</div>";
       $(lapDetails).appendTo("#laps_collapse");
    }
    
});