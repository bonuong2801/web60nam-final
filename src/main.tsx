import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallback={
      <div style={{padding:'2rem',textAlign:'center',fontFamily:'sans-serif'}}>
        <h2 style={{color:'#dc2626'}}>⚠️ Đã xảy ra lỗi khi tải trang</h2>
        <p style={{color:'#64748b'}}>Vui lòng mở DevTools (F12) → Console để xem chi tiết lỗi.</p>
      </div>
    }>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);

