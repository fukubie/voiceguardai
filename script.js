// VoiceGuard AI — Voice & sound wave analysis for AI/synthetic detection

const statusDiv = document.getElementById("status");
const confidenceDiv = document.getElementById("confidence");
const transcriptDiv = document.getElementById("transcript");
const scoreBar = document.getElementById("scoreBar");
const listenBtn = document.querySelector("#listenBtn");
const waveformCanvas = document.getElementById("waveform");

let recognition = null;
let isListening = false;
let audioContext = null;
let analyser = null;
let stream = null;
let animationId = null;

// Sound wave consistency tracking (no pauses + stable level = more AI-like)
const amplitudeHistory = [];
const AMPLITUDE_HISTORY_SIZE = 120;
const SILENCE_THRESHOLD = 0.02;
const CONSISTENCY_WINDOW = 30;
let soundWaveAIScore = 0; // 0–100, higher = more synthetic-like
let lastTextAIScore = 0;

// Scam / fraud / AI-voice related keywords (expanded)
const keywords = [
  "urgent", "immediately", "right now", "act now",
  "send money", "wire transfer", "western union", "money gram", "venmo", "zelle", "cash app",
  "gift card", "itunes", "google play", "amazon gift card", "prepaid card",
  "verify your account", "suspended", "locked", "verify identity", "confirm your identity",
  "bank", "bank account", "routing number", "account number", "ssn", "social security",
  "irs", "internal revenue", "tax", "tax refund", "tax return", "tax evasion", "tax fraud", "audit",
  "don't hang up", "stay on the line", "do not disconnect",
  "debt collection", "outstanding debt", "pay now", "collections",
  "credit card", "card number", "cvv", "expiration date", "card expired",
  "loan", "mortgage", "refinance", "approval guaranteed", "no credit check",
  "utility bill", "phone bill", "electric bill", "water bill", "gas bill", "past due", "shut off",
  "insurance", "medicare", "medicaid", "social security", "benefits", "claim",
  "government", "government grant", "government loan", "government assistance", "federal program",
  "investment", "investment opportunity", "crypto", "bitcoin", "returns guaranteed",
  "tech support", "microsoft", "apple", "virus", "remote access", "refund",
  "grandchild", "grandson", "granddaughter", "emergency", "bail", "hospital",
  "prize", "winner", "lottery", "inheritance", "unclaimed", "refund",
  "verify card", "suspicious activity", "fraud alert", "confirm transaction",
  "two factor", "verification code", "one time password", "otp",
  "paypal", "account limited", "restore access", "identity theft",
  "legal action", "warrant", "arrest", "lawsuit", "court", "subpoena",
  "inheritance", "unclaimed funds", "transfer fee", "processing fee", "release fee",
];

function toggleListening() {
  if (isListening) {
    stopListening();
  } else {
    startListening();
  }
}

function startListening() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onresult = (event) => {
    let text = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text += event.results[i][0].transcript;
    }
    transcriptDiv.innerText = text || "Listening...";
    analyzeText(text);
  };

  recognition.onerror = (e) => {
    if (e.error !== "aborted") {
      statusDiv.innerText = "Microphone error — try again";
      statusDiv.className = "status-text status-suspicious";
    }
  };

  recognition.start();
  isListening = true;
  statusDiv.innerText = "Listening...";
  statusDiv.className = "status-text";
  confidenceDiv.textContent = "Analyzing speech & sound wave...";
  listenBtn.classList.add("listening");
  listenBtn.querySelector(".btn-label").textContent = "Stop analysis";

  startAudioAnalysis();
  drawWaveformLoop();
}

function stopListening() {
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  if (stream) {
    stream.getTracks().forEach((t) => t.stop());
    stream = null;
  }
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
  isListening = false;
  listenBtn.classList.remove("listening");
  listenBtn.querySelector(".btn-label").textContent = "Start analysis";
  amplitudeHistory.length = 0;
  soundWaveAIScore = 0;
  confidenceDiv.textContent = "";
}

async function startAudioAnalysis() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.6;
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);
  } catch (e) {
    console.warn("Audio analysis unavailable:", e);
  }
}

function captureAmplitude() {
  if (!analyser) return 0;
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);
  let sum = 0;
  for (let i = 0; i < data.length; i++) sum += data[i];
  return sum / data.length / 255;
}

function updateAmplitudeHistory() {
  const level = captureAmplitude();
  amplitudeHistory.push(level);
  if (amplitudeHistory.length > AMPLITUDE_HISTORY_SIZE) amplitudeHistory.shift();

  if (amplitudeHistory.length < CONSISTENCY_WINDOW) return;

  const recent = amplitudeHistory.slice(-CONSISTENCY_WINDOW);
  const mean = recent.reduce((a, b) => a + b, 0) / recent.length;
  const variance = recent.reduce((acc, v) => acc + (v - mean) ** 2, 0) / recent.length;
  const stdDev = Math.sqrt(variance);

  const silenceFrames = recent.filter((v) => v < SILENCE_THRESHOLD).length;
  const pauseRatio = silenceFrames / recent.length;

  // Very consistent level + almost no pauses → more AI-like
  const consistencyScore = Math.min(100, (1 - Math.min(stdDev * 15, 1)) * 100);
  const noPauseScore = (1 - pauseRatio) * 100;
  soundWaveAIScore = (consistencyScore * 0.5 + noPauseScore * 0.5);
}

function drawWaveform() {
  if (!waveformCanvas || !isListening) return;
  const dpr = window.devicePixelRatio || 1;
  const w = waveformCanvas.offsetWidth;
  const h = waveformCanvas.offsetHeight;
  if (waveformCanvas.width !== w * dpr || waveformCanvas.height !== h * dpr) {
    waveformCanvas.width = w * dpr;
    waveformCanvas.height = h * dpr;
    waveformCanvas.style.width = w + "px";
    waveformCanvas.style.height = h + "px";
  }
  const ctx = waveformCanvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const width = w;
  const height = h;
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, width, height);

  if (amplitudeHistory.length < 2) return;

  ctx.beginPath();
  ctx.strokeStyle = "rgba(59, 130, 246, 0.9)";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  for (let i = 0; i < amplitudeHistory.length; i++) {
    const x = (i / (AMPLITUDE_HISTORY_SIZE - 1)) * width;
    const y = height / 2 - (amplitudeHistory[i] * (height / 2 - 4));
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function drawWaveformLoop() {
  if (!isListening) return;
  updateAmplitudeHistory();
  drawWaveform();
  updateScoreFromSoundOnly();
  animationId = requestAnimationFrame(drawWaveformLoop);
}

function updateScoreFromSoundOnly() {
  const combined = Math.min(100, lastTextAIScore * 0.6 + soundWaveAIScore * 0.4);
  const displayScore = Math.round(combined);
  scoreBar.style.width = displayScore + "%";
  if (amplitudeHistory.length < CONSISTENCY_WINDOW) return;
  if (displayScore >= 70) {
    statusDiv.innerText = "AI / synthetic likely";
    statusDiv.className = "status-text status-danger";
    confidenceDiv.textContent = "High confidence — synthetic patterns detected";
  } else if (displayScore >= 40) {
    statusDiv.innerText = "Suspicious";
    statusDiv.className = "status-text status-suspicious";
    confidenceDiv.textContent = "Medium — review recommended";
  } else {
    statusDiv.innerText = "Likely human";
    statusDiv.className = "status-text status-safe";
    confidenceDiv.textContent = "Low synthetic indicators";
  }
}

function analyzeText(text) {
  const lower = (text || "").toLowerCase();
  let textScore = 0;

  keywords.forEach((word) => {
    if (lower.includes(word)) textScore++;
  });

  if (!lower.includes("um") && !lower.includes("uh") && lower.length > 20) {
    textScore += 1;
  }

  lastTextAIScore = Math.min(100, textScore * 8);
  const combinedAIScore = Math.min(100, lastTextAIScore * 0.6 + soundWaveAIScore * 0.4);
  const displayScore = Math.round(combinedAIScore);

  scoreBar.style.width = displayScore + "%";

  if (displayScore >= 70) {
    statusDiv.innerText = "AI / synthetic likely";
    statusDiv.className = "status-text status-danger";
    confidenceDiv.textContent = "High confidence — synthetic patterns detected";
  } else if (displayScore >= 40) {
    statusDiv.innerText = "Suspicious";
    statusDiv.className = "status-text status-suspicious";
    confidenceDiv.textContent = "Medium — review recommended";
  } else {
    statusDiv.innerText = "Likely human";
    statusDiv.className = "status-text status-safe";
    confidenceDiv.textContent = "Low synthetic indicators";
  }
}
