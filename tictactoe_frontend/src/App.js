import React, { useState, useEffect } from "react";
import "./App.css";

// Theme colors based on requirements
const COLORS = {
  primary: "#1976d2",   // Main blue
  accent: "#ffca28",    // Yellow accent
  secondary: "#424242", // Deep grey
};

/**
 * Returns the winner symbol ("X" or "O") or null if no winner
 */
function calculateWinner(squares) {
  // All win scenarios for a 3x3 board
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // horizontal
    [0,3,6], [1,4,7], [2,5,8], // vertical
    [0,4,8], [2,4,6],          // diagonal
  ];
  for (let [a,b,c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  // Game board state: array of 9 squares ("X", "O", or null)
  const [squares, setSquares] = useState(Array(9).fill(null));
  // "X" starts first
  const [xIsNext, setXIsNext] = useState(true);
  // Used to force minimal light theme colors for app background
  useEffect(() => {
    document.body.style.background = "#fff";
    document.body.style.color = COLORS.secondary;
  }, []);

  // Get winner, draw status, and next player
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);
  const currentPlayer = xIsNext ? "X" : "O";
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "Draw!";
  } else {
    status = `Turn: ${currentPlayer}`;
  }

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    // If already filled or game over, ignore click
    if (squares[idx] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[idx] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  // Utility for cell coloring
  const cellColor = (symbol) => {
    if (symbol === "X") return COLORS.primary;
    if (symbol === "O") return COLORS.accent;
    return "transparent";
  };

  return (
    <div className="ttt-app" style={{
      minHeight: "100vh",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Inter, Segoe UI, Arial, sans-serif",
      color: COLORS.secondary,
    }}>
      {/* Player Controls (Restart) */}
      <div style={{ marginBottom: 28, textAlign: "center" }}>
        <button
          type="button"
          onClick={handleRestart}
          style={{
            background: COLORS.primary,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontSize: 16,
            letterSpacing: "0.5px",
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 1px 5px rgba(66,66,66,.04)",
            transition: "background 0.2s",
          }}
        >
          Restart Game
        </button>
      </div>

      {/* Central Game Board */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 64px)",
          gridTemplateRows: "repeat(3, 64px)",
          gap: 0,
          boxShadow: "0 2px 10px 0 rgba(33,150,243,0.08)",
          background: "#f8f9fa",
          borderRadius: 12,
          border: `2px solid ${COLORS.primary}`,
        }}
        aria-label="Tic Tac Toe board"
        role="grid"
      >
        {squares.map((value, idx) => (
          <button
            key={idx}
            className="ttt-cell"
            onClick={() => handleClick(idx)}
            style={{
              width: 64,
              height: 64,
              background: "#fff",
              border: `${idx < 6 ? "1px solid #e0e0e0" : "none"}`,
              borderLeft: idx % 3 !== 0 ? "1px solid #e0e0e0" : "none",
              borderTop: idx > 2 ? "1px solid #e0e0e0" : "none",
              borderRadius: 0,
              fontSize: 32,
              fontWeight: 700,
              color: cellColor(value),
              outline: "none",
              cursor: value || winner ? "not-allowed" : "pointer",
              transition: "background 0.15s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              userSelect: "none",
            }}
            aria-label={`cell ${Math.floor(idx / 3) + 1}-${(idx % 3) + 1}`}
            disabled={!!value || !!winner}
            tabIndex={0}
          >
            {value || ""}
          </button>
        ))}
      </div>

      {/* Game Status / Messages */}
      <div style={{
        marginTop: 28,
        textAlign: "center",
        fontSize: 20,
        fontWeight: 500,
        color: winner
          ? COLORS.primary
          : isDraw
            ? COLORS.secondary
            : COLORS.secondary,
        letterSpacing: "0.5px",
      }}>
        {status}
      </div>
      <div style={{
        marginTop: 5,
        fontSize: 14,
        color: "#888",
        opacity: 0.7,
      }}>
        {(!winner && !isDraw) && (
          <span>
            Player <b style={{ color: currentPlayer === "X" ? COLORS.primary : COLORS.accent }}>
              {currentPlayer}
            </b>'s move
          </span>
        )}
        {(winner || isDraw) && (
          <span>
            Press <span style={{color:COLORS.primary}}>Restart Game</span> to play again.
          </span>
        )}
      </div>
    </div>
  );
}

export default App;
