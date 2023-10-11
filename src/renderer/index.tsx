import { createRoot } from 'react-dom/client';
import { HomeContainer } from './pages/home/HomeContainer';

import 'antd/dist/antd.css';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<HomeContainer />);
