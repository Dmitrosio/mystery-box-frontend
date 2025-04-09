import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [promo, setPromo] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://mystery-box-promo.vercel.app/api?name=${encodeURIComponent(name)}&address=${encodeURIComponent(address)}`);
      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setPromo(null);
      } else {
        setPromo(data.promo);
        setError(null);
      }
    } catch (err) {
      setError('Something went wrong');
      setPromo(null);
    }
  };

  return (
    <div className="app">
      <h1>Mystery Box Promo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <button type="submit">Spin</button>
      </form>

      {promo && <h2>🎉 You won: {promo.promo} (Code: {promo.code})</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
