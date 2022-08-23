export const numFormatter = (num) => {
  // console.log(num);
  // 0 - 12 = 12pm - 12am
  // 13 - 24 = 1pm - 12pm
  // 25 - 36 = 1 am - 12am
  // 37 - 48 = 1 pm - 12pm
  let text = "";
  if (num % 1 !== 0) {
    if (Math.floor(num) % 12 === 0) num = 0.5;
  } else {
    if (num % 12 === 0) num = 0;
  }

  if (num % 1 !== 0) {
    // :30
    if (num < 13) {
      text = num.toString().split(".")[0] + ":30 am";
    } else if (num > 12 && num < 25) {
      text = (num - 12).toString().split(".")[0] + ":30 pm";
    } else if (num > 24 && num < 37) {
      text = (num - 24).toString().split(".")[0] + ":30 am";
    } else if (num > 36 && num < 49) {
      text = (num - 24 - 12).toString().split(".")[0] + ":30 pm";
    }
  } else {
    // :00
    if (num < 13) {
      text = num.toString() + " am";
    } else if (num > 12 && num < 25) {
      text = (num - 12).toString() + " pm";
    } else if (num > 24 && num < 37) {
      text = (num - 24).toString() + " am";
    } else if (num > 36 && num < 49) {
      text = (num - 24 - 12).toString() + " pm";
    }
  }
  return text;
};

export const hoursMarksConverter = (input) => {
  if (input < 24) return input;
  if (input < 48) return input - 24;
  throw new Error(`Unexpected input" ${input}`);
};
