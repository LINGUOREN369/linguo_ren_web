-- Feedback table for EdGrantAI recommendation signals
CREATE TABLE IF NOT EXISTS feedback (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  grant_id     TEXT NOT NULL,
  score        REAL,
  bucket       TEXT,
  signal       TEXT NOT NULL,
  session_hash TEXT,
  created_at   TEXT DEFAULT (datetime('now'))
);

CREATE INDEX idx_feedback_grant  ON feedback(grant_id);
CREATE INDEX idx_feedback_signal ON feedback(signal);
