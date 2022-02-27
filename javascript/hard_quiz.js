const date = new Date () ;

const toYear = date.getFullYear() ;	// 年
const toMonth = date.getMonth() + 1 ;	// 月
const toDay = date.getDate() ;	// 日
const dayOfWeek = date.getDay() ;	// 曜日(数値)
const dayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ] ;	// 曜日(日本語表記)
const todayOfWeekStr = [ "日", "月", "火", "水", "木", "金", "土" ][dayOfWeek] ;	// 曜日(日本語表記)
const dayOfWeekNum = [0, 1, 2, 3, 4, 5, 6]; // 曜日の数字

let randomArray = [];
let randomLength = 15;
for (let i = 0; i < randomLength; i++) {
  randomArray.push(Math.floor(((Math.random())*200)));
}

// 世紀列の中からランダムに選出
let centuryArray = [1800, 1900, 2000];
function centuryRandom(num) {
  return centuryArray[randomArray[num] % 3];
}

function yearCorrect(num) {
  return centuryRandom(num) + zero_avoid((randomArray[num+1] % 99))
}

function monthCorrect(x) {
  return zero_avoid((randomArray[x] % 12))
}

function dayCorrect(x) {
  return zero_avoid((randomArray[x]) % month_end(zero_avoid((randomArray[(x-1)] % 12))))
}


// 0となる数を除ける
function zero_avoid(x) {
  if (x == 0) {
    return x + 1
  } else {
    return x
  }
}

// 曜日を求める
function day_of_week(CY, M, D) {
  const year = CY;
  const month = M;
  const day = D;
  const year_top = Math.floor( year / 100 );
  const year_under = year % 100;

  // 世紀アイテム
  let century_item = (3 - (year_top % 4)) * 2;



  // 年アイテム
  const year_dozen = Math.floor(year_under / 12);
  const year_dozen_remainder = year_under % 12;
  const year_forth = Math.floor(year_dozen_remainder / 4);
  const year_item = (year_dozen + year_dozen_remainder + year_forth) % 7;

  // 月アイテム
  const month_array = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5]
  const month_item = month_array[month - 1];

  // 曜日の確定
  const DayOfTheWeek_array = ["日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日"]
  let total_date = (century_item + year_item + month_item + Number(day)) % 7

  if (year % 100 == 0 && year % 400 !== 0){
    return (DayOfTheWeek_array[total_date]);
  }else if (year % 4 == 0 && total_date == 0 && month <= 2) {
    total_date += 7
    const Leap_total_date = (total_date -1) % 7;
    return (DayOfTheWeek_array[Leap_total_date]);
  }else if (year % 4 == 0 && total_date == 0 && month >= 3) {
    return (DayOfTheWeek_array[total_date]);
  }else if (year % 4 == 0 && month <= 2){
    total_date += 7
    const Leap_total_date = (total_date -1) % 7;
    return (DayOfTheWeek_array[Leap_total_date]);
  }else if (year % 4 == 0 && month >= 3) {
    return (DayOfTheWeek_array[total_date]);
  }else {
    return (DayOfTheWeek_array[total_date]);
  }
}

// 月末の日を求める
function month_end(month_select) {
  if (month_select == 1 || month_select == 3 || month_select == 5 || month_select == 7 || month_select == 8 || month_select == 10 || month_select == 12) {
    return   31
  } else if (month_select == 4 || month_select == 6 || month_select == 9 || month_select == 11) {
    return   30
  } else {
    return   28
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const main = new Main([
    {
      question: `${yearCorrect(0)}年${monthCorrect(1)}月${dayCorrect(2)}日の曜日はどれ？`,
      answers: [
        day_of_week(yearCorrect(0), monthCorrect(1), dayCorrect(2)),
        day_of_week(yearCorrect(0), monthCorrect(1), dayCorrect(2)+1),
        day_of_week(yearCorrect(0), monthCorrect(1), dayCorrect(2)+2),
        day_of_week(yearCorrect(0), monthCorrect(1), dayCorrect(2)+3)
      ],
      correct: day_of_week(yearCorrect(0), monthCorrect(1), dayCorrect(2)),
      hint: `doomsdayは${day_of_week(yearCorrect(0), 1, 3)}です`
    },
    {
      question: `${yearCorrect(2)}年${monthCorrect(4)}月${dayCorrect(5)}日の曜日はどれ？`,
      answers: [
        day_of_week(yearCorrect(2), monthCorrect(5), dayCorrect(6)),
        day_of_week(yearCorrect(2), monthCorrect(5), dayCorrect(6)+1),
        day_of_week(yearCorrect(2), monthCorrect(5), dayCorrect(6)+2),
        day_of_week(yearCorrect(2), monthCorrect(5), dayCorrect(6)+3)
      ],
      correct: day_of_week(yearCorrect(2), monthCorrect(5), dayCorrect(6)),
      hint: `doomsdayは${day_of_week(yearCorrect(2), 1, 3)}です`
    },
    {
      question: `${yearCorrect(7)}年${monthCorrect(9)}月${dayCorrect(10)}日の曜日はどれ？`,
      answers: [
        day_of_week(yearCorrect(7), monthCorrect(9), dayCorrect(10)),
        day_of_week(yearCorrect(7), monthCorrect(9), dayCorrect(10) + 1),
        day_of_week(yearCorrect(7), monthCorrect(9), dayCorrect(10) + 2),
        day_of_week(yearCorrect(7), monthCorrect(9), dayCorrect(10) + 3)
      ],
      correct: day_of_week(yearCorrect(7), monthCorrect(9), dayCorrect(10)),
      hint: `doomsdayは${day_of_week(yearCorrect(7), 1, 3)}です`
    }
  ]);
});

console.log(day_of_week(yearCorrect(0), monthCorrect(1), dayCorrect(2)));
console.log(day_of_week(yearCorrect(2), monthCorrect(5), dayCorrect(6)));
console.log(day_of_week(yearCorrect(7), monthCorrect(9), dayCorrect(10)));
console.log(yearCorrect(0),yearCorrect(2),yearCorrect(7));


class Main {
  constructor(obj) {
    // this.SetUpQuestion = new SetUp(obj);
    this.AddEventAnswers = new AddEventAnswers(obj);
  }
}
