const { google } = require("googleapis");
const credentials = require("../googleConfig.js");

const spreadsheetId = "1sopwJ3wOKFPJfHBh3L0jTYRrhkE4V6nrWvEIdB2Dma4";
const range = "Sheet1";

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets.readonly"]
);

const sheets = google.sheets({ version: "v4", auth });

module.exports = async (req, res) => {
  try {
    await auth.authorize();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    res.status(200).json(response.data.values);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Failed to fetch data." });
  }
};
