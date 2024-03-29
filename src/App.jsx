import Loding from 'components/commons/Loding';
import Detail from 'components/pages/Detail';
import LoginPage from 'components/pages/LoginPage';
import MainPage from 'components/pages/MainPage';
import Mypage from 'components/pages/Mypage';
import SignUpPage from 'components/pages/SignUpPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="..." element={<Loding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
