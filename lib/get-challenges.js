async function getChallenge() {
  try {
      console.log('Fetching challenge...');
      const response = await fetch('/get-challenge');

      const data = await response.json();
      console.log('Challenge data:', data);

      document.querySelector('.challenge-name').textContent = data.name;
      document.querySelector('.challenge-description').textContent = data.description;

  } catch (error) {
      console.error('Error fetching challenge:', error);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const challengeButton = document.querySelector('.neon-button');
  let clickCount = 0;

  const buttonText = challengeButton.querySelector('.neon-button-text');
  buttonText.textContent = 'Try out!';
  document.querySelector('.challenge-name').textContent = 'Try out here!';
  document.querySelector('.challenge-description').textContent = 'Get some real example challenges';

  async function handleButtonClick() {
      clickCount++;

      
      if (clickCount <= 4) {
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

  
  challengeButton.addEventListener('click', handleButtonClick);
});
