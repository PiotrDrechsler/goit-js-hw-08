import Player from '@vimeo/player';
import throttle from 'lodash.throttle';


const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const onPlay = function(data) {
    localStorage.setItem(`videoplayer-current-time`, JSON.stringify(data.seconds));
};

const throttleOnPlay = throttle(onPlay, 1000);

player.on('timeupdate', throttleOnPlay);

const savedTime = localStorage.getItem("videoplayer-current-time");
const parsedSavedTime = JSON.parse(savedTime);

player.setCurrentTime(parsedSavedTime).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
});