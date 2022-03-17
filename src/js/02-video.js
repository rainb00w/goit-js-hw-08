import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

player.on('play', function () {
  console.log('played the video!');
});

player.getVideoTitle().then(function (title) {
  console.log('title:', title);
});


player.on('timeupdate', throttle(function(data) {
  console.log(data.seconds);
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data.seconds));
}), 500);

const currentTimeGet = localStorage.getItem('videoplayer-current-time');
console.log(currentTimeGet);

player
  .setCurrentTime(currentTimeGet)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });


