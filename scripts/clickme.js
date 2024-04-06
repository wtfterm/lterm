var fadey = document.getElementById('thingtofade');

fadey.addEventListener('click', function() {
    CoolThingy()
});
function CoolThingy() {
  fadey.classList.toggle('fade');
  fadey.style.cssText = "pointer-events: none;"
}
