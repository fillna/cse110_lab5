// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  const synth = window.speechSynthesis;
  const voiceSelect = document.querySelector("select");
  let voices = [];
  
  function populateVoiceList() {
    if (typeof synth === "undefined") {
      return;
    }
    voices = synth.getVoices();
  
    for (let i = 0; i < voices.length; i++) {
      const option = document.createElement("option");
      option.textContent = `${voices[i].name} (${voices[i].lang})`;
  
      if (voices[i].default) {
        option.textContent += " — DEFAULT";
      }
  
      option.setAttribute("data-lang", voices[i].lang);
      option.setAttribute("data-name", voices[i].name);
      voiceSelect.appendChild(option);
    }
  }
  
  populateVoiceList();

  if (
    typeof synth !== "undefined" &&
    synth.onvoiceschanged !== undefined
  ) {
    synth.onvoiceschanged = populateVoiceList;
  }

  const button = document.querySelector("button");
  const txtInput = document.getElementById("text-to-speak");
  const img = document.querySelector("img")

  button.addEventListener("click", function(e){
    const utterThis = new SpeechSynthesisUtterance(txtInput.value);
    const selectedOption = voiceSelect.selectedOptions[0].getAttribute("data-name");

    for (let i = 0; i < voices.length; i++) {
      if (voices[i].name === selectedOption) {
        utterThis.voice = voices[i];
      }
    }
    
    synth.speak(utterThis);
    if(synth.speaking){
      img.src = "assets/images/smiling-open.png";
    }

    utterThis.onend = () => {
      img.src = "assets/images/smiling.png";
    };
    
  })
  
}