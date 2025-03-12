export async function getChallenge() {
    try {
      const response = await fetch('/get-challenge');
      const data = await response.json();
      console.log(data);
      // Update the UI with the challenge data
      document.querySelector('h2').textContent = data.name;
      // Add more UI updates as needed
    } catch (error) {
      console.error('Error fetching challenge:', error);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const challengeButton = document.querySelector('.neon-button');
    challengeButton.addEventListener('click', console.log("test"));
  });
  