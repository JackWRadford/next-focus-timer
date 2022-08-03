const toMinSec = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - mins * 60;

  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export default toMinSec;
