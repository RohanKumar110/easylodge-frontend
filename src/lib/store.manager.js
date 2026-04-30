export function getLocalStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to set localStorage item:", e);
  }
}

export function removeLocalStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.error("Failed to remove localStorage item:", e);
  }
}
