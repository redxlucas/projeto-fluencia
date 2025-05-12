import React, { useEffect, useState } from 'react';
import { fetchRandomPhrase } from '../api/phrases';
import PhraseBox from '../components/PhraseBox';
import InputBox from '../components/InputBox';

function Home() {
  const [phrase, setPhrase] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadPhrase = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchRandomPhrase();
      setPhrase(data.phrase || JSON.stringify(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPhrase();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Frase Aleatória</h1>
      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <PhraseBox phrase={phrase} />}

      <InputBox placeholder='Digite aqui...' />

      <button onClick={loadPhrase}>Nova Frase</button>
    </div>
  );
}

export default Home;
