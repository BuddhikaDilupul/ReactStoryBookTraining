import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Layout from './static-components/navbar/Layout';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
