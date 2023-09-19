// Search function to filter and display data based on the query
function performSearch() {
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  fetchData().then((data) => {
    if (query) {
      // Filter the data based on the query
      const filteredData = data.filter(
        (entry) =>
          entry.name.toLowerCase().includes(query) ||
          entry.killer.toLowerCase().includes(query) ||
          entry.cause_of_death.toLowerCase().includes(query) ||
          entry.map_name.toLowerCase().includes(query) ||
          entry.death_location.toLowerCase().includes(query)
      );
      displayData(groupByPlayer(filteredData));
    } else {
      displayData(groupByPlayer(data));
    }
  });
}

// Fetch function to retrieve data from the server
async function fetchData() {
  try {
    const response = await fetch("/api/get_teamkills?" + new Date().getTime());
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
}

// Attach event listener to the search button once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("searchBtn").addEventListener("click", performSearch);
});
