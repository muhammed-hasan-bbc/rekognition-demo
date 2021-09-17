import { useEffect, useState } from "react";

const FilterControls = ({setStylingFilterString, currentImageBrightness}) => {
    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)

    useEffect(() => {
        let filterString = "brightness(" + brightness + "%) contrast(" + contrast + "%)";
        setStylingFilterString(filterString)

    }, [brightness, contrast, setStylingFilterString])

    return ( <div>
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

                <button id="reset" onClick={e => {
                    e.preventDefault()
                    setBrightness(100)
                    setContrast(100)
                }}>
                    Reset
                </button>
            </div>
    )
}

export default FilterControls