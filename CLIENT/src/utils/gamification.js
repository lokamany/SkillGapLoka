export const calculateLevel = (coins) => {
  if (coins < 100) return "Novice";
  if (coins < 500) return "Architect";
  return "Mastermind";
};

export const canClaimDaily = (lastDate) => {
  const today = new Date().toDateString();
  return lastDate !== today;
};