export function getDailyWord(words, updateHour = "08:00", now = new Date()) {
  if (!Array.isArray(words) || words.length === 0) {
    return null;
  }

  const safeUpdateHour = isValidTime(updateHour) ? updateHour : "08:00";
  const logicalDate = getLogicalDate(now, safeUpdateHour);
  const dateKey = formatDateKey(logicalDate);
  const numericSeed = createSeedFromText(dateKey);
  const index = numericSeed % words.length;

  return {
    ...words[index],
    dateKey,
    nextUpdate: getNextUpdateDate(now, safeUpdateHour)
  };
}

export function getWordForDate(words, date, updateHour = "08:00") {
  if (!Array.isArray(words) || words.length === 0) {
    return null;
  }

  const safeUpdateHour = isValidTime(updateHour) ? updateHour : "08:00";
  const logicalDate = getLogicalDate(date, safeUpdateHour);
  const dateKey = formatDateKey(logicalDate);
  const numericSeed = createSeedFromText(dateKey);
  const index = numericSeed % words.length;

  return {
    ...words[index],
    dateKey
  };
}

export function getWordHistory(words, updateHour = "08:00", now = new Date()) {
  if (!Array.isArray(words) || words.length === 0) {
    return [];
  }

  const safeUpdateHour = isValidTime(updateHour) ? updateHour : "08:00";
  const logicalCurrentDate = getLogicalDate(now, safeUpdateHour);
  
  // Calculate the first logical date (going back through all available words)
  // We'll generate history for a reasonable range (e.g., last 365 days)
  const history = [];
  const daysBack = 365;
  
  for (let i = 0; i < daysBack; i++) {
    const historyDate = new Date(logicalCurrentDate);
    historyDate.setDate(historyDate.getDate() - i);
    
    const wordEntry = getWordForDate(words, historyDate, safeUpdateHour);
    if (wordEntry) {
      history.push(wordEntry);
    }
  }
  
  return history;
}

export function isValidTime(value) {
  return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getLogicalDate(now, updateHour) {
  const [hour, minute] = updateHour.split(":").map(Number);

  const updateMomentToday = new Date(now);
  updateMomentToday.setHours(hour, minute, 0, 0);

  const logicalDate = new Date(now);

  if (now < updateMomentToday) {
    logicalDate.setDate(logicalDate.getDate() - 1);
  }

  return logicalDate;
}

function getNextUpdateDate(now, updateHour) {
  const [hour, minute] = updateHour.split(":").map(Number);

  const nextUpdate = new Date(now);
  nextUpdate.setHours(hour, minute, 0, 0);

  if (nextUpdate <= now) {
    nextUpdate.setDate(nextUpdate.getDate() + 1);
  }

  return nextUpdate;
}

function createSeedFromText(value) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}
