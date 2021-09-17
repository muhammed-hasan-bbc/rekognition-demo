import {rekognitionClient} from "./rekognitionClient"
import { DetectFacesCommand } from "@aws-sdk/client-rekognition";


const getBoundingBox = (box, imageDom) => {
    return {
        unit: 'px',
        x: box.Left * imageDom.width,
        y: box.Top * imageDom.height,
        width: box.Width * imageDom.width,
        height: box.Height * imageDom.height
    }
  }

const detectFaces = async (imageBytes, imageDom) => {
    // Set the parameters.
    let params = {
      Image: {
        Bytes: imageBytes,
      },
      Attributes: ["ALL"],
    };
    try {
      const data = await rekognitionClient.send(new DetectFacesCommand(params));
      console.log(data)
      return getBoundingBox(data.FaceDetails[0].BoundingBox, imageDom)

    } catch (err) {
      console.log("Error", err);
    }
  };

  const processImage = async (image, imageDom, setFaceLocation) => {
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
        detectFaces(ua, imageDom)
        .then(faceLocation => setFaceLocation(faceLocation));
      };
    })(image);
    reader.readAsDataURL(image);
  };

  export { processImage }