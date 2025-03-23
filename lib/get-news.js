async function getNews() {
    try {
        console.log('Fetching news...');
        const response = await fetch('/get-news');
  
        const data = await response.json();
        console.log('News data:', data);
        // Update the UI with the challenge data
         document.querySelector('.news-headline').textContent = data.headline;
        document.querySelector('.news-content').textContent = data.content;
        document.querySelector('.news-author').textContent = data.author;
        // Add more UI updates as needed
    } catch (error) {
        console.error('Error fetching news:', error);
    }
  }


  document.addEventListener('DOMContentLoaded', () => {

  
    getNews();
    

  });
  