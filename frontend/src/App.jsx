import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);

  const fetchCount = async () => {
    const res = await axios.get('http://localhost:5000/count');
    setCount(res.data.count);
  };

  const updateCount = async (delta) => {
    await axios.post('http://localhost:5000/count', { delta });
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