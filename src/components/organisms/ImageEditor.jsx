import {useEffect, useState} from "react";
import ReactCrop from "react-image-crop"
import {processImage} from '../../aws/rekognition'
import FileSelect from "../atoms/FileSelect";
import CroppedEditor from "../molecules/CroppedEditor/CroppedEditor";
import "./ImageEditor.scss"

const ImageEditor = () => {
    const [imageSrc, setImageSrc] = useState();
    const [imageDom, setImageDom] = useState();
    const [filename, setFilename] = useState();
    const [filetype, setFiletype] = useState();
    const [cropProps, setCropProps] = useState();

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let selectedImage = event.target.files[0]
            let selectedImageUrlPath = URL.createObjectURL(selectedImage)
            setImageSrc(selectedImageUrlPath);
            setFilename(selectedImage.name);
            setFiletype(selectedImage.type);
        }
    };

    useEffect(() => {
        let image = document.getElementsByClassName("ReactCrop__image")[0]
        
        if (image) {

            setImageDom(image)

            fetch(image.src).then(res => res.blob()).then(imageBytes => {
                processImage(imageBytes, image, setCropProps)
            })
        }
    }, [imageSrc])

    const renderCrop = () => {
        return <div className="Original" style={{width: "100%", height: "80%"}}>
            <ReactCrop
                ruleOfThirds={true}
                onChange={crop => {
                    setCropProps(crop)
                }}
                keepSelection={true}
                src={imageSrc} 
                crop={cropProps}
        />
        </div>
    }

    const renderImageEditor = () => {
        if (imageDom && cropProps && cropProps.height && cropProps.width) {
            return <div className="Cropped">
                <CroppedEditor 
                    imageDom={imageDom} 
                    cropProps={cropProps} 
                    filename={filename} 
                    filetype={filetype}/>
            </div>

        }
    }

    const render = () => {
        return <div className="Images"> 
            {renderCrop()}
            {renderImageEditor()}
        </div>
    }

    return <div>
        {imageSrc ? render() : <></>}
        <div style={{textAlign:"center"}}>
            <FileSelect onImageChange={onImageChange}/>
        </div>
    </div>
}

export default ImageEditor