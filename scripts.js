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
  console.log("Form reset!");
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
    console.log("Form reset!");
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
