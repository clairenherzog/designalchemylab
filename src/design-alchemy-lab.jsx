import React from 'react';
import { createRoot } from 'react-dom/client';
import DesignAlchemyLab from './design-alchemy-lab.jsx'; // import the component file (match exact name/case)

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DesignAlchemyLab />
  </React.StrictMode>
);
