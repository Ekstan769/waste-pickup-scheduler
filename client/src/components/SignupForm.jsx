import { useState } from 'react';

function SignupForm({ onAuth }) {
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');

   async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    try {
        const response = await fetch('https://waste-pickup-scheduler-api.onrender.com/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            setMessage(data.error || 'Something went wrong');
            return;
        }

        onAuth(data.user, data.token);
    } catch (error) {
        console.error(error);
        setMessage('Could not reach the server');
    }
   }

   return (
    <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label>
            Name:
            <input id="signup-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
            Email:
            <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
            Password:
            <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Sign Up</button>
        {message && <p>{message}</p>}
    </form>
   );
}

export default SignupForm;
