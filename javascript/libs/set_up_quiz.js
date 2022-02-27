
let quizIndex = 0;
let score = 0;
class SetUp {
  constructor(obj) {
    this.quizAry = obj;
    this.DOM = {};
    this.randomQuiz = this._randomQuestion(obj);
    this._setUpQuestion(obj);
    this._hintClsAdd();
    this._setUpHint();
    this._clickAddEvent(obj);
    this.BGM = new Audio('/music/konayukinowaltz.mp3');
    this.correctMusic = new Audio('/music/correct_quiz.mp3');
    this.incorrectMusic = new Audio('/music/incorrect_quiz.mp3');
    this.BGM.play();
    this.BGM.addEventListener("ended", function () {
      this.BGM.currentTime = 0;
      this.BGM.play();
    }, false);
  }
  _randomQuestion(obj) {
    return this._shuffle(obj);
  }
  _quizAnswers() {
    return this._quizIndex().answers;
  }
  _quizIndex() {
    return this.randomQuiz[quizIndex];
  }
  _shuffle([...array]) {
    for (this.i = array.length - 1; this.i >= 0; this.i -= 1) {
      this.j = Math.floor(Math.random() * (this.i + 1));
      [array[this.i], array[this.j]] = [array[this.j], array[this.i]];
    }
    return array;
  }
  _setUpQuestion(obj) {
    this.DOM.button = document.querySelectorAll(".btn-primary");
    this.buttonLength = this.DOM.button.length;
    // クイズ作成
    document.querySelector("#js-question").innerText = this._quizIndex().question;
    this.shuffleAnswers = this._shuffle(this._quizAnswers(obj))
    for (this.buttonIndex = 0 ; this.buttonIndex < this.buttonLength ; this.buttonIndex += 1) {
    // ボタン作成
    this.DOM.button[this.buttonIndex].textContent = this.shuffleAnswers[this.buttonIndex];
    }
  }
  _hintToggle() {
    this.DOM.hintCon = document.querySelector('#hint');
    this.DOM.hintCon.classList.toggle('hint-on');
  }
  _hintClsAdd() {
    this.DOM.hintCls = document.querySelector('#close-btn');
    this.DOM.hintCls.addEventListener('click', () => {
      this._hintToggle();
    });
  }
  _setUpHint() {
    this.DOM.clickArea = document.querySelectorAll('.hint-event');
    document.querySelector('.hint-text').innerText = this._quizIndex().hint;
    for(this.i = 0; this.i < this.DOM.clickArea.length; this.i += 1) {
      this.DOM.clickArea[this.i].addEventListener('click', () =>{
        this._hintToggle();
      }, false);
    }
  }

  _clickSetUp(obj) {
    this.DOM.resultMessage = document.querySelector('#resultMessage');
    this.DOM.Modal = document.querySelector('.modal');
    if(quizIndex < this.quizAry.length){
      // 問題があればこちらを実行
      this._setUpQuestion(obj);
      document.querySelector('.hint-text').innerText = this._quizIndex().hint;
    } else {
      // 問題がなければこちらを実行
      resultMessage.innerText = "終了!あなたの正解は" + score + "/" + this.quizAry.length;
      this.DOM.Modal.classList.toggle('inview');
    }
  }
  _clickAddEvent(obj) {
    // ボタンにイベントを付与する
    this.DOM.button = document.querySelectorAll(".btn-primary");
    this.buttonLength = this.DOM.button.length;
    for(this.handleIndex = 0; this.handleIndex < this.buttonLength; this.handleIndex += 1) {
      this.DOM.button[this.handleIndex].addEventListener("click", (e) => {
        this._clickAnswers(e, obj);
        quizIndex++;
        this._clickSetUp(obj);
      });
    }
  }
  _clickAnswers(e){
    this.DOM.answers = document.querySelector('.answers');
    if (this._quizIndex().correct == e.target.textContent) {
      // 正解の場合
      this.DOM.answers.classList.add('correct');
      this.correctMusic.play();
      score++;
    } else {
      // 不正解の場合
      this.DOM.answers.classList.add('incorrect');
      this.incorrectMusic.play();
    }
    this._showOverlay()
  }

  _showOverlay() {
    this._fullOverlayToggle();
    setTimeout(function(){
      this._fullOverlayToggle();
      this.DOM.answers.classList.remove('correct');
      this.DOM.answers.classList.remove('incorrect');
      this._musicReset()
    }.bind(this), 1000);
  }
  _fullOverlayToggle() {
    document.querySelector(".fullOverlay").classList.toggle('inview');
  }
  _musicReset() {
    this.correctMusic.pause();
    this.correctMusic.currentTime = 0;
  }
}
