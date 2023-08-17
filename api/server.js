const express = require("express");
const { google } = require("googleapis");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Setup Google Sheets API
const sheets = google.sheets("v4");
const auth = new google.auth.GoogleAuth({
  keyFile: "./path_to_your_service_account_key.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

app.post("/add_teamkill", async (req, res) => {
  const data = req.body;
  const sheetId = "YOUR_GOOGLE_SHEET_ID"; // You can find this in your Google Sheet URL

  try {
    const client = await auth.getClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: "Sheet1", // Assuming you're writing to the first sheet
      valueInputOption: "RAW",
      auth: client,
      resource: {
        values: [
          [
            data.name,
            data.killer,
            data.cause_of_death,
            data.map_name,
            data.death_location,
          ],
        ],
      },
    });
    res.status(200).send("Data added successfully");
  } catch (error) {
    console.error("Error writing to Google Sheets:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
