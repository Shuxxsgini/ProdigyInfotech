let timer = document.querySelector('.timerDisplay');
let stopBtn = document.getElementById('stopBtn');
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');
let lapList = document.getElementById('lapList');

let msec = 0;
let secs = 0;
let mins = 0;

let timerId = null;
let lapCounter = 1;

startBtn.addEventListener('click', function(){
    if(timerId !== null){
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 10);
    startClock();
});

stopBtn.addEventListener('click', function(){
    clearInterval(timerId);
});

resetBtn.addEventListener('click', function(){
    clearInterval(timerId);
    timer.innerHTML = `00 : 00 : 00`;
    msec = secs = mins = 0;
    lapList.innerHTML = '';
    lapCounter = 1;
    resetClock();
});

lapBtn.addEventListener('click', function(){
    let lapTime = timer.innerHTML;
    let lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCounter++;
});

function startTimer(){
    msec++;
    if(msec == 100){
        msec = 0;
        secs++;
        if(secs == 60){
            secs = 0;
            mins++;
        }
    }

    let msecString = msec < 10 ? `0${msec}` : msec;
    let secsString = secs < 10 ? `0${secs}` : secs;
    let minsString = mins < 10 ? `0${mins}` : mins;
    
    timer.innerHTML = `${minsString} : ${secsString} : ${msecString}`;
}

function startClock() {
    setInterval(updateClock, 1000);
}

function updateClock() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    let hourHand = document.querySelector('.hour-hand');
    let minuteHand = document.querySelector('.minute-hand');
    let secondHand = document.querySelector('.second-hand');

    let hourDegrees = (hour % 12) * 30 + (minute / 60) * 30;
    let minuteDegrees = minute * 6 + (second / 60) * 6;
    let secondDegrees = second * 6;

    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;
}

function resetClock() {
    let hourHand = document.querySelector('.hour-hand');
    let minuteHand = document.querySelector('.minute-hand');
    let secondHand = document.querySelector('.second-hand');

    hourHand.style.transform = `rotate(0deg)`;
    minuteHand.style.transform = `rotate(0deg)`;
    secondHand.style.transform = `rotate(0deg)`;
}
