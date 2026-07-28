import { useState } from 'react';

function PickupForm() {
    const [userId, setUserId] = useState('');
    const [address, setAddress] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('https://waste-pickup-scheduler-api.onrender.com/pickups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: Number(userId),
                    address,
                    scheduled_date: scheduledDate,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.error || 'Something went wrong');
                return;
            }

            setMessage('Pickup scheduled succesfully!');
            setUserId('');
            setAddress('');
            setScheduledDate('');
        } catch (error) {
            console.error(error);
             setMessage('Could not reach the server');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Schedule a Pickup</h2>
            
            <label>
                User ID:
                <input
                 type="number"
                 value={userId}
                 onChange={(e) => setUserId(e.target.value)}
                 required
                />
            </label>

            <label>
                Address:
                <input
                 type="text"
                 value={address}
                 onChange={(e) => setAddress(e.target.value)}
                 required
                />
            </label>

            <label>
                Scheduled Date:
                <input
                 type="date"
                 value={scheduledDate}
                 onChange={(e) => setScheduledDate(e.target.value)}
                 required
                />
            </label>

            <button type="submit">Schedule Pickup</button>

            {message && <p>{message}</p>}
        </form>
    );
}

export default PickupForm;