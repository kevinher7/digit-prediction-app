import DrawCanvas from "../../components/DrawCanvas";

import "./index.css";

const HomePage = () => {
  return (
    <main className="home-main">
      <h1>Digit Prediction</h1>
      <DrawCanvas />
      <button>Make Prediction</button>
    </main>
  );
};

export default HomePage;
