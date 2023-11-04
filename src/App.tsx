import { HashRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import ErrorBoundary from './components/error-boundary/ErrorBoundary';

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export function WrappedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}
