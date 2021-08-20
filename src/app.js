function strReverse(str) {
  var str = strSplit(str);
  var strList = str.split("");
  var revList = strList.reverse();
  var strRev = revList.join("");

  return strRev;
}
function strSplit(str) {
  var strList = str.split("-");
  var strString = strList.join("");

  return strString;
}
function checkPalindrome(str) {
  if (strSplit(str) === strReverse(str)) {
    return true;
  } else {
    return false;
  }
}
function dateToString(date) {
  strDate = { day: "", month: "", year: "" };

  if (date.day < 10) {
    strDate.day = "0" + date.day;
  } else {
    strDate.day = date.day.toString();
  }
  if (date.month < 10) {
    strDate.month = "0" + date.month;
  } else {
    strDate.month = date.month.toString();
  }
  strDate.year = date.year.toString();

  return strDate;
}
function returnAllDateFormat(date) {
  var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yymmdd = date.year.slice(-2) + date.month + date.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkPalindromeForAllFormats(date) {
  var strDate = dateToString(date);
  var allFormatDates = returnAllDateFormat(strDate);
  for (let i = 0; i < allFormatDates.length; i++) {
    if (checkPalindrome(allFormatDates[i])) {
      return true;
    }
  }
  return false;
}
function checkLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 4 === 0 && year % 100 !== 0) {
    return true;
  }
  return false;
}
function nextDate(date) {
  var dateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  day = Number(date.day);
  month = Number(date.month);
  year = Number(date.year);
  day++;
  if (day > dateList[month - 1]) {
    if (month == 2) {
      if (checkLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
        }
      }
    } else {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    day = 1;
    month = 1;
    year++;
  }
  newDate = { day: day, month: month, year: year };
  return newDate;
}
function previousDate(date) {
  var dateList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  day = Number(date.day);
  month = Number(date.month);
  year = Number(date.year);
  day--;
  if (day < dateList[month - 1]) {
    if (month == 3) {
      if (checkLeapYear(year)) {
        if (day < 1) {
          day = 29;
          month--;
        }
      } else {
        if (day < 28) {
          day = 28;
          month--;
        }
      }
    } else {
      day = dateList[month - 2];
      month--;
    }
  }
  if (month < 1) {
    day = 31;
    month = 12;
    year--;
  }
  newDate = { day: day, month: month, year: year };
  return newDate;
}
function daysBetween(date) {
  let counternext = 0;
  let counterprevious = 0;
  let nextIterDate = date;
  let previousIterDate = date;
  while (true) {
    counternext++;

    if (checkPalindromeForAllFormats(nextIterDate)) {
      break;
    }
    nextIterDate = nextDate(nextIterDate);
  }
  while (true) {
    counterprevious++;

    if (checkPalindromeForAllFormats(previousIterDate)) {
      break;
    }
    previousIterDate = previousDate(previousIterDate);
  }

  if (counternext > counterprevious) {
    return [counterprevious, previousIterDate];
  } else {
    return [counternext, nextIterDate];
  }
}
function clickHandler() {
  if (userDate.value !== "") {
    var splitDate = userDate.value.split("-");
    var day = splitDate[2];
    var month = splitDate[1];
    var year = splitDate[0];
    var date = {
      day: day,
      month: month,
      year: year,
    };
    if (checkPalindromeForAllFormats(date)) {
      output.innerHTML = `It's a Palindrome!!😎`;
    } else {
      var daysBtw = daysBetween(date);
      if (daysBtw[0] != 1) {
        output.innerHTML = `The nearest palindrom date is ${daysBtw[1].day}-${daysBtw[1].month}-${daysBtw[1].year}.You missed it by ${daysBtw[0]} days`;
      } else {
        output.innerHTML = `The nearest palindrom date is ${daysBtw[1].day}-${daysBtw[1].month}-${daysBtw[1].year}.You missed it by ${daysBtw[0]} day`;
      }
    }
  } else {
    output.innerHTML = `Please enter a valid date!`;
  }
}
var userDate = document.querySelector("#date-dob");
const checkButton = document.querySelector("#check");
const output = document.querySelector("#output");
checkButton.addEventListener("click", clickHandler);
