const category = ['music', 'sport', 'art', 'business', 'conference', 'party', 'festival', 'science and technology'];

const validateDate = (date) => {
  const re = /\d{2}-\d{2}-\d{4}/;
  return re.test(date);
};

const validateTime = (time) => {
  const re = /\d{2}:\d{2}/;
  return re.test(time);
};

export default {
  verifyBody: (req, res, next) => {
    const bd = req.body;
    if (!bd.title || bd.title.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Title not included in body',
      });
    }
    if (!bd.location || bd.location.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Location not included in body',
      });
    }
    if (!bd.startdate || bd.startdate.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'startDate not included in body',
      });
    }
    if (!bd.enddate || bd.enddate.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'EndDate not included in body',
      });
    }
    if (!bd.starttime || bd.starttime.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'startTime not included in body',
      });
    }
    if (!bd.endtime || bd.endtime.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'EndTime not included in body',
      });
    }
    if (!bd.category || bd.category.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'category not included in body',
      });
    }
    if (!bd.image || bd.image.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Image not included in body',
      });
    }
    if (!bd.description || bd.description.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'description not included in body',
      });
    }
    if (!bd.organizer || bd.organizer.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Organizer not included in body',
      });
    }
    if (!bd.organizerdescription || bd.organizerdescription.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'organizerdescription not included in body',
      });
    }
    return next();
  },
  verifyDate: (req, res, next) => {
    if (!validateDate(req.body.startdate.trim()) || !validateDate(req.body.enddate.trim())) {
      return res.status(400).json({
        status: 400,
        message: 'Date must be in the format dd-mm-yyyy',
      });
    }
    const startdateList = req.body.startdate.trim().split('-');
    const enddateList = req.body.enddate.trim().split('-');
    if (Number(startdateList[0]) > 31 || Number(enddateList[0]) > 31) {
      return res.status(400).json({
        status: 400,
        message: 'Date cannot be greater than 31',
      });
    }
    if (Number(startdateList[1]) > 12 || Number(enddateList[1]) > 12) {
      return res.status(400).json({
        status: 400,
        message: 'Month cannot be greater than 12',
      });
    }
    return next();
  },
  verifyTime: (req, res, next) => {
    if (!validateTime(req.body.starttime.trim()) || !validateTime(req.body.endtime.trim())) {
      return res.status(400).json({
        status: 400,
        message: 'Time must be in the format hr:mm',
      });
    }
    const starttimeList = req.body.starttime.split(':');
    const endtimeList = req.body.endtime.split(':');
    if (Number(starttimeList[0]) > 23 || Number(endtimeList[0]) > 23) {
      return res.status(400).json({
        status: 400,
        message: 'Hour cannot be greater than 23',
      });
    }
    if (Number(starttimeList[1]) > 59 || endtimeList[1] > 59) {
      return res.status(400).json({
        status: 400,
        message: 'Minute cannot be greater tha 59',
      });
    }
    return next();
  },
  isValidCategory: (req, res, next) => {
    if (!req.body.category || req.body.category.trim().length < 1) {
      return res.status(206).json({
        status: '206',
        message: 'category must not be empty',
      });
    }
    for (let i = 0; i < category.length; i += 1) {
      if (req.body.category.trim().toLowerCase() === category[i]) {
        return next();
      }
    }
    return res.status(400).json({
      status: 400,
      message: "category must be one of these  ['music', 'sport', 'art', 'business', 'conference', 'party', 'festival', 'science and technology']",
    });
  },
  verifyEventRegister: (req, res, next) => {
    if (!req.body.name || req.body.name.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Name not Included in body',
      });
    }
    if (!req.body.email || req.body.email.trim().length < 1) {
      return res.status(206).json({
        status: 206,
        message: 'Email not Included in body',
      });
    }
    return next();
  },
};
