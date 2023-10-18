import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [headline, setHeadline] = useState<string>('')
  const [articles, setArticles] = useState<any[]>([]); // TODO: type: Article[
  const currentTimer = useRef<any>(null);

  useEffect(() => {
    if (currentTimer.current) clearTimeout(currentTimer.current);
    if (!headline) return;
    const timer = setTimeout(() => {
      axios.get('http://127.0.0.1:8000/search', {
        params: {
          q: headline
        }
      })
        .then((res) => {
          setArticles(res.data);
        })
        .catch(err => console.log(err));
    }, 500);
  
    currentTimer.current = timer;
  
    return () => clearTimeout(timer);
  }, [headline]);

  return (
    <>
      <main>
        <form action="">
          <label htmlFor="headline-search">Headline</label>
          <input type="text" name="headline-search" id="headline-search"
            value={headline}
            onChange={e => setHeadline(e.target.value)}
          />
        </form>
        <div className='articles'>
          {articles.map((article, index) => (
            <div className='articles' key={index}>
              <h2>{article.headline}</h2>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default App
