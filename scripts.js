document
  .getElementById("teamKillForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const causeOfDeath = document.querySelector("[name='causeOfDeath']").value;
    data.cause_of_death = causeOfDeath;
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
    console.log("Received data:", data);
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
    const [name, killedBy, cause, map, location, date] = curr;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push({ killedBy, cause, map, location, date });
    acc[name].sort((a, b) => new Date(b.date) - new Date(a.date));
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

    const playerName = document.createElement("h3");
    playerName.innerText = player + "'s" + " Deaths";
    playerSection.appendChild(playerName);

    // Reverse the order of the data for the player
    const reversedData = [...groupedData[player]].reverse();

    let entryNumber = reversedData.length; // Start numbering from the length of the array

    reversedData.forEach((detail) => {
      const detailElement = document.createElement("p");
      detailElement.innerText = `${entryNumber}: ${detail.killedBy}  |  ${detail.map}  |  ${detail.location}  |  ${detail.cause}  |  ${detail.date}`;
      playerSection.appendChild(detailElement);
      entryNumber--; // Decrement the entry number for the next iteration
    });

    container.appendChild(playerSection);
  }
}

// Call the function to fetch and display data on page load

document.addEventListener("DOMContentLoaded", function () {
  fetchDataAndDisplay();

  // Replace "Cause of Death" input with the ammo dropdown
  const causeInput = document.getElementById("cause");
  const ammoDropdown = createAmmoDropdown();
  causeInput.replaceWith(ammoDropdown);
});
