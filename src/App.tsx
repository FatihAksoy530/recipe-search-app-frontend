import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [headline, setHeadline] = useState<string>('')
  const [articles, setArticles] = useState<any[]>([]); // TODO: type: Article[
  const currentTimer = useRef<any>(null);


  useEffect(() => {
    if (currentTimer.current) clearTimeout(currentTimer.current);
    if (!headline) {
      setArticles([]);
      return;
    }
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
          <div id='search-container'>
            <form id='search-form' action="">
              <label htmlFor="headline-search" className='visually-hidden'>Headline</label>
              <input type="text" name="headline-search" id="headline-search"
                value={headline}
                onChange={e => setHeadline(e.target.value)}
              />
            </form>
            {articles.length > 0 && (
                <div className='headline-hits'>
                  {articles.map((article, index) => (
                    <div className='hit' key={index}>
                      <p>{article.headline}</p>
                    </div>
                  ))}
                </div>
            )}
          </div>
        </main>
      </>
  )
}

export default App
