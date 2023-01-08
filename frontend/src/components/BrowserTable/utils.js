export const brands = [
  { key: 'brand-all', text: 'Összes márka', value: '' },
  { key: 'brand-platinet', text: 'Platinet', value: 'Platinet' },
  { key: 'brand-varr', text: 'Varr', value: 'VARR' },
  { key: 'brand-freestyle', text: 'Freestyle', value: 'Freestyle' },
  { key: 'brand-omega', text: 'Omega', value: 'Omega' },
  { key: 'brand-fiesta', text: 'Fiesta', value: 'Fiesta' },
];

export const minQtys = [
  { key: 'qty-all', text: 'Készlet min. 0+', value: 0 },
  { key: 'qty-1', text: 'Készlet min. 1+', value: 1 },
  { key: 'qty-50', text: 'Készlet min. 50+', value: 50 },
  { key: 'qty-100', text: 'Készlet min. 100+', value: 100 },
  { key: 'qty-200', text: 'Készlet min. 200+', value: 200 },
  { key: 'qty-500', text: 'Készlet min. 500+', value: 500 },
  { key: 'qty-1000', text: 'Készlet min. 1000+', value: 1000 },
  { key: 'qty-5000', text: 'Készlet min. 5000+', value: 5000 },
  { key: 'qty-10000', text: 'Készlet min. 10000+', value: 10000 },
];

export const renderLimits = [
  { key: 'render-12', text: '12 termék/oldal', value: 12 },
  { key: 'render-25', text: '25 termék/oldal', value: 25 },
  { key: 'render-50', text: '50 termék/oldal', value: 50 },
  { key: 'render-100', text: '100 termék/oldal', value: 100 },
  { key: 'render-200', text: '200 termék/oldal', value: 200 },
];

export const filters = {
  renderPageNr: 1,
  renderLimit: 12,
  minQty: 0,
  brand: '',
  srchRegex: '',
  maxPageNr: null,
  filteredProductCount: null,
};

export const translateUnit = (unit) => {
  if (unit === 'szt.') return 'db';
  if (unit === 'SZT.') return 'db';
  if (unit === 'opak.') return 'cs';
  if (unit === 'opak') return 'cs';
  return unit;
};
