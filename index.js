let minutes_section = document.getElementById("minutes_section");
let clock_img = document.getElementById("clock_img");
let hours_section = document.getElementById("hours_section");
let period_section = document.getElementById("period_section");
let clock_form = document.getElementById('clock_form');
let set_alarm = document.getElementById('set_alarm');

for (let i = 1; i <= 12; i++) {
    i = i < 10 ? '0' + i : i;
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    hours_section.appendChild(option);
}
for (let i = 0; i < 60; i++) {
    i = i < 10 ? '0' + i : i;
    let option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    minutes_section.appendChild(option);
}



const audio = new Audio('alarm.mp3');
let alarmTimeoutId;


// setting alarm 
document.getElementById('set_alarm').addEventListener('click', (e) => {
    e.preventDefault();

    const userhours = hours_section.value;
    const userminutes = minutes_section.value;
    const userperiod = period_section.value;

    if (!userhours || !userminutes || !userperiod) {
        alert('Please select your time');
        return;
    }
    if (set_alarm.innerHTML == 'Clear Alarm') {
        clearTimeout(alarmTimeoutId);
        audio.pause();
        audio.currentTime = 0;
        set_alarm.innerHTML = 'Set Alarm';
        return;
    }
    console.log('hey')

    const setalarm = () => {
        alarmTimeoutId = setTimeout(() => {
            audio.play();
        }, 0);
    }

    set_alarm.innerHTML = 'Clear Alarm'

    setInterval(() => {
        const a = new Date();
        let hour = a.getHours();
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour == 0 ? 12 : hour;
        hour = hour > 12 ? (hour - 12) : hour;
        hour = hour < 10 ? '0' + hour : hour;
        let minute = a.getMinutes();
        minute = minute < 10 ? '0' + minute : minute;
        const second = '00';


        if (userhours == hour && userminutes == minute && userperiod == period && set_alarm.innerHTML == 'Clear Alarm') {
            clock_img.classList.remove('fa-bounce')
            clock_img.classList.add('fa-shake')
            setalarm();
        } else {
            clock_img.classList.remove('fa-shake')
            clock_img.classList.add('fa-bounce')
        }
    }, 1000);

});


//clock
let div = document.createElement('div');
setInterval(() => {
    let currenttime = new Date().toLocaleTimeString()
    div.innerHTML = currenttime;
    div.id = 'show_time'
    clock_form.insertAdjacentElement('beforebegin', div); //
}, 1000);