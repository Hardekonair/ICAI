export const calculateStats = (
  transcript,
  duration
) => {

  const words =
    transcript.trim()
    ? transcript.trim().split(/\s+/).length
    : 0;

  const sentences =
    transcript
      .split(/[.!?]+/)
      .filter(Boolean)
      .length;

  const pace =
    duration > 0
      ? Math.round(words/(duration/60))
      : 0;

  return {
    duration,
    wordsSpoken: words,
    sentences,
    pace,
    fillerWords: 0
  };
};