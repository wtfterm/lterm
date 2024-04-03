var fadey = document.getElementById('thingtofade');

function CoolThingy() {
  fadey.classList.toggle('fade');
  fadey.style.cssText = "pointer-events: none;"
}
