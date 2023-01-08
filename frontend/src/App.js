import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Quotation from './pages/Quotation';
import Navbar from './helper/components/Navbar';
import Wrapper from './helper/components/Wrapper';
import NotFound from './helper/components/NotFound';
import EmailVerification from './pages/EmailVerification';

export default function App() {
  return (
    <>
      <Navbar />
      <Wrapper marginTopVh={3} minHeightVh={90} mobile={15} tablet={15} computer={12}>
        <Routes>
          <Route path="*" element={<NotFound redirectTo="/" />} />
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/products" element={<Main />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/email-verification/:userId" element={<EmailVerification />} />
        </Routes>
      </Wrapper>
    </>
  );
}
