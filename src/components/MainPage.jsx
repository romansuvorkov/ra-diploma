import React from 'react';
import TopSales from "./TopSales";
import Catalog from "./Catalog";

function MainPage() {
  return (
      <>
        <TopSales />
        <Catalog catalogPage={false}/>
    </>
  );
}

export default MainPage;
