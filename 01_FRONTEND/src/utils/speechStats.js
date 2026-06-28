const fillerWordsList = [
  "um",
  "uh",
  "like",
  "actually",
  "basically",
  "literally",
  "you know",
  "kind of",
  "sort of",
  "i mean"
];

export function calculateSpeechStats(
  transcript,
  duration
) {

  const cleanTranscript = transcript.trim();

  //-------------------------------------
  // WORDS
  //-------------------------------------

  const words =
    cleanTranscript.length === 0
      ? 0
      : cleanTranscript
          .split(/\s+/)
          .filter(Boolean).length;

  //-------------------------------------
  // SENTENCES
  //-------------------------------------

  const sentences =
    cleanTranscript.length === 0
      ? 0
      : cleanTranscript
          .split(/[.!?]+/)
          .filter(s => s.trim() !== "")
          .length;

  //-------------------------------------
  // PACE
  //-------------------------------------

  const minutes = duration / 60;

  const pace =
    minutes > 0
      ? Math.round(words / minutes)
      : 0;

  //-------------------------------------
  // FILLER WORDS
  //-------------------------------------

  let fillerWords = 0;

  const lower =
    cleanTranscript.toLowerCase();

  fillerWordsList.forEach(word => {

    const regex =
      new RegExp(`\\b${word}\\b`, "g");

    const matches =
      lower.match(regex);

    if(matches){
      fillerWords += matches.length;
    }

  });

  //-------------------------------------
  // FORMAT DURATION
  //-------------------------------------

  const mins =
    Math.floor(duration / 60);

  const secs =
    duration % 60;

  const formattedDuration =
    `${String(mins).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;

  //-------------------------------------

  return {

    duration: formattedDuration,

    words,

    sentences,

    pace,

    fillerWords

  };

}