import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);

  console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);

  const fetchCount = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://15.165.160.116:5000';
    console.log('Fetching from:', apiUrl);
    const res = await axios.get(`${apiUrl}/count`);
    setCount(res.data.count);
  };

  const updateCount = async (delta) => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://15.165.160.116:5000';
    await axios.post(`${apiUrl}/count`, { delta });
    fetchCount();
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => updateCount(1)}>+1</button>
      <button onClick={() => updateCount(5)}>+5</button>
    </div>
  );
}

export default App;