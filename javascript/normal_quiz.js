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

let randomArray = [];
let randomLength = 10;
for (let i = 0; i < randomLength; i++) {
  randomArray.push(Math.floor(((Math.random())*200)));
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

  let century_item = 0
  // 世紀アイテム
  if (year > 1752) {
    century_item = (3 - (year_top % 4)) * 2;
  }else if (year >= 1752 && month > 9) {
    century_item = (3 - (year_top % 4)) * 2;
  }else if (year == 1752 && month == 9 && day >= 14) {
    century_item = (3 - (year_top % 4)) * 2;
  }else if (year == 1752 && month == 9 && day <= 2){
    century_item = 18 - year_top;
  }else if (year >= 1752 && month < 9) {
    century_item = 18 - year_top;
  }else if (year < 1752) {
    century_item = 18 - year_top;
  }else {
    return ("その日付は存在していません");
  }

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
    const Leap_total_date = total_date -1;
    return (DayOfTheWeek_array[Leap_total_date]);
  }else if (year % 4 == 0 && total_date == 0 && month >= 3) {
    total_date += 7
    return (DayOfTheWeek_array[total_date]);
  }else if (year % 4 == 0 && month <= 2){
    const Leap_total_date = total_date -1;
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
      question: `${year}年${zero_avoid((randomArray[0] % 12))}月${zero_avoid((randomArray[1]) % month_end(zero_avoid((randomArray[0] % 12))))}日の曜日はどれ？`,
      answers: [
        day_of_week(2022, zero_avoid((randomArray[0] % 12)), zero_avoid((randomArray[1]) % month_end(zero_avoid((randomArray[0] % 12))))),
        day_of_week(2022, zero_avoid((randomArray[0] % 12)), (zero_avoid((randomArray[1]) % month_end(zero_avoid((randomArray[0] % 12)))))+1),
        day_of_week(2022, zero_avoid((randomArray[0] % 12)), (zero_avoid((randomArray[1]) % month_end(zero_avoid((randomArray[0] % 12)))))+2),
        day_of_week(2022, zero_avoid((randomArray[0] % 12)), (zero_avoid((randomArray[1]) % month_end(zero_avoid((randomArray[0] % 12)))))+3)
      ],
      correct: day_of_week(2022, zero_avoid((randomArray[0] % 12)), zero_avoid((randomArray[1]) % month_end(zero_avoid((randomArray[0] % 12))))),
      hint: `日曜日から数え始めます`
    },
    {
      question: `${year}年${zero_avoid((randomArray[2] % 12))}月${zero_avoid((randomArray[3]) % month_end(zero_avoid((randomArray[2] % 12))))}日の曜日はどれ？`,
      answers: [
        day_of_week(2022, zero_avoid((randomArray[2] % 12)), zero_avoid((randomArray[3]) % month_end(zero_avoid((randomArray[2] % 12))))),
        day_of_week(2022, zero_avoid((randomArray[2] % 12)), (zero_avoid((randomArray[3]) % month_end(zero_avoid((randomArray[2] % 12)))))+1),
        day_of_week(2022, zero_avoid((randomArray[2] % 12)), (zero_avoid((randomArray[3]) % month_end(zero_avoid((randomArray[2] % 12)))))+2),
        day_of_week(2022, zero_avoid((randomArray[2] % 12)), (zero_avoid((randomArray[3]) % month_end(zero_avoid((randomArray[2] % 12)))))+3)
      ],
      correct: day_of_week(2022, zero_avoid((randomArray[2] % 12)), zero_avoid((randomArray[3]) % month_end(zero_avoid((randomArray[2] % 12))))),
      hint: "日曜日から数え始めます。"
    },
    {
      question: `${year}年${zero_avoid((randomArray[4] % 12))}月${zero_avoid((randomArray[5]) % month_end(zero_avoid((randomArray[4] % 12))))}日の曜日はどれ？`,
      answers: [
        day_of_week(2022, zero_avoid((randomArray[4] % 12)), zero_avoid((randomArray[5]) % month_end(zero_avoid((randomArray[4] % 12))))),
        day_of_week(2022, zero_avoid((randomArray[4] % 12)), (zero_avoid((randomArray[5]) % month_end(zero_avoid((randomArray[4] % 12)))))+1),
        day_of_week(2022, zero_avoid((randomArray[4] % 12)), (zero_avoid((randomArray[5]) % month_end(zero_avoid((randomArray[4] % 12)))))+2),
        day_of_week(2022, zero_avoid((randomArray[4] % 12)), (zero_avoid((randomArray[5]) % month_end(zero_avoid((randomArray[4] % 12)))))+3)
      ],
      correct: day_of_week(2022, zero_avoid((randomArray[4] % 12)), zero_avoid((randomArray[5]) % month_end(zero_avoid((randomArray[4] % 12))))),
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
