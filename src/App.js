import "./App.css";
import { useState } from "react";
import {rekognitionClient} from "./lib/rekognitionClient"
import { DetectFacesCommand } from "@aws-sdk/client-rekognition";

function App() {
  const [image, setImage] = useState();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let selectedImage = event.target.files[0]
      setImage(URL.createObjectURL(selectedImage));
      processImage(selectedImage)
    }
  };

  const detectFaces = async (imageData) => {
    // Set the parameters.
    let params = {
      Image: {
        Bytes: imageData,
      },
      Attributes: ["ALL"],
    };
    try {
      const data = await rekognitionClient.send(new DetectFacesCommand(params));
      console.log(data)
    } catch (err) {
      console.log("Error", err);
    }
  };

  const processImage = async (image) => {
  
    // Load base64 encoded image.
    let reader = new FileReader();
    reader.onload = (function (theFile) {
      return function (e) {
        let image = null;
        let jpg = true;
        try {
          image = window.atob(e.target.result.split("data:image/jpeg;base64,")[1]);
        } catch (e) {
          jpg = false;
        }
        if (jpg === false) {
          try {
            image = window.atob(e.target.result.split("data:image/png;base64,")[1]);
          } catch (e) {
            alert("Not an image file Rekognition can process");
            return;
          }
        }
        // Unencode image bytes for Rekognition DetectFaces API.
        const length = image.length;
        const imageBytes = new ArrayBuffer(length);
        const ua = new Uint8Array(imageBytes);
        for (let i = 0; i < length; i++) {
          ua[i] = image.charCodeAt(i);
        }
        // Call Rekognition.
        detectFaces(ua);
      };
    })(image);
    reader.readAsDataURL(image);
  };

  return (
    <div className="App">
      <h1>Test rekognition faces application</h1>

      <div>
        {image ? <> 
          <img alt="User selection" id="target" src={image} /> 
        </>: <></>}

      </div>

      <input
        type="file"
        accept="image/*"
        name="file"
        onChange={onImageChange}
      />
    </div>
  );
}

export default App;
