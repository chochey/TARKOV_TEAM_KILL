document
  .getElementById("teamKillForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true; // Disable the button immediately

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
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("message").innerText = "Submitted";

      setTimeout(() => {
        document.getElementById("message").innerText = "";
      }, 2500);
    } finally {
      // Re-enable the button either after the request has been processed or after a certain duration
      setTimeout(() => {
        submitButton.disabled = false;
      }, 3000); // Re-enable after 3 seconds
    }
  });
document.getElementById("openModalBtn").addEventListener("click", function () {
  console.log("Button clicked!");
  document.getElementById("teamKillModal").style.display = "block";
});

document.getElementById("closeModalBtn").addEventListener("click", function () {
  console.log("Close button clicked!");
  document.getElementById("teamKillModal").style.display = "none";
});

document.getElementById("openModalBtn").addEventListener("click", function () {
  document.getElementById("teamKillModal").style.display = "block";
});

const inputFields = document.querySelectorAll("#name, #killer, #cause");

inputFields.forEach((inputField) => {
  inputField.value = "";
});

const form = document.getElementById("teamKillForm");

form.addEventListener("submit", function handleSubmit(event) {
  event.preventDefault();
  form.reset();
});
