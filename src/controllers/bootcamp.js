const getBootcamps = (req, res) => {
  res.status(200).json({ success: true, message: "Show all bootcamps" });
};

const getBootcamp = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Show bootcamp ${req.params.id}` });
};

const createBootcamp = (req, res) => {
  res.status(200).json({ success: true, message: "Create new bootcamp" });
};

const updateBootcamp = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Update bootcamp ${req.params.id}` });
};

const deleteBootcamp = (req, res) => {
  res
    .status(200)
    .json({ success: true, message: `Delete bootcamp ${req.params.id}` });
};

module.exports = {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
};
