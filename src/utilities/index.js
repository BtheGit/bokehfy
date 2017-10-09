exports.isValidNumber = function (val) {
  return Number(parseFloat(val)) === val;
}

exports.fixInRange = function (num, lower, upper) {
  if (num < lower) {
    return lower;
  }
  else if (num > upper) {
    return upper;
  }
  else {
    return num;
  }
}