import "./App.css";
import 'react-image-crop/dist/ReactCrop.css';
import ImageEditor from "./components/molecules/ImageEditor";

function App() {
  return (
    <div className="App">
      <h1>Test rekognition faces application</h1>
      <ImageEditor/>
    </div>
  );
}

export default App;
