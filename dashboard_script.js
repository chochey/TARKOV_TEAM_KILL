document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/get_teamkills");
    const teamKillsData = await response.json();

    // Process data for What killed you
    const causeOfDeathData = {};
    teamKillsData.forEach((kill) => {
      const cause = kill[2]; // Column C
      causeOfDeathData[cause] = (causeOfDeathData[cause] || 0) + 1;
    });

    // Process data for Map
    const mapData = {};
    teamKillsData.forEach((kill) => {
      const map = kill[3]; // Column D
      mapData[map] = (mapData[map] || 0) + 1;
    });

    // Process data for Location of Death
    const locationData = {};
    teamKillsData.forEach((kill) => {
      const location = kill[4]; // Column E
      locationData[location] = (locationData[location] || 0) + 1;
    });

    // Process data for TEAM KILLS BY KILLER
    const teamKillsByKillerData = {};
    teamKillsData.forEach((kill) => {
      const killer = kill[1]; // Assuming killer name is in Column B
      teamKillsByKillerData[killer] = (teamKillsByKillerData[killer] || 0) + 1;
    });

    // Process data for TEAM KILLS BY PLAYER
    const teamKillsByPlayerData = {};
    teamKillsData.forEach((kill) => {
      const player = kill[0]; // Assuming player name is in Column A
      teamKillsByPlayerData[player] = (teamKillsByPlayerData[player] || 0) + 1;
    });

    // Render bar Chart for What Killed You
    const ctx1 = document.getElementById("causeOfDeathChart").getContext("2d");
    new Chart(ctx1, {
      type: "bar",
      data: {
        labels: Object.keys(causeOfDeathData),
        datasets: [
          {
            data: Object.values(causeOfDeathData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    // Render bar Chart for Map
    const ctx2 = document.getElementById("mapChart").getContext("2d");
    new Chart(ctx2, {
      type: "bar",
      data: {
        labels: Object.keys(mapData),
        datasets: [
          {
            data: Object.values(mapData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    // Render bar Chart for Location of Death
    const ctx3 = document.getElementById("locationChart").getContext("2d");
    new Chart(ctx3, {
      type: "bar",
      data: {
        labels: Object.keys(locationData),
        datasets: [
          {
            data: Object.values(locationData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error fetching and processing data:", error);
  }
});

// Render bar Chart for TEAM KILLS BY PLAYER
const ctx4 = document.getElementById("teamKillsByPlayerChart").getContext("2d");
new Chart(ctx4, {
  type: "bar",
  data: {
    labels: Object.keys(teamKillsByPlayerData),
    datasets: [
      {
        data: Object.values(teamKillsByPlayerData),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  },
});

// Render bar Chart for TEAM KILLS BY KILLER
const ctx5 = document.getElementById("teamKillsByKillerChart").getContext("2d");
new Chart(ctx5, {
  type: "bar",
  data: {
    labels: Object.keys(teamKillsByKillerData),
    datasets: [
      {
        data: Object.values(teamKillsByKillerData),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  },
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/get_teamkills");
    const teamKillsData = await response.json();

    // ... [Your existing data processing code for other charts here]

    // Process data for TEAM KILLS BY KILLER
    const teamKillsByKillerData = {};
    teamKillsData.forEach((kill) => {
      const killer = kill[1]; // Assuming killer name is in Column B
      teamKillsByKillerData[killer] = (teamKillsByKillerData[killer] || 0) + 1;
    });

    // Process data for TEAM KILLS BY PLAYER
    const teamKillsByPlayerData = {};
    teamKillsData.forEach((kill) => {
      const player = kill[0]; // Assuming player name is in Column A
      teamKillsByPlayerData[player] = (teamKillsByPlayerData[player] || 0) + 1;
    });

    // ... [Your existing chart rendering code for other charts here]

    // Render bar Chart for TEAM KILLS BY PLAYER
    const ctx4 = document
      .getElementById("teamKillsByPlayerChart")
      .getContext("2d");
    new Chart(ctx4, {
      type: "bar",
      data: {
        labels: Object.keys(teamKillsByPlayerData),
        datasets: [
          {
            data: Object.values(teamKillsByPlayerData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });

    // Render bar Chart for TEAM KILLS BY KILLER
    const ctx5 = document
      .getElementById("teamKillsByKillerChart")
      .getContext("2d");
    new Chart(ctx5, {
      type: "bar",
      data: {
        labels: Object.keys(teamKillsByKillerData),
        datasets: [
          {
            data: Object.values(teamKillsByKillerData),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  } catch (error) {
    console.error("Error fetching and processing data:", error);
  }
});
