interface TextSegment {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

interface RichTextProps {
  content: string | TextSegment[];
  className?: string;
  onSegmentToggle?: (index: number, format: 'bold' | 'italic') => void;
}

export const RichText = ({ content, className = "", onSegmentToggle }: RichTextProps) => {
  // Handle legacy string format
  if (typeof content === 'string') {
    return <span className={className}>{content}</span>;
  }

  // Handle array of segments with formatting
  return (
    <span className={className}>
      {content.map((segment, index) => {
        const classes = [];
        if (segment.bold) classes.push('font-bold');
        if (segment.italic) classes.push('italic');

        // Format text: preserve newlines
        const formattedText = segment.text.split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ));

        return (
          <span
            key={index}
            className={classes.join(' ')}
            onClick={
              onSegmentToggle
                ? (e) => {
                    e.stopPropagation();
                    // Example: toggle italic on single click, bold on double click
                    // You can customize this interaction
                  }
                : undefined
            }
          >
            {formattedText}
          </span>
        );
      })}
    </span>
  );
};

// Utility function to toggle formatting at runtime
export const toggleSegmentFormat = (
  content: TextSegment[],
  index: number,
  format: 'bold' | 'italic'
): TextSegment[] => {
  const newContent = [...content];
  newContent[index] = {
    ...newContent[index],
    [format]: !newContent[index][format],
  };
  return newContent;
};
