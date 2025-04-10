import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [promo, setPromo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);  // Added loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true when the form is submitted
    try {
      const res = await fetch(`https://script.google.com/macros/s/AKfycbz44R7SaxOxmo0BfM1xj0IwCBGRNGEWqqnRkTH6Nhd2ESUybLjIrChGEEqnvLD2Y2QN/exec?name=${encodeURIComponent(name)}&address=${encodeURIComponent(address)}`);
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
    } finally {
      setLoading(false);  // Set loading to false once the request is done
    }
  };

  return (
    <div className="app">
      <h1>Mystery Box Promo</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <button type="submit" disabled={loading}>Spin</button>  {/* Disable button when loading */}
      </form>

      {loading && <p>Loading...</p>}  {/* Show loading text while fetching */}
      {promo && <h2>🎉 You won: {promo.promo} (Code: {promo.code})</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
