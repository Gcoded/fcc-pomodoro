
var setTime = 0;
var timeArray = [];
var minutes = 0;
var seconds = 0;
var totalSecs = 0;
var timer1;

$('.adjust').click(function(event) {
    var parentID = event.target.parentNode.id;
    var adjustment = event.target.textContent;
    if (parentID === 'workDiv') {
        setTime = parseInt($('#workTime').text());
        if(adjustment === '+')
            setTime++;
        else
            setTime--;
        $('#workTime').text(setTime + " minutes");
        $('#timer').text(setTime + ':00');
    }
    else {
        setTime = parseInt($('#breakTime').text());
        if(adjustment === '+')
            setTime++;
        else
            setTime--;
        $('#breakTime').text(setTime + " minutes");
    }
});

function startTimer() {
    timeArray = $('#timer').text().split(':');
    minutes = parseInt(timeArray[0]);
    seconds = parseInt(timeArray[1]);
    totalSecs = (minutes * 60) + (seconds * 1);

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


