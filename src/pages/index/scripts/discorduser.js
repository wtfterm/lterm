//took insp from belvin (skidded 30% of it)
import LanyardClient from "../../scripts/lanyardClient.js";
      

const state = document.getElementById("state");
const nowplaying = document.getElementById("nowplaying");
const albumimg = document.getElementById("albumimage");
const statusdiv = document.getElementById("statusdiv");
let lastState = "text-gray-500";
let lastStatus = "card-status-offline";
const client = new LanyardClient();
let sock = client.subscribe("969432830952222750");

sock.addEventListener("message", (e) => {
    const data = JSON.parse(e.data);
    if (data.op !== 0) {
        return;
    }
    
    const { d } = data;
    console.log(d);
    if (d.listening_to_spotify) {
        const artists = d.spotify.artist.split('; ');
        nowplaying.innerHTML = `${d.spotify.song} by ${artists.join(",")}`;
        albumimg.src = d.spotify.album_art_url;
    } else {
        nowplaying.innerHTML = "Not Playing Anything Right Now.";
    }

    if (d.discord_status === "online") {
        state.classList.remove(lastState);
        statusdiv.classList.remove(lastStatus);
        state.innerHTML = "Online";
        state.classList.add("text-green-500");
        statusdiv.classList.add("card-status-online");
        lastState = "text-green-500";
        lastStatus = "card-status-online";
    } else if (d.discord_status === "idle") {
        state.classList.remove(lastState);
        statusdiv.classList.remove(lastStatus);
        state.innerHTML = "Idle";
        state.classList.add("text-yellow-500");
        statusdiv.classList.add("card-status-idle");
        lastState = "text-yellow-500";
        lastStatus = "card-status-idle";
    } else if (d.discord_status === "Do Not Disturb") {
        state.classList.remove(lastState);
        statusdiv.classList.remove(lastStatus);
        state.innerHTML = "Do Not Disturb";
        state.classList.add("text-red-500");
        statusdiv.classList.add("card-status-dnd");
        lastState = "text-red-500";
        lastStatus = "card-status-dnd";
    } else {
        state.classList.remove(lastState);
        statusdiv.classList.remove(lastStatus);
        state.innerHTML = "Offline";
        state.classList.add("text-gray-500");
        statusdiv.classList.add("card-status-offline");
        lastState = "text-gray-500";
        lastStatus = "card-status-offline";
    }
});
