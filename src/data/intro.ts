import introJson from './intro.json';

// Decode HTML entities and format text
const decodeAndFormatText = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  const decoded = textarea.value;
  
  // Replace \n with actual line breaks and handle other formatting
  return decoded
    .replace(/\\n/g, '\n')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
};

export const introData = {
  title: introJson.title,
  content: decodeAndFormatText(introJson.content),
  titleEn: "Welcome, dear readers!",
  contentEn: "Browsing through the words of one's homeland is good for the spirit, especially because much of our soul is 'dialect', as the dear 20th-century philosopher Benedetto Croce clearly stated."
};
