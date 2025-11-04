// script.js - shared for intro/name/quote and used in index
// BGM handling + typing helper + persistence across pages

const BGM_SRC = './bgm.mp3'; // drop your romantic piano file here
const BGM_KEY_TIME = 'bgm_time';
const BGM_KEY_PLAYING = 'bgm_playing';
const BGM_ID = 'bgm-player';

// Create or reuse audio element
function ensureBGM() {
  if (document.getElementById(BGM_ID)) return document.getElementById(BGM_ID);

  // if page already has any <audio>, reuse it
  const existingAudio = document.querySelector('audio');
  if (existingAudio) {
    existingAudio.id = existingAudio.id || BGM_ID;
    existingAudio.loop = true;
    return existingAudio;
  }

  const audio = document.createElement('audio');
  audio.id = BGM_ID;
  audio.src = BGM_SRC;
  audio.loop = true;
  audio.preload = 'auto';
  audio.style.display = 'none';
  document.body.appendChild(audio);
  return audio;
}

const bgm = ensureBGM();

// Try resume
function tryResumeBGM() {
  try {
    const savedTime = parseFloat(localStorage.getItem(BGM_KEY_TIME) || '0');
    const wasPlaying = localStorage.getItem(BGM_KEY_PLAYING) === 'true';

    if (!isNaN(savedTime) && savedTime > 0) {
      bgm.addEventListener('loadedmetadata', function onMeta() {
        try {
          if (bgm.duration && savedTime < bgm.duration) bgm.currentTime = Math.max(0, savedTime - 0.05);
        } catch (e) {}
        bgm.removeEventListener('loadedmetadata', onMeta);
      });
    }

    const interacted = !!sessionStorage.getItem('userInteracted');
    const doPlay = interacted || wasPlaying;

    if (doPlay) {
      const p = bgm.play();
      if (p !== undefined) {
        p.catch(err => {
          // autoplay blocked; will resume on user interaction
          console.log('Autoplay blocked', err);
        });
      }
    }
  } catch (e) {
    console.warn('Failed to resume bgm', e);
  }
}

// persist now (called before navigation)
function persistBGMNow() {
  try {
    localStorage.setItem(BGM_KEY_TIME, bgm.currentTime || 0);
    localStorage.setItem(BGM_KEY_PLAYING, (!bgm.paused).toString());
  } catch (e) {
    console.warn('Could not persist BGM state', e);
  }
}

// Save on unload
window.addEventListener('beforeunload', persistBGMNow);
window.addEventListener('pagehide', persistBGMNow);

// unlock via first click / touch
function unlockPlaybackOnInteraction() {
  if (!bgm) return;
  function once() {
    tryResumeBGM();
    document.body.removeEventListener('click', once);
    document.body.removeEventListener('touchstart', once);
  }
  document.body.addEventListener('click', once);
  document.body.addEventListener('touchstart', once);
}
unlockPlaybackOnInteraction();

// Start resume on load
window.addEventListener('load', function(){
  tryResumeBGM();
});

/* ------------------------------
   Typing text helper used by panda
   Usage: typeText(element, "Hello", speed, callback)
---------------------------------*/
function typeText(el, text, cps = 30, cb) {
  // show typing cursor during typing
  el.classList.add('typing-caret');
  el.textContent = '';
  let i = 0;
  const interval = Math.max(8, Math.floor(1000 / cps));
  const t = setInterval(() => {
    i++;
    // reveal character by character, support emojis and surrogate pairs
    el.textContent = text.slice(0, i);
    if (i >= text.length) {
      clearInterval(t);
      el.classList.remove('typing-caret');
      if (cb) setTimeout(cb, 250);
    }
  }, interval);
  return t;
}

/* small helper used by name page for short panda reply */
function pandaSayNow(text, cps = 36) {
  const speechEls = document.getElementsByClassName('speech-text');
  if (!speechEls || speechEls.length === 0) return Promise.resolve();
  const el = speechEls[0];
  return new Promise(res => typeText(el, text, cps, res));
}
