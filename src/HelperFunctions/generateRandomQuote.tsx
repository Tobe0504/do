import { quotes } from "../Utilities/quotes";

export const generateRandomQuote = () => {
  const randomNumber = Math.floor(Math.random() * quotes.length);

  return quotes[randomNumber];
};
