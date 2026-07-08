import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const socket = io('http://localhost:5000');

function App() {
  const [userId] = useState('user1');
  const [isVolunteer, setIsVolunteer] = useState(false);
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [incomingAlerts, setIncomingAlerts] = useState<any[]>([]);
  const [volunteersComing, setVolunteersComing] = useState<number>(0);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation([latitude, longitude]);
        if (isVolunteer) {
          fetch('http://localhost:5000/api/volunteer/location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, lat: latitude, lng: longitude }),
          });
          socket.emit('register_volunteer', userId);
        }
      },
      (err) => console.error('Location error:', err)
    );
  }, [isVolunteer, userId]);

  const summonSakhis = async () => {
    if (!location) return;
    const res = await fetch('http://localhost:5000/api/summon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, lat: location[0], lng: location[1] }),
    });
    const data = await res.json();
    setVolunteersComing(data.volunteersNotified);
  };

  useEffect(() => {
    socket.on('new_alert', (alert) => {
      setIncomingAlerts((prev) => [...prev, alert]);
    });
    return () => { socket.off('new_alert'); };
  }, []);

  useEffect(() => {
    socket.on(`user_${userId}`, (msg) => {
      alert(`Volunteer ${msg.volunteerId} is on the way!`);
    });
    return () => { socket.off(`user_${userId}`); };
  }, [userId]);

  const acceptAlert = async (alertId: string) => {
    await fetch('http://localhost:5000/api/accept', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ alertId, volunteerId: userId }),
    });
    setIncomingAlerts((prev) => prev.filter((a) => a.alertId !== alertId));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-pink-600">🛡️ Sakhi Ring</h1>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 text-sm rounded-full border border-gray-300 bg-gray-50">
              {isVolunteer ? '🟢 Available as Sakhi' : '👤 User Mode'}
            </span>
            <button
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                isVolunteer ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
              onClick={() => setIsVolunteer(!isVolunteer)}
            >
              {isVolunteer ? 'Switch to User' : 'Become a Sakhi'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">📍 Your Surroundings</h2>
            <div className="h-96">
              {location ? (
                <MapContainer center={location} zoom={16} style={{ height: '100%', width: '100%' }}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={location}>
                    <Popup>You are here</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <p>Fetching location...</p>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">🚨 Emergency</h2>
            <button
              onClick={summonSakhis}
              className="w-full bg-red-600 hover:bg-red-700 text-white text-lg py-3 rounded-lg font-medium disabled:opacity-50"
              disabled={!location}
            >
              Summon Sakhis
            </button>
            {volunteersComing > 0 && (
              <p className="mt-2 text-sm text-green-600">✅ {volunteersComing} Sakhis notified</p>
            )}
            <p className="mt-2 text-sm text-gray-500">
              Instantly alerts up to 5 volunteers within 200m.
            </p>
          </div>
        </div>

        {isVolunteer && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-2">📋 Incoming Alerts</h2>
            {incomingAlerts.length === 0 ? (
              <p className="text-gray-500">No incoming alerts.</p>
            ) : (
              <ul className="divide-y">
                {incomingAlerts.map((alert) => (
                  <li key={alert.alertId} className="py-2 flex justify-between items-center">
                    <span>Alert #{alert.alertId} – {alert.distance.toFixed(0)}m away</span>
                    <button
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                      onClick={() => acceptAlert(alert.alertId)}
                    >
                      Accept
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
