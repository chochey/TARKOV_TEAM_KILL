const { google } = require("googleapis");
const credentials = require("../tarkov-team-kill-a40d2a22f344.json");

const spreadsheetId = "1sopwJ3wOKFPJfHBh3L0jTYRrhkE4V6nrWvEIdB2Dma4";
const range = "Sheet1";

async function fetchFromSheet() {
  const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ["https://www.googleapis.com/auth/spreadsheets.readonly"]
  );

  await auth.authorize();
  const sheets = google.sheets({ version: "v4", auth });

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range,
  });

  return response.data.values || [];
}

module.exports.getData = async (req, res) => {
  try {
    const data = await fetchFromSheet();
    res.json(data);
  } catch (error) {
    console.error("Error reading from Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = async (req, res) => {
  try {
    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    await auth.authorize();

    const sheets = google.sheets({ version: "v4", auth });
    const { name, killer, cause_of_death, map_name, death_location } = req.body;

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: {
        values: [[name, killer, cause_of_death, map_name, death_location]],
      },
    });

    res.status(200).send("Data added successfully");
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
};
