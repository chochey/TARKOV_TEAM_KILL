document
  .getElementById("teamKillForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/add_teamkill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      document.getElementById("message").innerText = "Data added successfully!";
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("message").innerText =
        "Failed to add data. Please try again.";
    }
  });
