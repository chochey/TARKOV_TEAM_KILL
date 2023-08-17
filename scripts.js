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
    const response = await fetch("/api/add_teamkill");
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

async function fetchDataAndDisplay() {
  try {
    const response = await fetch("/api/add_teamkill"); // Adjust the endpoint if you set a different one
    const data = await response.json();

    const groupedByPlayer = groupByPlayer(data);
    displayData(groupedByPlayer);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// Function to group data by player names
function groupByPlayer(data) {
  return data.reduce((acc, curr) => {
    const [name, killedBy, cause, map, location] = curr;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push({ killedBy, cause, map, location });
    return acc;
  }, {});
}

// Function to display the grouped data
function displayData(groupedData) {
  const container = document.getElementById("dataContainer"); // Assuming you have a container to display data

  for (const player in groupedData) {
    const playerSection = document.createElement("div");
    playerSection.classList.add("player-section");

    const playerName = document.createElement("h2");
    playerName.innerText = player;
    playerSection.appendChild(playerName);

    // Render the details for each player
    groupedData[player].forEach((detail) => {
      const detailElement = document.createElement("p");
      detailElement.innerText = `${detail.killedBy} killed in ${detail.map} at ${detail.location} by ${detail.cause}`;
      playerSection.appendChild(detailElement);
    });

    container.appendChild(playerSection);
  }
}

// Call the function to fetch and display data
fetchDataAndDisplay();

async function fetchDataFromBackend() {
  try {
    const response = await fetch("/api/add_teamkill");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch data from backend:", error);
    return [];
  }
}

async function fetchDataAndDisplay() {
  try {
    const data = await fetchDataFromBackend();

    const groupedByPlayer = groupByPlayer(data);
    displayData(groupedByPlayer);
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

// ... Your existing code ...

// Fetch and display data
async function displaySheetData() {
  try {
    const response = await fetch("/api/add_teamkill"); // Replace with your backend endpoint
    const data = await response.json();

    // Group data by player names
    const groupedByPlayer = data.reduce((acc, curr) => {
      if (!acc[curr[0]]) {
        // Assuming name is the first column
        acc[curr[0]] = [];
      }
      acc[curr[0]].push(curr);
      return acc;
    }, {});

    // Display data
    const container = document.getElementById("dataContainer");
    for (const playerName in groupedByPlayer) {
      const playerSection = document.createElement("div");
      playerSection.classList.add("player-section");

      const header = document.createElement("h3");
      header.textContent = playerName;
      playerSection.appendChild(header);

      const list = document.createElement("ul");
      groupedByPlayer[playerName].forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item[1]} killed by ${item[2]} due to ${item[3]} on ${item[4]} map at ${item[5]}`;
        list.appendChild(listItem);
      });
      playerSection.appendChild(list);

      container.appendChild(playerSection);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call the function to display data on page load
displaySheetData();
