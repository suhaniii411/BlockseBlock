"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [mood, setMood] = useState("happy");
  const [quote, setQuote] = useState("");
  const [bgColor, setBgColor] = useState("linear-gradient(135deg,#fddb92,#d1fdff)");
  const [emoji, setEmoji] = useState("😊");

  useEffect(() => {
    switch(mood) {
      case "happy":
  setBgColor("linear-gradient(135deg, #FFD700, #FFB347)"); // brighter yellow-orange
  setEmoji("😊");
  break;

      case "sad":
        setBgColor("linear-gradient(135deg,#89f7fe,#66a6ff)");
        setEmoji("😔");
        break;
      case "motivated":
        setBgColor("linear-gradient(135deg,#43e97b,#38f9d7)");
        setEmoji("💪");
        break;
      case "confident":
        setBgColor("linear-gradient(135deg,#ffafbd,#ffc3a0)");
        setEmoji("😎");
        break;
      default:
        setBgColor("linear-gradient(135deg,#6a11cb,#2575fc)");
        setEmoji("✨");
    }
  }, [mood]);

  const fetchQuote = async () => {
    if (!mood) return alert("Select a mood!");
    setQuote("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ mood })
      });
      const data = await res.json();
      setQuote(data.quote || "No quote returned.");
    } catch (err) {
      console.error(err);
      setQuote("Something went wrong!");
    }
  };

  return (
    <div className={styles.container} style={{background: bgColor}}>
      <div className={styles.card}>
        <h1 className={styles.title}>✨ {emoji} Mood Quote ✨</h1>
        <select
          className={styles.selectBox}
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="happy">😊 Happy</option>
          <option value="sad">😔 Sad</option>
          <option value="motivated">💪 Motivated</option>
          <option value="confident">😎 Confident</option>
        </select>
        <button className={styles.button} onClick={fetchQuote}>
          Get Quote
        </button>
        {quote && <div className={styles.quote}>{emoji} {quote}</div>}
      </div>
    </div>
  );
}
