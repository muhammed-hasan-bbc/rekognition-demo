import { useEffect, useState } from "react"
import { getImageDarkness} from "../../util/darknessDetect"

const FilterEditor = ({imageSrc}) => {

    const [filterString, setFilterString] = useState("")

    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)

    const [message, setMessage] = useState("")

    useEffect(() => {
        let filterString = "brightness(" + brightness + "%) contrast(" + contrast + "%)";
        setFilterString(filterString)
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
            </>
        }
    }

    return <div>
            <img id="image" alt="" src={imageSrc} style={{filter: filterString}}></img>
            <br />
            {renderControls()}
        </div>

}

export default FilterEditor