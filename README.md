# VoiceGuard AI

**Know who's really speaking.**

VoiceGuard AI is an AI-powered voice detection app that analyzes live speech or audio to help determine whether the voice is from a **real human** or **synthetically generated** (e.g., AI clones, deepfakes). It is designed for the **Cybersecurity** challenge and addresses the growing risk of voice fraud, impersonation, and AI-generated deception.

---

## Live Demo

https://fukubie.github.io/voiceguardai/

---

## The Problem

With the rise of AI-generated voices and deepfake technology, it is increasingly hard to tell real human speech from synthetic audio. Tools from companies like OpenAI and ElevenLabs can clone voices with high realism from short samples, leading to:

- **Voice fraud and financial scams**
- **Fake emergency calls and impersonation**
- **Misinformation and political manipulation**
- **Academic and professional integrity issues**
- **Identity theft using cloned voices**

As voice cloning becomes more accessible, individuals and organizations are more vulnerable to deception.

---

## Target Users

- **Individual consumers**  
  - Older adults and seniors (40+) who may be less familiar with AI  
  - Retirees managing savings, pensions, or retirement funds  
  - People who are frequent targets of IRS, tech-support, or impersonation scams  
  - High school and college students (13–30) managing aid, tuition, and digital accounts  
  - Young adults new to online banking and digital transactions  

- **Businesses and institutions**  
  - Banks and financial institutions  
  - Law enforcement  
  - Media and news organizations  
  - Universities, call centers, and enterprises  

---

## What the App Does

VoiceGuard AI combines **speech analysis** and **sound wave pattern analysis** to give a simple, real-time indication of whether the voice is likely human or synthetic.

### Core behavior

1. **Live analysis**  
   - Uses the microphone to capture speech in real time.  
   - Shows a **probability-style score** (Human ↔ AI / Synthetic) and a short **confidence** message (e.g., “Likely human”, “Suspicious”, “AI / synthetic likely”).

2. **Speech (keyword) analysis**  
   - Looks at the **transcript** for language often used in scams or synthetic-sounding scripts (e.g., urgency, payments, verification, impersonation, tech support, legal threats).  
   - Factors in the absence of natural human fillers (e.g., “um”, “uh”) when there is enough speech, which can be a weak signal of non-human or scripted speech.

3. **Sound wave and consistency analysis**  
   - Analyzes the **audio waveform** in real time.  
   - **Consistent volume and rhythm with almost no pauses** are treated as more synthetic-like (e.g., TTS or cloned voice).  
   - **Natural variation and pauses** are treated as more human-like.  
   - The more **consistent and uninterrupted** the sound wave, the **higher** the “AI / synthetic” side of the score.

4. **Combined score**  
   - The final score blends **text-based signals** and **sound-wave consistency**.  
   - You see one bar (Human ↔ AI / Synthetic) and a short status so you can quickly decide whether to trust the voice or be cautious.

### Why sound wave consistency matters

- **Human speech** usually has:  
  - Variable timing and rhythm  
  - Small pitch and volume changes  
  - Natural breaths and short pauses  

- **AI-generated speech** often has:  
  - Very smooth, even waveforms  
  - Very regular cadence  
  - Few or no natural pauses  

The app uses this idea to push the score toward “AI / synthetic” when the sound is **very consistent and continuous**, and toward “Human” when there is more variation and pauses.

---

## How to Use

1. Open the app in a modern browser (Chrome, Edge, Safari recommended; microphone access required).  
2. Click **“Start analysis”** and allow microphone access.  
3. Speak naturally or play the audio you want to check (e.g., from a call or recording).  
4. Watch the **score bar** (Human ↔ AI / Synthetic), the **status** (e.g., “Likely human”, “Suspicious”, “AI / synthetic likely”), and the **live transcript**.  
5. Use the result as a **hint**, not a final verdict—when in doubt, verify through another channel (e.g., call back on a known number, use official apps or websites).

---

## Apple Integration

VoiceGuard AI is built to work seamlessly for **Apple users** on iPhone, iPad, and Mac:

- **Safari & Web App experience** — The app runs in Safari with full microphone support and is configured as an installable web app (Add to Home Screen on iOS). You get a native-like experience without downloading from the App Store.
- **System-native look** — The UI uses Apple’s system font (`-apple-system`) so it feels at home on macOS and iOS.
- **Privacy and convenience** — Analysis runs in the browser; no voice data is sent to our servers. Apple users can check calls or recordings quickly from any device with Safari, with the same privacy expectations they’re used to in the Apple ecosystem.

---

## Solution Summary

VoiceGuard AI aims to **restore trust in digital communication** by giving users a simple, fast check on whether the voice they hear might be synthetic. It combines:

- **Keyword and speech-pattern analysis** (scam/impersonation language, lack of fillers)  
- **Sound wave and consistency analysis** (smooth, uninterrupted speech → higher synthetic score)  
- **Real-time feedback** with a clear Human ↔ AI score and confidence message  

*“Know who’s really speaking.”*

---

## Tech Stack

- **Front-end:** HTML5, CSS3 (glassmorphism-style UI), vanilla JavaScript  
- **APIs:** Web Speech API (speech recognition), Web Audio API (microphone, analyser for waveform and consistency)  
- **Runs in:** Modern browsers; no backend required for the current demo  

---

## Possible Extensions (not in this repo)

- **Active phrase verification:** e.g., “Say: Peter Piper picked a peck of pickled peppers” to test natural articulation.  
- **File upload:** Analyze pre-recorded voice notes or suspicious clips.  
- **Enterprise / API:** Integration with call centers, banks, or law enforcement systems for fraud prevention and verification.

---

## License and Disclaimer

This project is for **educational and awareness** purposes. The score is a **heuristic indicator**, not a certified forensic tool. Do not rely on it alone for legal, financial, or safety decisions—always confirm critical matters through trusted channels.
