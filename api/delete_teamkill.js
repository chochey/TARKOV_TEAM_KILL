const { google } = require("googleapis");
const credentials = require("../tarkov-team-kill-a40d2a22f344.json");

const spreadsheetId = "1sopwJ3wOKFPJfHBh3L0jTYRrhkE4V6nrWvEIdB2Dma4";
const range = "Sheet1";

const auth = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ["https://www.googleapis.com/auth/spreadsheets"]
);

const sheets = google.sheets({ version: "v4", auth });

module.exports = async (req, res) => {
  try {
    await auth.authorize();
    const uniqueID = req.body.id; // Assuming the frontend sends the ID of the entry to be deleted

    // Fetch all rows from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;
    const rowIndex = rows.findIndex((row) => row[0] === uniqueID); // Finding the index of the row with the given ID

    if (rowIndex === -1) {
      res.status(404).json({ message: "Entry not found." });
      return;
    }

    // Delete the row
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `Sheet1!A${rowIndex + 1}:G${rowIndex + 1}`, // Assuming 7 columns (A to G) and adjusting for 0-indexed array
    });

    res.status(200).json({ message: "Entry deleted successfully." });
  } catch (error) {
    console.error("Error deleting entry:", error);
    res.status(500).json({ message: "Failed to delete entry." });
  }
};
