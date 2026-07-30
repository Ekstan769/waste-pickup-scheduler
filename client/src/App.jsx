import PickupForm  from "./components/PickupForm";
import PickupList from "./components/PickupList";
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>BinTime</h1>
        <p>Schedule and track your waste pickups</p>
        <p className="signed-in-as">Signed in as: Test User</p>
      </header>

      <main className="app-main">
        <PickupForm />
        <PickupList userId={1} />
      </main>
    </div>
  );
}

export default App;