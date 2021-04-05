function showClock() {
  let time = new Date().toLocaleTimeString();
  let msg = `現在時刻は: ${time}`;
  document.getElementById("app").innerHTML = msg;
}
setInterval('showClock()',1000);