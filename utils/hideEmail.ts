export const hiddenEmail = (email: string): string => {
  const atIndex = email.indexOf("@");
  if (atIndex === -1 || atIndex < 3) return email;

  const beforeAt = email.slice(0, atIndex);
  const afterAt = email.slice(atIndex);

  const visibleStart = beforeAt.slice(0, 3);
  const visibleEnd = beforeAt.length > 5 ? beforeAt.slice(-2) : "";

  return `${visibleStart}****${visibleEnd}${afterAt}`;
};
