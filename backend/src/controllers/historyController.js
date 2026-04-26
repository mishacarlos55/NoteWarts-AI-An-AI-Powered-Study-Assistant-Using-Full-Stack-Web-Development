const History = require("../models/History");

const getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user._id })
      .populate("document", "originalName fileType")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch history",
    });
  }
};

module.exports = { getHistory };