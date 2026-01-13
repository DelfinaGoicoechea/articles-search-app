import { useRef, useState } from "react";
import "./App.css";

/**
 * 
 * buscador cripto
  * muestra valor de la cripto en una lista despues de buscar
  * maximo 4 elementos en el historial - el ultimo buscado debe estar en el top
  * se busca al presionar enter en el input
  * nth: opcion de borrar
 * 
 */

type CryptoT = {
  name: string;
  price: number;
};

const getCryptoUrl = (symbol: string) => `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${symbol}&to_currency=USD&apikey=GBRFX2MG4CCYF1U2`;


const App = () => {
  const [search, setSearch] = useState<string>("");
  const [cryptos, setCryptos] = useState<CryptoT[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const cache = useRef<Map<string, CryptoT>>(new Map([]));

  const onSearchHandler = (e: React.KeyboardEvent<HTMLInputElement>) => setSearch(e.currentTarget.value);

  const onSearchEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(event.key === "Enter"){
      setSearch("");
      const symbol = event.currentTarget.value;
      if(cache.current.has(symbol)) {
        setCryptos(prev => {
          const cachedCrypto = cache.current.get(symbol)!;
          return [cachedCrypto, ...prev];
        });
        return;
      }

      setLoading(true);
      const url = getCryptoUrl(symbol);
      const response = await fetch(url);
      const data: Record<string, Record<string, string>> = await response.json();

      const hasError: boolean = !!data['Error Message'] || !!data['Information'];
      if(hasError) {
        setLoading(false);
        return;
      };

      const cryptoData: Record<string, string> = data['Realtime Currency Exchange Rate'];
      
      const crypto: CryptoT = {
        name: cryptoData['2. From_Currency Name'],
        price:  Number(cryptoData['5. Exchange Rate']),
      };
      cache.current.set(symbol, crypto);
      setCryptos(prev => {
        const result = [crypto, ...prev];
        if(result.length > 4) result.pop();
        return result;
      });

      setLoading(false);
    }
  };

  return (
    <main className="crypto-app">
      <h1>Buscador de criptomonedas</h1>
      <input type="text" placeholder="Buscar cripto" className="crypto-input" onChange={onSearchHandler} value={search} onKeyDown={onSearchEnter}/>
      {loading && <span><i>Loading...</i></span>}
      <ul className="crypto-list">
        {cryptos.map((crypto) => (
            <li className="crypto-item">
              <span>{crypto.name}</span>
              <span>${crypto.price}</span>
          </li>)
        )}
      </ul>
    </main>
  );
};

export default App;
