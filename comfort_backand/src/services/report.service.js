const Report = require("../model/report.model");
const { User } = require("../model/user.model");

const sendMessage = async (report) => {
  try {
    const user = await User.findById(report.sender);

    const newReport = new Report({
      ...report,
      avatar: user.avatar.url,
      username: user.username,
    });
    await newReport.save();

    return newReport;
  } catch (error) {
    console.log(error);
  }
};

const updateReport = async (id, report) => {
  console.log("------------------------------------------");
  console.log(report);
  try {
    const updatedConversation = await Report.findByIdAndUpdate(id, report, {
      new: true,
    });

    return updatedConversation;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMessage, updateReport };
