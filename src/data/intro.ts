import introJson from './intro.json';

export interface TextSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

// Type guard to check if content is array of segments
const isTextSegmentArray = (content: unknown): content is TextSegment[] => {
  return Array.isArray(content);
};

export const introData = {
  title: introJson.title,
  content: isTextSegmentArray(introJson.content)
    ? introJson.content
    : typeof introJson.content === 'string'
      ? introJson.content
      : [],
  titleEn: "Welcome, dear readers!",
  contentEn: "Browsing through the words of one's homeland is good for the spirit, especially because much of our soul is 'dialect', as the dear 20th-century philosopher Benedetto Croce clearly stated."
};
