
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/get_teamkills");
        const teamKillsData = await response.json();

        // Process data for team kills over time
        const teamKillsOverTime = {};
        teamKillsData.forEach(kill => {
            const date = kill[5]; // Assuming 6th column is the date
            teamKillsOverTime[date] = (teamKillsOverTime[date] || 0) + 1;
        });

        // Process data for team kills by player
        const teamKillsByPlayer = {};
        teamKillsData.forEach(kill => {
            const player = kill[0]; // Assuming 1st column is the player
            teamKillsByPlayer[player] = (teamKillsByPlayer[player] || 0) + 1;
        });

        // Process data for team kills by killer
        const teamKillsByKiller = {};
        teamKillsData.forEach(kill => {
            const killer = kill[1]; // Assuming 2nd column is the killer
            teamKillsByKiller[killer] = (teamKillsByKiller[killer] || 0) + 1;
        });

        // Render Bar Chart for Team Kills Over Time
        const ctx1 = document.getElementById("teamKillsOverTimeChart").getContext("2d");
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: Object.keys(teamKillsOverTime),
                datasets: [{
                    label: 'Team Kills',
                    data: Object.values(teamKillsOverTime),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            }
        });

        // Render Pie Chart for Team Kills by Player
        const ctx2 = document.getElementById("teamKillsByPlayerChart").getContext("2d");
        new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: Object.keys(teamKillsByPlayer),
                datasets: [{
                    data: Object.values(teamKillsByPlayer),
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }]
            }
        });

        // Render Pie Chart for Team Kills by Killer
        const ctx3 = document.getElementById("teamKillsByKillerChart").getContext("2d");
        new Chart(ctx3, {
            type: 'pie',
            data: {
                labels: Object.keys(teamKillsByKiller),
                datasets: [{
                    data: Object.values(teamKillsByKiller),
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'],
                    borderWidth: 1
                }]
            }
        });

    } catch (error) {
        console.error("Error fetching and processing data:", error);
    }
});
