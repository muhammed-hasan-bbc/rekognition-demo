import {useState} from "react";
import ReactCrop from "react-image-crop"
import {processImage} from '../../aws/rekognition'
import FileSelect from "../atoms/FileSelect";
import FilterEditor from "./FilterEditor";

const ImageEditor = () => {
    const [image, setImage] = useState();
    const [cropProps, setCropProps] = useState();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let selectedImage = event.target.files[0]
            setImage(URL.createObjectURL(selectedImage));
            processImage(selectedImage, setCropProps)
        }
    };

    const renderCrop = () => {
        return <ReactCrop
            ruleOfThirds={true}
            onChange={crop => {
                setCropProps(crop)
            }}
            keepSelection={true}
            src={image} 
            crop={cropProps}
        />
    }

    const render = () => {
        return <> 
            {renderCrop()}
        </>
    }

    return <div>
        {image ? render() : <></>}
        <FilterEditor imageSrc={image}/>
        <FileSelect onImageChange={onImageChange}/>
    </div>
}

export default ImageEditor