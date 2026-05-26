/** Investment packages — synced with panel package selection UI */
export type PackageItem = {
  id: string;
  name: string;
  color: string;
  monthlyReturn: string;
  contractMonths: string;
  amountRange: string;
  dailyCap: string;
  capMultiplier: string;
  featured?: boolean;
};

export const investmentPackages: PackageItem[] = [
  {
    id: 'aghaze',
    name: 'آغازه',
    color: '#2E86AB',
    monthlyReturn: '۳٪',
    contractMonths: '۱۸ ماه',
    amountRange: '۱۰ – ۱۰۰ میلیون تومان',
    dailyCap: '۳۰ میلیون تومان',
    capMultiplier: '۳.۵×',
  },
  {
    id: 'pishgam',
    name: 'پیش‌گام',
    color: '#1F8A70',
    monthlyReturn: '۴٪',
    contractMonths: '۳۶ ماه',
    amountRange: '۱۰۰ – ۵۰۰ میلیون تومان',
    dailyCap: '۶۰ میلیون تومان',
    capMultiplier: '۴×',
  },
  {
    id: 'paydar',
    name: 'پایدار',
    color: '#F6A000',
    monthlyReturn: '۴.۵٪',
    contractMonths: '۳۶ ماه',
    amountRange: '۵۰۰ میلیون – ۱ میلیارد تومان',
    dailyCap: '۱۲۰ میلیون تومان',
    capMultiplier: '۴×',
  },
  {
    id: 'abr',
    name: 'ابر',
    color: '#7B3FE4',
    monthlyReturn: '۵٪',
    contractMonths: '۳۶ ماه',
    amountRange: '۱ – ۵ میلیارد تومان',
    dailyCap: '۲۴۰ میلیون تومان',
    capMultiplier: '۵×',
  },
  {
    id: 'saramad',
    name: 'سرآمد',
    color: '#D63447',
    monthlyReturn: '۶٪',
    contractMonths: '۳۶ ماه',
    amountRange: '۵ – ۱۰۰ میلیارد تومان',
    dailyCap: '۵۰۰ میلیون تومان',
    capMultiplier: '۵×',
    featured: true,
  },
];

export const packageDetailRows = [
  { key: 'amountRange', label: 'بازهٔ مبلغ مجاز' },
  { key: 'monthlyReturn', label: 'بازده ماهانه (تقریبی)' },
  { key: 'dailyCap', label: 'سقف روزانه' },
  { key: 'capMultiplier', label: 'ضریب سقف' },
  { key: 'contractMonths', label: 'مدت قرارداد' },
] as const;
