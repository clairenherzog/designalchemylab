import React from 'react';
import { createRoot } from 'react-dom/client';
import DesignAlchemyLab from './designalchemylab.js'; // <- use the actual filename (case-sensitive)

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DesignAlchemyLab />
  </React.StrictMode>
);
  );
}
