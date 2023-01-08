import React from 'react';
import MainLayout from '../layouts/MainLayout';
import ListTable from '../components/ListTable/ListTable';
import Article from '../components/Article/Article';
import BrowserTable from '../components/BrowserTable/BrowserTable';

function Main() {
  return (
    <MainLayout
      data-testid="main-page"
      BrowserTable={BrowserTable}
      ListTable={ListTable}
      Article={Article}
    />
  );
}

export default Main;
