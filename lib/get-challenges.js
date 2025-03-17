
        async function getChallenge() {
          try {
            
            console.log('Fetching challenge...');
            const response = await fetch('/get-challenge');
            const data = await response.json();
            console.log('Challenge data:', data);
            // Update the UI with the challenge data
            document.querySelector('.challenge-name').textContent = data.name;
            document.querySelector('.challenge-description').textContent= data.description
            // Add more UI updates as needed
          } catch (error) {
            console.error('Error fetching challenge:', error);
          }
        }
        
        document.addEventListener('DOMContentLoaded', () => {
          const challengeButton = document.querySelector('.neon-button');
          challengeButton.addEventListener('click', getChallenge);
          console.log('Event listener added');
        });
