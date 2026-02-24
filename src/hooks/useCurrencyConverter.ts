import {useState, useMemo} from 'react';

export function useCurrencyConverter(rate: number) {
  const [cnyAmount, setCnyAmount] = useState<string>('');

  const vndAmount = useMemo(() => {
    const num = parseFloat(cnyAmount);
    if (isNaN(num) || num <= 0) {
      return 0;
    }
    return Math.round(num * rate);
  }, [cnyAmount, rate]);

  const setQuickAmount = (amount: number) => {
    setCnyAmount(amount.toString());
  };

  return {cnyAmount, setCnyAmount, vndAmount, setQuickAmount};
}
