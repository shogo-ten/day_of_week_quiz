"use strict";

document.addEventListener('DOMContentLoaded', function () {
  const ta = new TextAnimation('.animate-title');
  // const mo = new MouseOver()
  ta.animate();
  this.BGM = new Audio('/music/konayukinowaltz.mp3');
  this.BGM.volume = 0.5;
  this.BGM.play();
    this.BGM.addEventListener("ended", function () {
      this.BGM.currentTime = 0;
      this.BGM.play();
    }, false);

});


class TextAnimation {
  constructor(title) {
    this.title = document.querySelector(title);
    this.chars = this.title.innerHTML.trim().split("");
    this.title.innerHTML = this._spritText();
  }
  _spritText() {
    return this.chars.reduce((acc, curr) => {
      curr = curr.replace(/\s+/, '&nbsp;');
      return `${acc}<span class="char">${curr}</span>`;
    }, "");
  }
  animate() {
    this.title.classList.toggle('inview');
  }
}
