// frontend/src/App.jsx
import React from 'react';
import PropertyViewer from './components/PropertyViewer';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4 text-xl font-bold">GoldenBear</header>
      <main className="p-6">
        <PropertyViewer />
      </main>
    </div>
  );
}

export default App;