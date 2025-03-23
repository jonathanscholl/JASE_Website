      async function getNews() {
            try {
                console.log('Fetching news...');
                const response = await fetch('/get-news');
                const articles = await response.json();
                console.log('News data:', articles);

                // Find the first article with main: true, or default to the first article
                const mainArticle = articles.find(article => article.main) || articles[0];
                
                // Update main article
                document.querySelector('.main-article .news-headline').textContent = mainArticle.headline;
                document.querySelector('.main-article .news-content').textContent = mainArticle.content;
                document.querySelector('.main-article .news-author').textContent = mainArticle.author;
                document.getElementById('main-image').style.backgroundImage = `url('${mainArticle.thumbnail || ''}')`;

                // Get remaining articles
                const sideArticles = articles.filter(article => article !== mainArticle);
                const sideArticlesContainer = document.getElementById('side-articles');
                
                // Clear existing content
                sideArticlesContainer.innerHTML = '';

                // Add side articles
                sideArticles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.className = 'side-article';
                    articleElement.innerHTML = `
                        <div class="article-image" style="background-image: url('${article.thumbnail || ''}')"></div>
                        <div class="article-content">
                            <h3 class="news-headline">${article.headline}</h3>
                            <p class="news-content">${article.content}</p>
                            <p class="news-author">${article.author}</p>
                        </div>
                    `;
                    sideArticlesContainer.appendChild(articleElement);
                });
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        document.addEventListener('DOMContentLoaded', getNews);