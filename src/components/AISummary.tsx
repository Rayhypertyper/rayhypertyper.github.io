import { useEffect, useState } from "react";

type OverviewToken = {
  text: string;
  strong: boolean;
  keepTogether?: boolean;
};

const OVERVIEW_TOKENS: readonly OverviewToken[] = [
  { text: "Ray Xu is a ", strong: false },
  { text: "Computer Science", strong: true },
  { text: " student at the ", strong: false },
  { text: "University of Waterloo", strong: true },
  { text: " who builds", strong: false, keepTogether: true },
  { text: " software that solves real problems and makes an impact. He is", strong: false },
  { text: " passionate about ", strong: false, keepTogether: true },
  { text: "AI", strong: true },
  { text: ", ", strong: false },
  { text: "full stack development", strong: true },
  { text: ", and ", strong: false },
  { text: "machine learning", strong: true },
  { text: ".", strong: false },
];

const OVERVIEW_TEXT = OVERVIEW_TOKENS.map((token) => token.text).join("");
const TYPE_INTERVAL_MS = 6; // 2,000 words per minute at five characters per word.

export function AISummary() {
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    if (characterCount >= OVERVIEW_TEXT.length) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCharacterCount((count) => Math.min(count + 1, OVERVIEW_TEXT.length));
    }, TYPE_INTERVAL_MS);

    return () => window.clearTimeout(timeoutId);
  }, [characterCount]);

  let charactersRemaining = characterCount;
  const isTypingComplete = characterCount >= OVERVIEW_TEXT.length;

  return (
    <section className="ai-overview" aria-labelledby="ai-overview-title">
      <div className="ai-overview__glow" aria-hidden="true" />
      <span
        className="ai-overview__sparkle ai-overview__sparkle--large"
        aria-hidden="true"
      >
        ✧
      </span>
      <span
        className="ai-overview__sparkle ai-overview__sparkle--small"
        aria-hidden="true"
      >
        ✧
      </span>
      <span className="ai-overview__arrow" aria-hidden="true" />

      <header className="ai-overview__header">
        <span className="ai-overview__star" aria-hidden="true">
          ✦
        </span>
        <h2 id="ai-overview-title">AI Overview</h2>
      </header>

      <p className="ai-overview__copy" aria-label={OVERVIEW_TEXT}>
        {OVERVIEW_TOKENS.map((token, index) => {
          const visibleText = token.text.slice(0, charactersRemaining);
          charactersRemaining = Math.max(0, charactersRemaining - token.text.length);

          return (
            <span
              key={`${token.text}-${index}`}
              className={token.keepTogether ? "ai-overview__no-break" : undefined}
            >
              {token.strong ? <strong>{visibleText}</strong> : visibleText}
            </span>
          );
        })}
      </p>

      {isTypingComplete && (
        <div
          className="ai-overview__skills ai-overview__skills--revealing"
          aria-label="Areas of focus"
        >
          <span className="ai-overview__skill">
            <img
              className="ai-overview__skill-icon ai-overview__skill-icon--python"
              src="/python-logo.png"
              alt=""
            />
            <span>Python</span>
          </span>

          <span className="ai-overview__skill">
            <img
              className="ai-overview__skill-icon ai-overview__skill-icon--computer-vision"
              src="/computer-vision-icon.png"
              alt=""
            />
            <span>Computer Vision</span>
          </span>

          <span className="ai-overview__skill">
            <img
              className="ai-overview__skill-icon ai-overview__skill-icon--machine-learning"
              src="/machine-learning-icon.png"
              alt=""
            />
            <span>Machine Learning</span>
          </span>
        </div>
      )}
    </section>
  );
}
