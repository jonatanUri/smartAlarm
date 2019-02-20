let body = document.querySelector('body');
let timeControl = document.querySelector('input[type="time"]');
let start_button = document.getElementById('start-button');
let stop_button = document.getElementById('stop-button');
let wakeup = document.getElementById('wake-up');
let clock = document.getElementById('clock');
let audio = new Audio("static/sounds/Tennyson - 700 AM.mp3");

function get_current_time() {
    let today = new Date();
    let current_time;
    let hrs = today.getHours();
    let mins = today.getMinutes();
    let secs = today.getSeconds();
    hrs = expand0(hrs);
    mins = expand0(mins);
    secs = expand0(secs);
    current_time = hrs+":"+mins+":"+secs;
    return current_time;
}

function expand0(data) {
    if (data<10)
        data = "0" + data;
    return data
}

function update_current_time() {
    clock.innerHTML = get_current_time();
}

setInterval(update_current_time,1000);

function start_timer() {
    console.log("starting timer");
    body.classList.add('sleeping');
    body.classList.remove('wakeup');
    console.log('Time set: ' + timeControl.value);
    console.log('Current time: ' + get_current_time());

    setInterval(checkWakeUp,1000)
}

function checkWakeUp() {
    let current_time = get_current_time();
    let when_to_start_light = get_when_to_start_light(timeControl.value);
    let when_to_start_sound = timeControl.value+':00';
    if (current_time === when_to_start_light) {
        start_light()
    }

    if (current_time === when_to_start_sound){
        start_sound()
    }

}

function get_when_to_start_light(time) {
    time = time.split(":");
    let hrs = time[0];
    let mins = time[1];
    if (mins >= 10){
        mins -= 10;
    }
    else {
        hrs--;
        mins = 60 - (10 - mins)
    }
    return ""+hrs+":"+mins+":00"
}

let awake = false;

function start_light() {
    stop_button.innerHTML = "Click here if you are awake :)";
    console.log("starting light");
    body.classList.add('wakeup');
}

function start_sound(){
    if (!awake){
        console.log("starting sound");
        audio.play();
    }
}

function stop_alarm(){
    awake = true;
    console.log("stopping alarm");
    audio.pause();
}

start_button.addEventListener("click",start_timer);
stop_button.addEventListener("click",stop_alarm);
wakeup.addEventListener('click', start_light);

