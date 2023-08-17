const { google } = require("googleapis");
const credentials = require("../tarkov-team-kill-a40d2a22f344.json");

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

    res.json(response.data.values || []);
  } catch (error) {
    console.error("Error reading from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
};
