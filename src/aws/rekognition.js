import {rekognitionClient} from "./rekognitionClient"
import { DetectFacesCommand } from "@aws-sdk/client-rekognition";


const getBoundingBox = (box) => ({
    unit: '%',
    x: box.Left * 100,
    y: box.Top * 100,
    width: box.Width * 100,
    height: box.Height * 100
  })

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
      return getBoundingBox(data.FaceDetails[0].BoundingBox)

    } catch (err) {
      console.log("Error", err);
    }
  };

  const processImage = async (image, setFaceLocation) => {
  
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
        detectFaces(ua)
        .then(faceLocation => setFaceLocation(faceLocation));
      };
    })(image);
    reader.readAsDataURL(image);
  };

  export { processImage }