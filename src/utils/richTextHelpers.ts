import { TextSegment } from "@/data/intro";

/**
 * Toggle bold formatting for a specific segment
 */
export const toggleBold = (
  segments: TextSegment[],
  index: number
): TextSegment[] => {
  if (index < 0 || index >= segments.length) return segments;

  const newSegments = [...segments];
  newSegments[index] = {
    ...newSegments[index],
    bold: !newSegments[index].bold,
  };
  return newSegments;
};

/**
 * Toggle italic formatting for a specific segment
 */
export const toggleItalic = (
  segments: TextSegment[],
  index: number
): TextSegment[] => {
  if (index < 0 || index >= segments.length) return segments;

  const newSegments = [...segments];
  newSegments[index] = {
    ...newSegments[index],
    italic: !newSegments[index].italic,
  };
  return newSegments;
};

/**
 * Set specific formatting for a segment
 */
export const setFormatting = (
  segments: TextSegment[],
  index: number,
  formatting: { bold?: boolean; italic?: boolean }
): TextSegment[] => {
  if (index < 0 || index >= segments.length) return segments;

  const newSegments = [...segments];
  newSegments[index] = {
    ...newSegments[index],
    ...formatting,
  };
  return newSegments;
};

/**
 * Clear all formatting from a segment
 */
export const clearFormatting = (
  segments: TextSegment[],
  index: number
): TextSegment[] => {
  if (index < 0 || index >= segments.length) return segments;

  const newSegments = [...segments];
  newSegments[index] = {
    text: newSegments[index].text,
  };
  return newSegments;
};

/**
 * Update segment text content
 */
export const updateSegmentText = (
  segments: TextSegment[],
  index: number,
  newText: string
): TextSegment[] => {
  if (index < 0 || index >= segments.length) return segments;

  const newSegments = [...segments];
  newSegments[index] = {
    ...newSegments[index],
    text: newText,
  };
  return newSegments;
};

/**
 * Insert a new segment at a specific position
 */
export const insertSegment = (
  segments: TextSegment[],
  index: number,
  segment: TextSegment
): TextSegment[] => {
  const newSegments = [...segments];
  newSegments.splice(index, 0, segment);
  return newSegments;
};

/**
 * Remove a segment at a specific position
 */
export const removeSegment = (
  segments: TextSegment[],
  index: number
): TextSegment[] => {
  if (index < 0 || index >= segments.length) return segments;

  const newSegments = [...segments];
  newSegments.splice(index, 1);
  return newSegments;
};

/**
 * Convert segments back to JSON string for saving
 */
export const segmentsToJSON = (segments: TextSegment[]): string => {
  return JSON.stringify(segments, null, 2);
};

/**
 * Parse JSON string to segments array
 */
export const jsonToSegments = (json: string): TextSegment[] => {
  try {
    const parsed = JSON.parse(json);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};
