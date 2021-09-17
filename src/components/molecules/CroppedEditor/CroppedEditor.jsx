import { useEffect, useRef, useState } from "react"
import { getImageDarkness} from "../../../util/darknessDetect"
import Download from "../../atoms/Download/Download"
import Preview from "../Preview/Preview"
import FilterControls from "../FilterControls/FilterControls"


const CroppedEditor = ({imageDom, cropProps, filename, filetype}) => {

    const APP_INDEX_PREVIEW_WIDTH = 121;
    const APP_INDEX_PREVIEW_HEIGHT = 68;
    const WEB_INDEX_PREVIEW_WIDTH = 237;
    const WEB_INDEX_PREVIEW_HEIGHT = 133;
    const CROP_PREVIEW_HEIGHT = cropProps.height;
    const CROP_PREVIEW_WIDTH = cropProps.width;

    const [stylingFilterString, setStylingFilterString] = useState("")
    const [imageBrightnessIndex, setImageBrightnessIndex] = useState()

    const appPreviewRef = useRef(null)
    const webPreviewRef = useRef(null)
    const cropPreviewRef = useRef(null)

    const previewRefsAreDefined = () => {
        return appPreviewRef && appPreviewRef.current && 
                webPreviewRef && webPreviewRef.current &&
                cropPreviewRef && cropPreviewRef.current
    }
    
    useEffect(() => {
        if (previewRefsAreDefined()) {
            let image = appPreviewRef.current.toDataURL(filetype);
            getImageDarkness(image, (brightness) => { 
                setImageBrightnessIndex(brightness)
            })

        }
    }, [stylingFilterString, filetype, appPreviewRef])

    const renderControls = () => {
        if (previewRefsAreDefined()) {
            let downloadLink = cropPreviewRef.current.toDataURL(filetype);
            return <>
                <FilterControls 
                    setStylingFilterString={setStylingFilterString}
                    currentImageBrightness={imageBrightnessIndex}/>

                <Download 
                    filename={"Guiding-Hand-" + filename} 
                    downloadLink={downloadLink} 
                    text={"Download"}/>
            </>
        }
    }

    const renderPreviews = () => {
        return <div className="Previews">
            <div>
                <p>
                    This is what mobile views will see.
                </p>
                <Preview
                    stylingFilterString={stylingFilterString}
                    previewCanvasRef={appPreviewRef}
                    imageDom={imageDom}
                    cropProps={cropProps}
                    height={APP_INDEX_PREVIEW_HEIGHT}
                    width={APP_INDEX_PREVIEW_WIDTH}/>

            </div>
            <div>
                <p>
                    This is what desktop users will see
                </p>
                <Preview
                    stylingFilterString={stylingFilterString}
                    previewCanvasRef={webPreviewRef}
                    imageDom={imageDom}
                    cropProps={cropProps}
                    height={WEB_INDEX_PREVIEW_HEIGHT}
                    width={WEB_INDEX_PREVIEW_WIDTH}/>
                
            </div>

            <div style={{display: "none"}}>
                <Preview
                    stylingFilterString={stylingFilterString}
                    previewCanvasRef={cropPreviewRef}
                    imageDom={imageDom}
                    cropProps={cropProps}
                    height={CROP_PREVIEW_HEIGHT}
                    width={CROP_PREVIEW_WIDTH}/>
        </div>

        </div>
        
    }

    return <div>
            {renderPreviews()}
            {renderControls()}
        </div>

}

export default CroppedEditor