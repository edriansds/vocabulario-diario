const DEFAULT_STREAK = {
  currentStreak: 0,
  bestStreak: 0,
  totalReveals: 0,
  lastRevealedDateKey: null
};

export function loadStreak(storageKey) {
  try {
    const storedValue = localStorage.getItem(storageKey);

    if (!storedValue) {
      return DEFAULT_STREAK;
    }

    return normalizeStreak(JSON.parse(storedValue));
  } catch {
    return DEFAULT_STREAK;
  }
}

export function saveStreak(storageKey, streak) {
  localStorage.setItem(storageKey, JSON.stringify(normalizeStreak(streak)));
}

export function revealDailyWord(streak, dateKey) {
  const safeStreak = normalizeStreak(streak);

  if (!dateKey || safeStreak.lastRevealedDateKey === dateKey) {
    return safeStreak;
  }

  const previousDateKey = getPreviousDateKey(dateKey);
  const shouldContinueStreak = safeStreak.lastRevealedDateKey === previousDateKey;
  const currentStreak = shouldContinueStreak ? safeStreak.currentStreak + 1 : 1;

  return {
    currentStreak,
    bestStreak: Math.max(safeStreak.bestStreak, currentStreak),
    totalReveals: safeStreak.totalReveals + 1,
    lastRevealedDateKey: dateKey
  };
}

export function hasRevealedDate(streak, dateKey) {
  return normalizeStreak(streak).lastRevealedDateKey === dateKey;
}

function normalizeStreak(value) {
  return {
    currentStreak: toSafeNumber(value?.currentStreak),
    bestStreak: toSafeNumber(value?.bestStreak),
    totalReveals: toSafeNumber(value?.totalReveals),
    lastRevealedDateKey:
      typeof value?.lastRevealedDateKey === "string" ? value.lastRevealedDateKey : null
  };
}

function toSafeNumber(value) {
  return Number.isInteger(value) && value >= 0 ? value : 0;
}

function getPreviousDateKey(dateKey) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() - 1);

  const previousYear = date.getFullYear();
  const previousMonth = String(date.getMonth() + 1).padStart(2, "0");
  const previousDay = String(date.getDate()).padStart(2, "0");

  return `${previousYear}-${previousMonth}-${previousDay}`;
}
