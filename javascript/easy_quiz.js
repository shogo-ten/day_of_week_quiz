const date = new Date () ;

const year = date.getFullYear() ;	// 年
const month = date.getMonth() + 1 ;	// 月
const day = date.getDate() ;	// 日
const hour = date.getHours() ;	// 時
const minute = date.getMinutes() ;	// 分
const second = date.getSeconds() ;	// 秒
const dayOfWeek = date.getDay() ;	// 曜日(数値)
const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ] ;	// 曜日(日本語表記)
const todayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;	// 曜日(日本語表記)
const dayOfWeekNum = [0, 1, 2, 3, 4, 5, 6]; // 曜日の数字

document.addEventListener('DOMContentLoaded', function() {
  const main = new Main([
    {
    question: `4に対応する曜日はどれ`,
    answers: [
      "月曜日",
      "火曜日",
      "水曜日",
      "木曜日"
    ],
    correct: "木曜日",
    hint: "日曜日から数え始めます"
    },
    {
      question: `今日の曜日(${todayOfWeekStr}曜日)に対応する数字はどれ`,
      answers: [
        dayOfWeek,
        (dayOfWeek + 1) % 7,
        (dayOfWeek + 2) % 7,
        (dayOfWeek + 3) % 7
      ],
      correct: dayOfWeek,
      hint: "日曜日から数え始めます。"
    },
    {
      question: `明後日の曜日(${dayOfWeekStr[dayOfWeek+2]}曜日)に対応する数字はどれ?`,
      answers: [
        dayOfWeekNum[dayOfWeek+2],
        (dayOfWeekNum[dayOfWeek+2] + 1) % 7,
        (dayOfWeekNum[dayOfWeek+2] + 2) % 7,
        (dayOfWeekNum[dayOfWeek+2] + 3) % 7,
      ],
      correct: dayOfWeekNum[dayOfWeek+2],
      hint: "日曜日から数え始めます。"
    }
  ]);
});

class Main {
  constructor(obj) {
    // this.SetUpQuestion = new SetUp(obj);
    this.AddEventAnswers = new AddEventAnswers(obj);
  }
}
