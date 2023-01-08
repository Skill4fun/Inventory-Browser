import { Link } from 'react-router-dom';

export const title = 'Admin';

export const titleIcon = 'settings';

export const header = 'Admin - Operations';

const dropdownOptions = [
  {
    key: 'promo', icon: 'newspaper outline', text: 'Promo Articles', value: 'promo', as: Link, to: '/admin/promo',
  },
  {
    key: 'lists', icon: 'numbered list', text: 'Product Lists', value: 'lists', as: Link, to: '/admin/lists',
  },
  {
    key: 'products', icon: 'warehouse', text: 'Products', value: 'products', as: Link, to: '/admin/products',
  },
  {
    key: 'quotations', icon: 'euro', text: 'Quotations', value: 'quotations', as: Link, to: '/admin/quotations',
  },
];
export default dropdownOptions;
