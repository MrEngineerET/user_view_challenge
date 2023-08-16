const { UserView } = require("../model/userView");

exports.getDailyUserView = async (req, res) => {
  try {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const view = await getTotalAndUniqueUsers(today, tomorrow);
    res.status(200).send({
      status: "success",
      data: view,
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: "Something went wrong" });
  }
};
exports.getWeeklyUserView = async (req, res) => {
  try {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const view = await getTotalAndUniqueUsers(today, lastWeek);
    res.status(200).send({
      status: "success",
      data: view,
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: "Something went wrong" });
  }
};
exports.getMonthlyUserView = async (req, res) => {
  try {
    const today = new Date();
    const lastMonth = new Date(today);
    lastMonth.setDate(today.getDate() - 30);
    const view = await getTotalAndUniqueUsers(today, lastMonth);
    res.status(200).send({
      status: "success",
      data: view,
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: "Something went wrong" });
  }
};

exports.getCustomDateUserView = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const view = await getTotalAndUniqueUsers(startDate, endDate);
    res.status(200).send({
      status: "success",
      data: view,
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", message: "Something went wrong" });
  }
};

async function getTotalAndUniqueUsers(startDate, endDate) {
  const result = await UserView.aggregate([
    {
      $match: {
        viewDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        totalUsers: { $sum: 1 },
        uniqueUsers: { $addToSet: "$userId" },
      },
    },
    {
      $project: {
        totalUsers: 1,
        uniqueUsersCount: { $size: "$uniqueUsers" },
      },
    },
  ]);

  return result[0];
}
