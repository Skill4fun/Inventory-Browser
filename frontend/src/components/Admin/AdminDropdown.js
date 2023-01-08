import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import DropButton from './DropButton';
import dropdownOptions, { title, header, titleIcon } from './dropdownOptions';

export default function AdminDropdown() {
  const [dropdownParams, setDropdownParams] = useState({ icon: titleIcon, header, value: null });
  const location = useLocation();

  const handleDropDownSelect = (event, data) => {
    const { icon, value } = dropdownOptions.find((o) => o.value === data.value);
    setDropdownParams({ icon, header: `Admin - ${value}`, value });
  };

  useEffect(() => {
    if (location.pathname.startsWith('/admin') === false) {
      setDropdownParams({ icon: titleIcon, header, value: null });
    }
  }, [location]);

  return (
    <Dropdown
      icon={null}
      header={dropdownParams.header}
      item
      value={dropdownParams.value}
      options={dropdownOptions}
      selectOnBlur={false}
      onChange={handleDropDownSelect}
      trigger={<DropButton icon={dropdownParams.icon} title={title} />}
    />
  );
}
