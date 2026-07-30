import { useState } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import PickupForm  from "./components/PickupForm";
import PickupList from "./components/PickupList";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [showSignup, setShowSignup] = useState(false);

  function handleAuth(user, token) {
    setUser(user);
    setToken(token);
  }

  function handleLogout() {
    setUser(null);
    setToken(null);
  }

  if (!user) {
    return(
      <div className="app">
        <header className="app-header">
          <h1>BinTime</h1>
          <p>Schedule and track your waste pickups</p>
        </header>

        <main className='app-main'>
          {showSignup ? (
            <SignupForm onAuth={handleAuth} />
          ) : (
            <LoginForm onAuth={handleAuth} />    
          )}
          <button onClick={() => setShowSignup(!showSignup)}>
            {showSignup ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>BinTime</h1>
        <p>Schedule and track your waste pickups</p>
        <p className="signed-in-as">
          Signed in as: {user.name}
          <button onClick={handleLogout}>Log Out</button>
        </p>
      </header>

      <main className="app-main">
        <PickupForm userId={user.id} />
        <PickupList userId={user.id} />
      </main>
    </div>
  );
}

export default App;