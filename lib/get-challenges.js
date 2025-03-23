async function getChallenge() {
  try {
      console.log('Fetching challenge...');
      const response = await fetch('/get-challenge');

      const data = await response.json();
      console.log('Challenge data:', data);
      // Update the UI with the challenge data
      document.querySelector('.challenge-name').textContent = data.name;
      document.querySelector('.challenge-description').textContent = data.description;
      // Add more UI updates as needed
  } catch (error) {
      console.error('Error fetching challenge:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const challengeButton = document.querySelector('.neon-button');
  let clickCount = 0;

  async function handleButtonClick() {
      clickCount++;
      
      if (clickCount <= 2) {
          await getChallenge();
      } else {
          const buttonText = challengeButton.querySelector('.neon-button-text');
          buttonText.textContent = 'Download';
          document.querySelector('.challenge-name').textContent = 'Want to see more?';
          document.querySelector('.challenge-description').textContent = 'Download "JASE" now and play with your friends!';
          
          challengeButton.removeEventListener('click', handleButtonClick);
          challengeButton.addEventListener('click', () => {
              window.location.href = '/download';
          });
      }
  }

  getChallenge();
  
  challengeButton.addEventListener('click', handleButtonClick);
});
