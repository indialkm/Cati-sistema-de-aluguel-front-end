import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { routesConfig } from './routes/routesConfig.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {routesConfig.map((route, index) => (
          <Route 
            key={index} 
            path={route.path} 
            element={route.element} 
          />
        ))}
      </Routes>
    </AuthProvider>
  );
}

export default App;