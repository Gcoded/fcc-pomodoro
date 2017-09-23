
var timeArray = [];
var minutes = 0;
var seconds = 0;
var totalSecs = 0;
var timer;
var timerRunning = false;
var working = true;

$('.adjust').click(function(event) {
    if(!timerRunning) {
        var parentID = event.target.parentNode.id;
        var adjustment = event.target.id;
        var setTime = 0;

        if (parentID === 'workDiv') {
            setTime = parseInt($('#workTime').text());
            if(adjustment === 'increase')
                setTime++;
            else if(setTime > 1)
                setTime--;

            $('#workTime').text(setTime + ' minutes');
            if(working)     // only change timer if during work time
                $('#timer').text(setTime + ':00');
        }
        else {
            setTime = parseInt($('#breakTime').text());
            if(adjustment === 'increase')
                setTime++;
            else if(setTime > 1)
                setTime--;

            $('#breakTime').text(setTime + ' minutes');
            if(!working)     // only change timer if during break time
                $('#timer').text(setTime + ':00');
        }
    }
});

function startTimer() {
    if(!timerRunning) {
        timeArray = $('#timer').text().split(':');
        minutes = parseInt(timeArray[0]);
        seconds = parseInt(timeArray[1]);
        totalSecs = (minutes * 60) + (seconds * 1);
        $('#message').css('visibility', 'visible');
        var sound = document.getElementById('sound');

        timerRunning = true;
        timer = setInterval(function() {

            displayNumbersAsTime();

            if(totalSecs === 0) {
                sound.play();
                working = !working;
                $('#message').css('visibility', 'hidden');
            }
            if(totalSecs <= -1 && totalSecs >= -3) {    //show message for 3 secs
                if(working)
                    $('#timer').text('Back to work!');
                else
                    $('#timer').text('Relax!');
            }
            if(totalSecs === -4) {          //After 3 second break, set timer for next activity
                if(working) {
                    minutes = parseInt($('#workTime').text());
                    seconds = 0;
                    totalSecs = minutes * 60;
                    $('#message').text('Grindin...');
                    $('#timer').text(minutes + ':00');
                }
                else {
                    minutes = parseInt($('#breakTime').text());
                    seconds = 0;
                    totalSecs = minutes * 60;
                    $('#message').text('Chillin...');
                    $('#timer').text(minutes + ':00');
                }
                $('#message').css('visibility', 'visible');
            }

            seconds--;
            totalSecs--;

        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timer);
    timerRunning = false;
    $('#message').css('visibility', 'hidden');
}

function resetTimer() {
    clearInterval(timer);
    timerRunning = false;
    working = true;
    $('#message').text('Grindin...');
    $('#message').css('visibility', 'hidden');
    minutes = parseInt($('#workTime').text());
    totalSecs = (minutes * 60);
    $('#timer').text(minutes + ':00');
}

function displayNumbersAsTime() {
    if(seconds === -1) {
        seconds = 59;
        minutes--;
    }
    if(seconds < 10) {
        seconds = '0' + seconds;
    }
    $('#timer').text(minutes + ':' + seconds);
}

