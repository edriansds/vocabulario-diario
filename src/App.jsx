import { useEffect, useMemo, useState } from "react";
import { words } from "./data/words";
import { getDailyWord, isValidTime } from "./utils/dailyWord";

const DEFAULT_UPDATE_HOUR = "08:00";
const STORAGE_KEY = "vocabulario-diario:update-hour";

export default function App() {
  const [updateHour, setUpdateHour] = useState(() => {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    return isValidTime(storedValue) ? storedValue : DEFAULT_UPDATE_HOUR;
  });

  const [currentTime, setCurrentTime] = useState(() => new Date());

  const dailyWord = useMemo(() => {
    return getDailyWord(words, updateHour, currentTime);
  }, [updateHour, currentTime]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, updateHour);
  }, [updateHour]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 30 * 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  function handleUpdateHourChange(event) {
    const nextValue = event.target.value;

    if (isValidTime(nextValue)) {
      setUpdateHour(nextValue);
    }
  }

  if (!dailyWord) {
    return (
      <main className="page">
        <section className="empty-state">
          <h1>Nenhuma palavra cadastrada</h1>
          <p>Adicione palavras em src/data/words.js para iniciar o vocabulário diário.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Vocabulário diário</p>

        <h1>Aprenda uma palavra nova todos os dias</h1>

        <p className="description">
          Uma palavra em português, com significado, origem e aplicação em uma frase.
        </p>
      </section>

      <section className="settings-card" aria-labelledby="settings-title">
        <div>
          <h2 id="settings-title">Configuração</h2>
          <p>Defina o horário em que a palavra do dia deve mudar.</p>
        </div>

        <label className="time-field" htmlFor="updateHour">
          <span>Horário da nova palavra</span>

          <input
            id="updateHour"
            type="time"
            value={updateHour}
            onChange={handleUpdateHourChange}
          />
        </label>
      </section>

      <section className="word-card" aria-labelledby="daily-word-title">
        <header className="word-header">
          <span>Palavra do dia</span>
          <h2 id="daily-word-title">{dailyWord.word}</h2>
        </header>

        <div className="word-content">
          <article className="word-section">
            <h3>Significado</h3>
            <p>{dailyWord.meaning}</p>
          </article>

          <article className="word-section">
            <h3>Origem</h3>
            <p>{dailyWord.origin}</p>
          </article>

          <article className="word-section">
            <h3>Aplicação em uma frase</h3>
            <p className="example">"{dailyWord.example}"</p>
          </article>
        </div>

        <footer className="word-footer">
          <span>
            Próxima atualização:{" "}
            {dailyWord.nextUpdate.toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short"
            })}
          </span>
        </footer>
      </section>
    </main>
  );
}