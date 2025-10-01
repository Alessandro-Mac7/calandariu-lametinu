import dictionaryJson from './dictionary.json';

export interface DictionaryEntry {
  word: string;
  translation: string;
  explanation: string;
}

interface DictionaryJsonData {
  entries: DictionaryEntry[];
}

const jsonData = dictionaryJson as DictionaryJsonData;

export const dictionaryData: DictionaryEntry[] = jsonData.entries;
