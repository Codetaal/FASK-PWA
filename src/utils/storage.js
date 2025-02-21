export const getStoredValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
        try {
            return JSON.parse(storedValue);
        } catch (error) {
            console.warn(`Error parsing localStorage key "${key}":`, error);
            return defaultValue;
        }
    }
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
};
