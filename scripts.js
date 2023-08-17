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

      const result = await response.json();

      if (response.ok) {
        document.getElementById("message").innerText = result.message;
        e.target.reset();
        document.getElementById("teamKillModal").style.display = "none"; // Close the modal
        await fetchDataAndDisplay(); // Refresh displayed data
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("message").innerText = "Error adding data.";
    } finally {
      setTimeout(() => {
        submitButton.disabled = false;
        document.getElementById("message").innerText = "";
      }, 3000);
    }
  });
// ----------------------------------------------------------------------------------------------------------------

document.getElementById("openModalBtn").addEventListener("click", function () {
  document.getElementById("teamKillModal").style.display = "block";
});

document.getElementById("closeModalBtn").addEventListener("click", function () {
  document.getElementById("teamKillModal").style.display = "none";
  document.getElementById("teamKillForm").reset();
});

document.addEventListener("click", function (event) {
  const modal = document.getElementById("teamKillModal");
  if (!modal.contains(event.target)) {
    modal.style.display = "none";
    document.getElementById("teamKillForm").reset();
  }
});

document
  .getElementById("openModalBtn")
  .addEventListener("click", function (event) {
    event.stopPropagation();
    document.getElementById("teamKillModal").style.display = "block";
  });

// Function to fetch the data
async function fetchDataAndDisplay() {
  try {
    const response = await fetch("/api/get_teamkills?" + new Date().getTime());
    const data = await response.json();
    console.log("Data fetched:", data);
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
    acc[name].push({ killedBy, cause, map, location, currentDate });
    return acc;
  }, {});
}

// Function to display the grouped data
function displayData(groupedData) {
  const container = document.getElementById("dataContainer");

  // Clear out old data
  container.innerHTML = "";

  for (const player in groupedData) {
    const playerSection = document.createElement("div");
    playerSection.classList.add("player-section");

    const playerName = document.createElement("h2");
    playerName.innerText = player;
    playerSection.appendChild(playerName);

    groupedData[player].forEach((detail) => {
      const detailElement = document.createElement("p");
      detailElement.innerText = `Killed by ${detail.killedBy} in ${detail.map} to the ${detail.location} by ${detail.cause} on ${detail.currentDate}}`;
      playerSection.appendChild(detailElement);
    });

    container.appendChild(playerSection);
  }
}
// Call the function to fetch and display data on page load
document.addEventListener("DOMContentLoaded", fetchDataAndDisplay);
