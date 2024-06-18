import React, { useState, useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  const [telegramId, setTelegramId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');

  useEffect(() => {
    try {
      // Initialization of Telegram Web App
      const tg = window.Telegram.WebApp;
      tg.ready();
      
      // Extracting initData and parsing
      const initDataUnsafe = tg.initDataUnsafe;

      // Retrieving user's telegram_id
      if (initDataUnsafe && initDataUnsafe.user) {
        setTelegramId(initDataUnsafe.user.id);
        console.log('Telegram ID:', initDataUnsafe.user.id); // Debug message
      } else {
        console.error('Failed to get telegram_id from initData: no user data');
      }
    } catch (error) {
      console.error('Error initializing Telegram Web App:', error);
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setDots(''); // Reset dots to 0
      const interval = setInterval(() => {
        setDots((prevDots) => (prevDots.length < 6 ? prevDots + '.' : ''));
      }, 120); // Change dot count every 120 ms

      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleAuth = async () => {
    if (telegramId) {
      setLoading(true);
      console.log('Sending request with telegram_id:', telegramId); // Debug message
      try {
        const response = await fetch('https://easy-cloths-fail.loca.lt/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            telegram_id: telegramId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Response:', data);

        // Show alert with success message
        alert(`Auth success with token: ${data.access_token}`);

        // Handle response
      } catch (error) {
        console.error('Error during authentication request:', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('Telegram ID is not available');
    }
  };

  return (
    <div className="homepage-container">
      <button className="login-button" onClick={handleAuth} disabled={loading}>
        {loading ? `${dots}` : 'Войти'}
      </button>
    </div>
  );
}

export default HomePage;