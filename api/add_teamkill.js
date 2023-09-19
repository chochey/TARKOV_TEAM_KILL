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
    const currentDate = new Date()
      .toISOString()
      .replace("T", " ")
      .split(".")[0];

    const { name, killer, cause_of_death, map_name, death_location } = req.body;
    const uniqueID = new Date().getTime().toString(); // Unique timestamp ID

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: {
        values: [
          [
            name,
            killer,
            cause_of_death,
            map_name,
            death_location,
            currentDate,
            uniqueID,
          ],
        ],
      },
    });

    res.status(200).json({ message: "Data added successfully!" });
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ message: "Failed to add data." });
  }
};
