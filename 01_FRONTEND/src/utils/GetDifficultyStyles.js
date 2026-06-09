// utils/getStyles.js
export const getDifficultyStyles = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-600";
    case "Medium":
      return "bg-yellow-100 text-yellow-600";
    case "Hard":
      return "bg-red-100 text-red-600";
    default:
      return "";
  }
};