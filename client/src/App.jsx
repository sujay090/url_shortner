import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import { useState, useEffect } from 'react';
import { getCurrentUserApi } from './apis/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUserApi()
      .then((fetchedUser) => {
        setUser(fetchedUser);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
        <Route path="/profile" element={<ProfilePage user={user} setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
