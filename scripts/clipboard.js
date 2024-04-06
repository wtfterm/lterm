var ethereumi = document.getElementById('ethereum');
var bitcoini = document.getElementById('bitcoin');

ethereumi.addEventListener('click', function() {
    navigator.clipboard.writeText("0xC48A97B2ec5342d348F19ed3cA0483eF7B1C0b87");
});

bitcoini.addEventListener('click', function() {
    navigator.clipboard.writeText("bc1qqwacjmu34qvwhxdm4l7qq8sdep2dhasrseymhf");
});
