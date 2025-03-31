document.addEventListener("DOMContentLoaded", function() {

    
    document.querySelectorAll(".feedback-neon-button").forEach(button => {
        button.addEventListener("click", async function() {

            const feedbackId = this.getAttribute("data-id");

            console.log(feedbackId)

            try {
                const response = await fetch('/feedback/upvote', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: feedbackId })
                });

                const data = await response.json();

                if (data.success) {
                    document.getElementById(`votes-${feedbackId}`).textContent = data.newVotes;
                } else {
                    console.error("Failed to upvote feedback.");
                }
            } catch (error) {
                console.error("Error upvoting:", error);
            }


        });
    });

    document.querySelectorAll(".deleteButton").forEach(button => {
        button.addEventListener("click", async function() {

            const feedbackId = this.getAttribute("data-id");

            console.log(feedbackId)

            try {
                const response = await fetch('/feedback/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: feedbackId })
                });

                const success = await response.json();

                if (success) {
                    window.location.href = '/feedback';
                } else {
                    console.error("Failed to upvote feedback.");
                }
            } catch (error) {
                console.error("Error upvoting:", error);
            }


        });
    });
});
