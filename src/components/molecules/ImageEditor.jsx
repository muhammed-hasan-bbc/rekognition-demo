import {useState} from "react";
import ReactCrop from "react-image-crop"
import {processImage} from '../../aws/rekognition'
import FileSelect from "../atoms/FileSelect";
import FilterEditor from "./FilterEditor";

const ImageEditor = () => {
    const [image, setImage] = useState();
    const [filename, setFilename] = useState();
    const [filetype, setFiletype] = useState();
    const [cropProps, setCropProps] = useState();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let selectedImage = event.target.files[0]
            let selectedImageUrlPath = URL.createObjectURL(selectedImage)
            setImage(selectedImageUrlPath);
            setFilename(selectedImage.name);
            setFiletype(selectedImage.type);

            let imageObj = new Image()
            imageObj.src = selectedImageUrlPath
            imageObj.onload = () => {
                let imageDimensions  = {
                    imageHeight: imageObj.height,
                    imageWidth: imageObj.width
                }
                
                processImage(selectedImage, imageDimensions, setCropProps)
            }

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
        <FilterEditor imageSrc={image} cropProps={cropProps} filename={filename} filetype={filetype}/>
        <FileSelect onImageChange={onImageChange}/>
    </div>
}

export default ImageEditor