const validateDate = (date) => {
  const re = /\d{2}:\d{2}:\d{4}/;
  return re.test(date);
};

const validateTime = (time) => {
  const re = /\d{2}:\d{2}/;
  return re.test(time);
};

const checkTime = (time) => {
  const timelist = time.split(':');
  if (Number(timelist[0]) > 23) {
    return 'Time format must be in this format 23:59, greater than time zone';
  }
  if (Number(timelist[1]) > 59) {
    return 'Time must be in the format 23:59, greater than timezone';
  }
};

export default = {
  // verifyBody: (req, res, next)
}
