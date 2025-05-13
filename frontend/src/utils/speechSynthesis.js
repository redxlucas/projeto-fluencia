export function speakText(text, options={}) {
    if(!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = options.lang || 'en-US';
    utterance.rate = options.rate || 1;
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}