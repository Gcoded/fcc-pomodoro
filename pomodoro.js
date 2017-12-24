
var timeArray = [];
var minutes = 0;
var seconds = 0;
var totalSecs = 0;
var timer;
var timerRunning = false;
var working = true;
var workColor = '#BAD1F2';
var breakColor = '#A1D1C4';
var backgroundColor = '';

$('.adjust').click(function(event) {
    if (!timerRunning) {
        var parentID = event.target.parentNode.id;
        var adjustment = event.target.id;
        var setTime = 0;

        if (parentID === 'workDiv') {
            setTime = parseInt($('#workTime').text());
            if (adjustment === 'increase')
                setTime++;
            else if (setTime > 1)
                setTime--;

            if (setTime === 1)
                $('#workTime').text(setTime + ' minute');
            else
                $('#workTime').text(setTime + ' minutes');

            if (working)     // only change timer if during work time
                $('#timer').text(setTime + ':00');
        }
        else {
            setTime = parseInt($('#breakTime').text());
            if (adjustment === 'increase')
                setTime++;
            else if (setTime > 1)
                setTime--;

            if (setTime === 1)
                $('#breakTime').text(setTime + ' minute');
            else
                $('#breakTime').text(setTime + ' minutes');

            if (!working)     // only change timer if during break time
                $('#timer').text(setTime + ':00');
        }
    }
});

function runTimer() {
    if (!timerRunning) {
        timeArray = $('#timer').text().split(':');
        minutes = parseInt(timeArray[0]);
        seconds = parseInt(timeArray[1]);
        totalSecs = (minutes * 60) + (seconds * 1);
        $('#message').css('visibility', 'visible');
        var sound = document.getElementById('sound');

        timerRunning = true;

        displayTime();
        timer = setInterval(displayTime, 1000);

    }
    else {
        clearInterval(timer);
        timerRunning = false;
        $('#message').css('visibility', 'hidden');
    }
}

function displayTime() {
    if (seconds === -1) {
        seconds = 59;
        minutes--;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    $('#timer').text(minutes + ':' + seconds);

    if(totalSecs < 1)
        timerDoneActions();

    seconds--;
    totalSecs--;
}

function timerDoneActions() {
    if (totalSecs === 0) {
        sound.play();
        working = !working;
        if (working)
            backgroundColor = workColor;
        else
            backgroundColor = breakColor;
        $('#message').css('visibility', 'hidden');
        $('body').css('background-color', backgroundColor);
    }

    if (totalSecs <= -1 && totalSecs >= -3) {    //show message for 3 secs
        if (working)
            $('#timer').text('Back to work...');
        else
            $('#timer').text('Relax!');
    }

    if (totalSecs === -4) {          //After 3 second break, set timer for next activity
        if (working) {
            minutes = parseInt($('#workTime').text());
            seconds = 0;
            totalSecs = minutes * 60;
            $('#message').text('#GrindTime');
            $('#timer').text(minutes + ':00');
        }
        else {
            minutes = parseInt($('#breakTime').text());
            seconds = 0;
            totalSecs = minutes * 60;
            $('#message').text('#OnChill');
            $('#timer').text(minutes + ':00');
        }
        $('#message').css('visibility', 'visible');
    }

}

function resetTimer() {
    clearInterval(timer);
    timerRunning = false;
    working = true;
    $('#message').text('#GrindTime');
    $('#message').css('visibility', 'hidden');
    $('body').css('background-color', workColor);
    minutes = parseInt($('#workTime').text());
    totalSecs = (minutes * 60);
    $('#timer').text(minutes + ':00');
}


