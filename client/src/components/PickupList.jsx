import { useState, useEffect } from 'react';
import FeedbackForm from './FeedbackForm';

function PickupList({ userId }) {
    const [pickups, setPickups] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchPickups() {
            try {
                const response = await fetch(`http://localhost:3000/pickups/${userId}`);
                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || 'Something went wrong');
                    return;
                }

                setPickups(data);
            } catch (error) {
                console.error(error);
                setError('Could not reach the server');
            }
        }

        fetchPickups();    
    },   [userId]);
    
    async function markCompleted(pickupId) {
            try {
                const response = await fetch(`http://localhost:3000/pickups/${pickupId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ status: 'completed' }),
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.error || 'Something went wrong');
                    return;
                }

                setPickups((prev) =>
                    prev.map((p) => (p.id === pickupId ? data : p))
                );
            } catch (err) {
                console.error(err);
                setError('Could not reach the server');
            }
        }
    
    return (
        <div>
            <h2>Your Pickups</h2>
            {error && <p>{error}</p>}
            <ul>
                {pickups.map((pickup) => (
                    <li key={pickup.id}>
                        {pickup.address} - {new Date(pickup.scheduled_date).toLocaleDateString()} - {pickup.status}
                        {pickup.status === 'pending' && (
                            <button onClick={() => markCompleted(pickup.id)}>
                                Mark Completed
                            </button>
                        )}
                        {pickup.status === 'completed' && (
                            <FeedbackForm pickupId={pickup.id} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PickupList;