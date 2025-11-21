import React from 'react';
import { createRoot } from 'react-dom/client';
import DesignAlchemyLab from './design-alchemy-lab.jsx'; // put your component here

// Optional: simple global styles you can expand
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DesignAlchemyLab />
  </React.StrictMode>
);
