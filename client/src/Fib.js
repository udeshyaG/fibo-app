import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  const fetchValues = async () => {
    const vals = await axios.get('/api/values/current');
    setValues({ values: vals.data });
  };

  const fetchIndexes = async () => {
    const indexes = await axios.get('/api/values/all');
    setSeenIndexes(indexes.data);
  };

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const renderSeenIndexes = () => {
    return seenIndexes.map((index) => {
      return <li>{index.number}</li>;
    });
  };

  const renderValues = () => {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated value {values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('/api/values', {
      index: index,
    });

    setIndex('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index</label>
        <input
          type='text'
          value={index}
          onChange={(e) => setIndex(e.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes previously submitted</h3>
      <ul>{renderSeenIndexes()}</ul>

      <h3>Calculated values</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
