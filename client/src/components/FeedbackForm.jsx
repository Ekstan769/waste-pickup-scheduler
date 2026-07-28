import { useState } from "react";

function FeedbackForm({ pickupId }) {
    const [rating, setRating] = useState('');
    const [comment, setComment] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch(`https://waste-pickup-scheduler-api.onrender.com/pickups/${pickupId}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating: Number(rating), comment }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.error || 'Something went wrong');
                return;
            }

            setMessage('Feedback submitted!');
            setRating('');
            setComment('');
        } catch (error) {
            console.error(error);
            setMessage('Could not reach the server');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Leave Feedback for Pickup #{pickupId}</h3>
            <label>
                Rating (1-5):
                <input
                 id={`rating-${pickupId}`}
                 type="number"
                 min="1"
                 max="5"
                 value={rating}
                 onChange={(e) => setRating(e.target.value)}
                 required
                />
            </label>
            <label>
                Comment:
                <input
                 id={`comment-${pickupId}`}
                 type="text" 
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
                />
            </label>
            <button type="submit">Submit Feedback</button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default FeedbackForm;