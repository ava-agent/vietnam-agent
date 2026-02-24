export function formatVND(amount: number, showSymbol = true): string {
  if (amount === 0) {
    return showSymbol ? '0 ₫' : '0';
  }
  const formatted = amount.toLocaleString('en-US');
  return showSymbol ? formatted + ' ₫' : formatted;
}

export function formatCNY(amount: number): string {
  if (amount === 0) {
    return '¥0';
  }
  return '¥' + amount.toLocaleString('en-US');
}
