
const LS_CODE_KEY = 'LAST_CODE_INPUT';

export const getStoredCode = () => localStorage.getItem(LS_CODE_KEY) || '';

export const setLsCode = (source: string) => localStorage.setItem(LS_CODE_KEY, source);
