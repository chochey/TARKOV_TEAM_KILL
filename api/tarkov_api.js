const fetch = require("node-fetch");

module.exports = async (req, res) => {
  try {
    const response = await fetch("https://api.tarkov.dev/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `{
                    ammoType: ammo {
                        caliber
                        tracerColor
                        projectileCount
                        accuracy
                        accuracyModifier
                        recoil
                        recoilModifier
                        initialSpeed
                        staminaBurnPerDamage
                    }
                }`,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data." });
  }
};

//   .then((r) => r.json())
//   .then((data) => {
//     populateTable(data);
//   });

// function populateTable(data) {
//   const tableBody = document.getElementById("ammoTable").querySelector("tbody");

//   data.ammoType.forEach((ammo) => {
//     const row = tableBody.insertRow();
//     row.insertCell().textContent = ammo.caliber;
//     row.insertCell().textContent = ammo.tracerColor;
//     row.insertCell().textContent = ammo.projectileCount;
//     row.insertCell().textContent = ammo.accuracy;
//     row.insertCell().textContent = ammo.accuracyModifier;
//     row.insertCell().textContent = ammo.recoil;
//     row.insertCell().textContent = ammo.recoilModifier;
//     row.insertCell().textContent = ammo.initialSpeed;
//     row.insertCell().textContent = ammo.staminaBurnPerDamage;
//   });
// }
