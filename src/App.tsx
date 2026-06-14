import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import EditMeal from "./containers/EditMeal/EditMeal.tsx";
import Home from "./containers/Home/Home.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import NewMeal from "./containers/NewMeal/NewMeal.tsx";
import './App.css'

const App = () => {

  return (
    <div className="app">
      <Header />

      <main className="content">
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/newmeal" element={<NewMeal />} />
            <Route path="/editmeal" element={<EditMeal />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  )
};

export default App
