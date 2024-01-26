export const skipTrace = (e: unknown) => (typeof e === 'object' && e ? { ...e } : e);
