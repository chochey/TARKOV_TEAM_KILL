document
  .getElementById("teamKillForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;

    try {
      const response = await fetch("/api/add_teamkill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log(result.message);
      document.getElementById("message").innerText = "Data added successfully!";
      e.target.reset();
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("message").innerText = "Submitted";

      setTimeout(() => {
        document.getElementById("message").innerText = "";
      }, 2500);
    } finally {
      setTimeout(() => {
        submitButton.disabled = false;
      }, 3000);
    }
  });

document.getElementById("openModalBtn").addEventListener("click", function () {
  console.log("Button clicked!");
  document.getElementById("teamKillModal").style.display = "block";
});

document.getElementById("closeModalBtn").addEventListener("click", function () {
  console.log("Close button clicked!");
  document.getElementById("teamKillModal").style.display = "none";
  document.getElementById("teamKillForm").reset();

  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.selectedIndex = 0;
  });
});

document.addEventListener("click", function (event) {
  const modal = document.getElementById("teamKillModal");
  if (!modal.contains(event.target)) {
    modal.style.display = "none";
    document.getElementById("teamKillForm").reset();

    const selects = document.querySelectorAll("select");
    selects.forEach((select) => {
      select.selectedIndex = 0;
    });
  }
});

document
  .getElementById("openModalBtn")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    document.getElementById("teamKillModal").style.display = "block";
  });

// Start of the fetching data from sheets--------------------------------------------------------------

async function fetchDataAndDisplay() {
  try {
    const response = await fetch("/api/get_teamkills");
    const data = await response.json();

    const groupedByPlayer = groupByPlayer(data);
    displayData(groupedByPlayer);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function groupByPlayer(data) {
  return data.reduce((acc, curr) => {
    if (!acc[curr.name]) {
      acc[curr.name] = [];
    }
    acc[curr.name].push(curr);
    return acc;
  }, {});
}

function displayData(groupedData) {
  const container = document.getElementById("dataContainer");

  for (const player in groupedData) {
    const playerSection = document.createElement("div");
    playerSection.classList.add("player-section");

    const playerName = document.createElement("h2");
    playerName.innerText = player;
    playerSection.appendChild(playerName);

    // Add other relevant details for each player using groupedData[player]
    // You can loop through each data point for the player and display it as required
    // ...

    container.appendChild(playerSection);
  }
}

// Call the function to fetch and display data when the document loads
document.addEventListener("DOMContentLoaded", fetchDataAndDisplay);
