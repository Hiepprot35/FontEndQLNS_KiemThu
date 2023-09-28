import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import './App.css';
import Header from "./component/header/header";
import ViewUsers from './component/HomeView/viewUser';
import CreateUser from './component/createUser/createUser';
import ChangeUser from "./component/changeUser/changeuser";
import useToken from "./hook/useToken";
import Login from "./component/login/login";
import DanhGiaNhanVien from "./component/danhgia/DanhGiaNV";
import ThemCaLam from "./component/themcalam/themcalam";
import ThemDonNghi from "./component/donnghi/themdonnghi";
function App() {
  const { Token } = useToken()
  console.log(Token)
  if (Token) {
    if (Token.Role == 1) {

      return (
        <Router>
          <div className="App">

            <Header ></Header>
            <Routes>
              <Route path="/" element={<ViewUsers />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path={`/profile/:userID`} element={<ChangeUser />} />
              <Route path={`/danhgia`} element={<DanhGiaNhanVien />} />

            </Routes>
          </div>
        </Router>
      );
    }
    else {
      return (
        <Router>
          <div className="App">

            <Header ></Header>
            <Routes>
              <Route path="/" element={<ViewUsers />} />
              <Route path="/calamviec" element={<ThemCaLam />} />
              <Route path="/donnghi" element={<ThemDonNghi />} />


            </Routes>
          </div>
        </Router>
      )
    }
  }
  else {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />

        </Routes>
      </Router>
    )
  }
}


export default App;
