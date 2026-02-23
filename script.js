//Speech Recognition
const statusDiv = document.getElementById("status");
const transcriptDiv = document.getElementById("transcript");

let recognition;

function startListening() {
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
        let text = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
        }

        transcriptDiv.innerText = text;
        analyze(text);
    };

    recognition.start();
    statusDiv.innerText = "🟢 Listening...";
}

//Scam Detection
function analyze(text) {
    const lower = text.toLowerCase();

    let score = 0;

    const keywords = [
        "urgent",
        "send money",
        "wire transfer",
        "gift card",
        "verify your account",
        "bank",
        "irs",
        "don't hang up"
    ];

    keywords.forEach(word => {
        if (lower.includes(word)) score++;
    });

    // fake "AI voice signals"
    if (!lower.includes("um") && !lower.includes("uh")) {
        score++;
    }

    if (score >= 4) {
        statusDiv.innerText = "🔴 AI SCAM DETECTED";
        statusDiv.style.color = "red";
    } else if (score >= 2) {
        statusDiv.innerText = "🟡 Suspicious";
        statusDiv.style.color = "orange";
    } else {
        statusDiv.innerText = "🟢 Safe";
        statusDiv.style.color = "green";
    }
}