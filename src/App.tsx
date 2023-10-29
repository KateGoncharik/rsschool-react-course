import { Component } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export class App extends Component<unknown, unknown> {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}

export class WrappedApp extends Component<unknown, unknown> {
  render() {
    return (
      <HashRouter>
        <App />
      </HashRouter>
    );
  }
}
