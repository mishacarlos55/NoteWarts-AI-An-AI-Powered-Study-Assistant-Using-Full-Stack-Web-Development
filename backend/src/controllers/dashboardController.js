const Document = require("../models/Document");
const History = require("../models/History");

const getDashboard = async (req, res) => {
  try {
    const documentsCount = await Document.countDocuments({
      user: req.user._id,
    });

    const questionsCount = await History.countDocuments({
      user: req.user._id,
      type: "question",
    });

    const quizzesCount = await History.countDocuments({
      user: req.user._id,
      type: "quiz",
    });

    const recentDocuments = await Document.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(3);

    res.json({
      documentsCount,
      questionsCount,
      quizzesCount,
      recentDocuments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard data",
    });
  }
};

module.exports = { getDashboard };