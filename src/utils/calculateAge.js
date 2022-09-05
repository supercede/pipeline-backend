function calcAge(dateOfBirth) {
  const today = new Date();

  let todayInBirthYear = new Date(
    dateOfBirth.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  const tzOffSet = todayInBirthYear.getTimezoneOffset();

  todayInBirthYear.setTime(
    todayInBirthYear.getTime() + Math.abs(tzOffSet * 60000)
  );

  const currYear = today.getFullYear();
  const diffInYears = currYear - dateOfBirth.getFullYear();

  return dateOfBirth.getTime() <= todayInBirthYear.getTime()
    ? diffInYears
    : diffInYears - 1;
}

module.exports = calcAge;
