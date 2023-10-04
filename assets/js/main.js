const comedown = new Date('Jan 1,2024 00:00:00').getTime();
let days = document.querySelector('.days').querySelector('.comedown-timer-card');
let hours = document.querySelector('.hours').querySelector('.comedown-timer-card');
let minutes = document.querySelector('.mintues').querySelector('.comedown-timer-card');
let seconds = document.querySelector('.seconds').querySelector('.comedown-timer-card');
console.log(comedown);

// get remaining times,days,hours,mintues,seconds
let getRemainingTime = (comedown) => {
    let today = new Date().getTime();
    let remainingTime = comedown - today;

    let remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    let remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let remainingMintues = Math.floor((remainingTime  % (1000 * 60 * 60)) / (1000 * 60));
    let remainingSeconds = Math.floor((remainingTime  % (1000 * 60)) / 1000);

    return { remainingTime, remainingDays, remainingHours, remainingMintues, remainingSeconds };
}

//set days,hours,mintues,seconds in cards
let startTimeNow=(comedown)=>{
    let updateTime=()=>{
        let time=getRemainingTime(comedown);
        addFlipCard(days,time.remainingDays);
        addFlipCard(hours,time.remainingHours);
        addFlipCard(minutes,time.remainingMintues);
        addFlipCard(seconds,time.remainingSeconds);
        if(time.remainingTime<=0)
            clearInterval(timeInterval);
    }
    updateTime();
    let timeInterval=setInterval(updateTime,1000);
}

// add flip to all cards
let addFlipCard=(card,updatedTime)=>{
    
    let currentTime=card.querySelector('.upper-part').innerText;
    if(updatedTime==currentTime)
        return;

    let getTime= updatedTime<=9?`0${updatedTime}`:updatedTime;
    let upperPart=card.querySelector('.upper-part');
    let lowerPart=card.querySelector('.lower-part');
    let upperFlip=document.createElement('div');
    let lowerFlip=document.createElement('div');

    upperFlip.classList.add('uppper-flip');
    upperFlip.innerText=currentTime;

    lowerFlip.classList.add('lower-flip');

    upperFlip.addEventListener('animationstart',()=>{
        upperPart.innerText=getTime;
    });

    upperFlip.addEventListener('animationend',()=>{
        upperFlip.remove();
        lowerFlip.innerText=getTime;
    });

    lowerFlip.addEventListener('animationend',()=>{
        lowerPart.innerText=getTime;
        lowerFlip.remove();
    });

    card.appendChild(upperFlip);
    card.appendChild(lowerFlip);
}
startTimeNow(comedown);
