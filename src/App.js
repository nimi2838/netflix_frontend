import "./App.css";
import TestVideo from "./components/TestVideo";
import First from "./components/First";
import Header from "./components/Header";
import Login from "./components/Login";
import RankingSlide from "./components/RankingSlide";
import Slides from "./components/Slides";
import RegForm from "./components/RegForm";
import KoreanDrama from "./slides/KoreanDrama";
import SlideVideo from "./components/SlideVideo";
import Test from "./slides/Test";
import Modal from "./components/Modal";
import { useState } from "react";
import ChoiceProfile from "./components/ChoiceProfile";
function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="App">

      {/* <button onClick={openModal}>모달팝업</button>
      <Modal open={modalOpen} close={closeModal} header="Modal heading">
      </Modal> */}

      {/* <Header /> */}
<<<<<<< Updated upstream
      {/* <ChoiceProfile /> */}
<<<<<<< HEAD
=======
      <ChoiceProfile />

>>>>>>> Stashed changes
=======


>>>>>>> master
      {/* <First /> */}
      {/* <RegForm /> */}
      {/* <Login /> */}
      {/* <Slides /> */}
      {/* <KoreanDrama /> */}

      {/* <TestVideo /> */}
      {/* <Test /> */}
<<<<<<< HEAD
      {/* <KoreanDrama /> */}
      {/* <RankingSlide openModal={openModal} /> */}
=======
>>>>>>> master

      <KoreanDrama />
      {/* <RankingSlide /> */}
      {/* <SlideVideo /> */}


     
      <SlideVideo /> */}
      {/* <Main /> */}
    </div>
  );
}

export default App;
