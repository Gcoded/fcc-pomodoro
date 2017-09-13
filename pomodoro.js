
var timeArray = $('#timer').text().split(':');
var minutes = parseInt(timeArray[0]);
var seconds = parseInt(timeArray[1]);
var totalSecs = (minutes * 60) + (seconds * 1)
var timer1;

function startTimer() {
    timer1 = setInterval(function() {
        if(totalSecs > 0) {
            if(seconds === -1) {
                seconds = 59;
                minutes--;
            }
            if(seconds < 10) {
                seconds = "0" + seconds;
            }
            $('#timer').text(minutes + ":" + seconds);
            seconds--;
            totalSecs--;
        }
        else {
            clearInterval(timer1);
            $('#timer').text('Times Up');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer1);
}

function resetTimer() {
    clearInterval(timer1);
    minutes = timeArray[0];
    seconds = timeArray[1];
    totalSecs = (minutes * 60) + (seconds * 1)
    $('#timer').text(minutes + ":" + seconds);
}


