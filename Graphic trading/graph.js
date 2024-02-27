let body = document.querySelector("body");
let box = document.getElementById("box");
let ApiLink = 'https://api.coincap.io/v2/assets';
let left = 0;
let prevCandle = null;

setInterval(() => {
  left += 35;
  var requist = fetch(ApiLink)
    .then(datta => datta.json())
    .then((obj) => {
      let rslt = Math.floor((obj.data[0].volumeUsd24Hr % 1) * 100);
      let rsltprice = Math.floor((obj.data[0].priceUsd % 1) * 100);

     
      let candle = document.createElement("secondcandle");
      candle.style.width = rslt + "px";
      candle.style.height = rslt + "px";
      candle.style.bottom = rsltprice + "px";
      candle.style.left = left + "px";
      candle.classList.add("candle");

     
      let p = document.createElement("p");
      candle.addEventListener("mouseenter", function () {
        p.innerHTML = obj.data[0].volumeUsd24Hr;
        p.classList.add("volum");
        body.appendChild(p);
      });

      
      candle.addEventListener("mouseleave", function () {
        var cp = document.querySelectorAll(".volum");
        cp.forEach((c) => {
          c.remove();
        });
      });

      
      if (prevCandle) {
        prevCandle.style.backgroundColor = "rgba(48, 255, 2, 0.431)";
      }

      
      prevCandle = candle;


      box.appendChild(candle);
    });

}, 1*5000);
