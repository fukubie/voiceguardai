# VoiceGuard AI  
**Know who’s really speaking.**

AI-powered web application that analyzes live speech to estimate whether audio is likely human or AI-generated (synthetic / deepfake).

🔗 **Live Demo:** https://fukubie.github.io/voiceguardai/

---

## Overview

VoiceGuard AI is a browser-based cybersecurity tool built during a hackathon to address the growing risk of voice cloning, impersonation, and AI-generated fraud.

The app performs real-time voice analysis using a combination of speech-pattern signals and audio waveform consistency to produce a probability-style score:

**Human ↔ AI / Synthetic**

All processing runs locally in the browser — no backend or server storage.

---

## How It Works

VoiceGuard AI combines two heuristic detection approaches:

### 1. Speech & Language Signals
- Detects urgency, payment requests, impersonation patterns, and scripted phrasing  
- Considers absence of natural fillers (“um”, “uh”) when sufficient speech is available  
- Flags language commonly used in scams and synthetic scripts  

### 2. Audio Waveform & Consistency Analysis
Using the Web Audio API:
- Measures waveform smoothness and cadence regularity  
- Detects highly consistent rhythm and uninterrupted volume patterns  
- Accounts for natural pauses, pitch variation, and breathing patterns common in human speech  

### Combined Scoring
Text-based and waveform-based signals are blended into a single confidence score with a short status:
- Likely human  
- Suspicious  
- AI / synthetic likely  

This is a heuristic indicator — not a forensic-grade classifier.

---

## Key Features

- 🎙 Real-time microphone analysis  
- 📊 Visual Human ↔ AI score bar  
- 📝 Live transcript using Web Speech API  
- 🔒 Privacy-first: fully client-side processing  
- 📱 Optimized for desktop and iOS Safari (installable web app)  

---

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript  
- **APIs:**  
  - Web Audio API (waveform analysis)  
  - Web Speech API (real-time transcription)  
- **Deployment:** GitHub Pages  
- **Architecture:** Fully client-side (no backend)  

---

## Apple Integration

- Runs natively in Safari (macOS, iOS, iPadOS)  
- Installable via “Add to Home Screen”  
- Uses system font (`-apple-system`) for native UI feel  
- No voice data leaves the device  

---

## Possible Extensions

- Pre-recorded file upload analysis  
- Active phrase articulation verification  
- API integration for call centers and fraud prevention systems  
- ML-based classifier to replace heuristic scoring  

---

## Disclaimer

This project is intended for educational and awareness purposes. Results should be used as an indicator only and verified through trusted channels before making critical decisions.
