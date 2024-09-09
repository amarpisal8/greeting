const apiUrl = "https://crudcrud.com/api/641a0ce5dd9d4599b46bf7b7fc82a548/lettersss";

// Function to fetch the latest greeting data and display it
async function fetchGreeting() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.length > 0) {
      const latestGreeting = data[data.length - 1];  // Get the last added greeting
      document.getElementById('toName').innerText = latestGreeting.to;
      document.getElementById('firstPara').innerText = latestGreeting.firstPara;
      document.getElementById('greet').innerText = latestGreeting.greet;
      document.getElementById('secPara').innerText = latestGreeting.secPara;
    }
  } catch (error) {
    console.error("Error fetching greeting:", error);
  }
}

// Function to handle form submission
document.getElementById('greetingForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const toName = document.getElementById('to').value;
  const firstPara = document.getElementById('firstParaInput').value;
  const greet = document.getElementById('greetInput').value;
  const secPara = document.getElementById('secParaInput').value;

  const newGreeting = {
    to: toName,
    firstPara: firstPara,
    greet: greet,
    secPara: secPara,
  };

  try {
    // Post the new greeting to the API
    await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGreeting)
    });

    // Update the greeting card with the new data
    fetchGreeting();
  } catch (error) {
    console.error("Error posting greeting:", error);
  }

  // Clear the form
  document.getElementById('greetingForm').reset();
});

// Fetch and display the latest greeting on page load
fetchGreeting();
