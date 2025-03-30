      async function getFeeback() {
            try {
                console.log('Fetching feedback...');
                const response = await fetch('/get-feedback');
                const feedback_data = await response.json();
                console.log('Feedback data:', feedback_data);


                console.log(feedback_data[0].message)

   
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        document.addEventListener('DOMContentLoaded', getFeeback);