import { useEffect, useState } from "react";
import './FilterControls.scss'

const FilterControls = ({imageDom, setStylingFilterString, currentImageBrightness}) => {
    const [brightness, setBrightness] = useState(100)
    const [contrast, setContrast] = useState(100)

    useEffect(() => {
        let filterString = "brightness(" + brightness + "%) contrast(" + contrast + "%)";
        setStylingFilterString(filterString)

    }, [brightness, contrast, setStylingFilterString])

    return ( <div className="Presets">
            <div className="Reset" onClick={e => {
                setBrightness(100)
                setContrast(100)
            }}>
                Reset
            </div>
            <div className="Preset-1" onClick={e => {
                setBrightness(110)
                setContrast(100)
            }} >
                Preset 1
            </div>

            <div className="Preset-2" onClick={e => {
                setBrightness(110)
                setContrast(120)
            }}>
                Preset 2
            </div>

            <div className="Preset-3" onClick={e => {
                setBrightness(120)
                setContrast(120)
            }}>
                Preset 3
            </div>
        </div>
    )
}

export default FilterControls