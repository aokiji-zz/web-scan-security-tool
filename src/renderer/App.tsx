import { Route, Routes, HashRouter } from 'react-router-dom';
import HomeContainer from './pages/home/HomeContainer';
import Targets from './pages/targets/Targets';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route Component={HomeContainer} path="/" />
        <Route Component={Targets} path="/targets" />
      </Routes>
    </HashRouter>
  );
}
