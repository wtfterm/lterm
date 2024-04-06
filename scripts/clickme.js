var fadey = document.getElementById('thingtofade');

fadey.addEventListener('click', function() {
    CoolThingy();
    audioPlay();
});
function CoolThingy() {
  fadey.classList.toggle('fade');
  fadey.style.cssText = "pointer-events: none;"
}
function audioPlay() {
  var audio = document.getElementById("video");
  audio.play();
}
