const { google } = require("googleapis");

// Use environment variables for your credentials
const credentials = {
  type: process.env.GS_TYPE,
  project_id: "tarkov-team-kill",
  private_key_id: "a40d2a22f344800190d6f330f0931d5173db6783",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCUaZLH7S7ScFxx\ncMdsUSZFnQgWK0YEVJqvmSlxz7Vi2lY1qskTtsoyMwZTuSj/GVMqYSlrPKonCeR/\n4fciaefY2e5wztK/uc4zFMsf6I8xZ5ohym/STZrjiuiPdaOk8X4ZKIwuiAeC7giE\nyTDO5LZEGCBY/Rm06KulJ0Ht4JXa4XVHhnh/Kz9vwzrgA0C+LUP4M28/k5skQa/E\nTNkH5uiZfBJhKHmbvuTeQ/mYmT4CFff6o8jXZLUsQHJsSx7rRQoGTeVz2lEoI1Lp\nS9KEjzXX2luuUbFgX7vm4wieSMDQJ0hCRSr9NlE7qd7DVEN7TdYtYj71x2bxi04C\nmpBBUoARAgMBAAECggEAEy1rMpti6/1p7JyyoDwCMoeelmLEGuYl0N/9O4AoA5yL\n/EZT0lDR4te2DxaDhicrGHRSqlE9+WptVNsJmLBPrbVHets232BulSowLzDZY/xr\nrccfWPD/PTzjXTpJyZQNA8o6Bv873T7N6f6naGykYrstXuJhsn9IQsCGY+sb4hsC\nrlNx80nIokYBnC3vLsw8+hK+aeamPlK+7Xtgpk04AOn/i93jXeK+O0txS4/6evxw\nO/MROWgAMDgISe7pxH4qxEEMqSQNusU83byEEbEl56E8Y4iGoYxLvIZlHmrbHcoz\nfYoSrnIHjmY6YCiXeV3vNUqDp/EWTZQPLk1fjzaG6wKBgQDHFJjOXgEQhS0PWWx0\nM/VxPJAEB25TDQCNgPoATWnBrjNU4JojjCkE2gt6ZR7LVPpiZy2Yk3VutOtE2OxW\nbUmlqG4Hv5RkBG7A3qpjOWtkbvLi1GzIBM4BELaYymdJ4nevtXUIDajbggEpmgc8\nsp0MgADVe7VTwxFXVWLNn+Fu+wKBgQC+2Gbcsl2ujzaSe35RLkMD1OdYZZ/QL4d4\ngFkdgrv1xtebXKFIer8POA8vcJ/qlVHHiLDYDlSlye27WpfCkefD4TZ94q8woe4r\nQuv8q+In/oltT3XAh8CMCAiQoe1MZ/Czv955SUhyChOTjKL3KA2HuXNW/iL/A2sc\n693/WCWvYwKBgCRF33WycRU2frhOPdGKag0g0Mi7JeHh+5jMyEBn2n4cpGOxrMQP\nVKX6qJ67b/nyWNC3Jfqn23y5YCiiMaWpsgKKBspIoNv8ZsWjjH4ZxzR8dqrXs55a\nKcLN7cc3EczHg7EzKci23G5qaJXQ58KqdK0DYaOEL8y8PRuhhigbGnMjAoGAH78z\n7UammuEr/NYaPzro3vxNt8DAAwvFB2CicmxLBCmduDSCh+ITYl669/NORuGsBvtQ\nH8DSh/m9WEtLr4xB963BONO6vOZTDlNFmnSlXG3VQp/TQMHUX/b+JcEqDmnD+sLS\nKW7tZDsU4piki2TYS1moPDJuc+mHqfn6pf1t120CgYBplL5rCh34BZFiDwxBLxhe\nhzBRlGgdgsLXvFBtr1OebPC/bQaSYdgT6NV3e6YbQ+IdPNjV1JDrm1eEQJMwTwUh\naXvbBK502ziri8huVkHso9MakU5agldCT35u3f75NwkTgGX+3AGyYPIwOQRXAIQa\nd2OmJBS+lKl/6UoxBpfd0g==\n-----END PRIVATE KEY-----\n",
  client_email: "service-account@tarkov-team-kill.iam.gserviceaccount.com",
  client_id: "111608985620001859187",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/service-account%40tarkov-team-kill.iam.gserviceaccount.com",
  client_x509_cert_url: process.env.GS_CLIENT_X509_CERT_URL,
};

const spreadsheetId = "YOUR_SPREADSHEET_ID"; // Replace with your Google Sheet's ID
const range = "Sheet1"; // Adjust if you're using a different sheet name

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
