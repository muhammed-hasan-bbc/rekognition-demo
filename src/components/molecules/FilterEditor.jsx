import { useEffect, useRef, useState } from "react"
import { getImageDarkness} from "../../util/darknessDetect"

const FilterEditor = ({imageSrc, cropProps, filename, filetype}) => {

    const [stylingFilterString, setStylingFilterString] = useState("")

    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)
    const [message, setMessage] = useState("")

    const previewRef = useRef(null)
    const imageRef = useRef(null)


    useEffect(() => {
        let filterString = "brightness(" + brightness + "%) contrast(" + contrast + "%)";
        setStylingFilterString(filterString)

    }, [brightness, contrast])


    useEffect(() => {
        getImageDarkness(imageSrc, (brightness) => {
            if (brightness < 100) {
                setMessage("Your image is quite dark, consider using the brightness slider or consider using another image")
            } else {
                setMessage()
            }
        })
    }, [imageSrc])

    useEffect(() => {
        if (imageSrc && imageSrc.length && cropProps) {

            const image = new Image()
            image.src = imageSrc

            image.onload = () => {
                const cropCanvas = previewRef.current

                const newCrop = cropProps

                const scaleX = image.naturalWidth / image.width
                const scaleY = image.naturalHeight / image.height
                const ctx = cropCanvas.getContext('2d')
            
                const pixelRatio = window.devicePixelRatio
            
                cropCanvas.width = newCrop.width * pixelRatio
                cropCanvas.height = newCrop.height * pixelRatio

                ctx.filter = stylingFilterString;
                ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
                ctx.drawImage(image, newCrop.x * scaleX, newCrop.y * scaleY, newCrop.width * scaleX, newCrop.height * scaleY, 0, 0, newCrop.width,
                newCrop.height)
            }
        }
    }, [cropProps, stylingFilterString, imageSrc])

    const renderControls = () => {
        if (imageSrc) {
            return <>
                <label htmlFor="brightness">Brightness:</label>
                <input 
                    type="range" 
                    min="0" max="200"
                    name="brightness" 
                    step="1"
                    value={brightness} 
                    className="slider" 
                    id="brightness" 
                    onChange={e => {
                        setBrightness(e.target.value)
                    }}></input>
                <br />

                <label htmlFor="contrast">Contrast:</label>
                <input 
                    type="range" 
                    min="100" max="200"
                    name="brightness" 
                    step="1"
                    value={contrast} 
                    className="slider" 
                    id="brightness" 
                    onChange={e => {
                        setContrast(e.target.value)
                    }}></input>
                <br />

                {message ? <p>{message}</p> : <></>}

                <button id="reset" onClick={e => {
                    e.preventDefault()
                    setBrightness(100)
                    setContrast(100)
                }}>
                    Reset
                </button>
                <br />
                <a href="/" id="download" onClick={e => {
                    document.getElementById("download").download = "Guiding-Hand-" + filename
                    document.getElementById("download").href = document.getElementById("canvas").toDataURL(filetype);
                }} download="image.png">
                    Download
                </a>
                <br />
            </>
        }
    }

    return <div>
            <canvas
                style={{width: Math.round(cropProps?.width ?? 0),height: Math.round(cropProps?.height ?? 0)}}
                id="canvas" 
                ref={previewRef}/>
            <br />
            {renderControls()}
        </div>

}

export default FilterEditor