import { useEffect, useState } from "react"


const FilterEditor = ({imageSrc}) => {

    const [brightness, setBrightness] = useState(0)
    const [sharpness, setSharpness] = useState(0)
    const [contrast, setContrast] = useState(0)

    const getContrast = () => {
        return contrast/100
    }



    const renderControls = () => {
        if (imageSrc) {
            return <>
                <label htmlFor="brightness">Brightness:</label>
                <input 
                    type="range" 
                    min="-100" max="100"
                    name="brightness" 
                    value={brightness} 
                    className="slider" 
                    id="brightness" 
                    onChange={e => {
                        setBrightness(e.target.value)
                        window.Caman("#image", function(){
                            this.reloadCanvasData();
                            this.revert(false);
                            this.brightness(e.target.value);
                            this.sharpen(sharpness);
                            this.contrast(getContrast());
                            this.render()
                        })
                    }}></input>
                <br />
                <label htmlFor="sharpness">Sharpness:</label>
                <input 
                    type="range" 
                    min="-50" max="50"
                    name="sharpness" 
                    value={sharpness} 
                    className="slider" 
                    id="sharpness" 
                    onChange={e => {
                        setSharpness(e.target.value)
                        window.Caman("#image", function(){
                            this.reloadCanvasData();
                            this.revert(false);
                            this.brightness(brightness);
                            this.sharpen(e.target.value);
                            this.contrast(getContrast());
                            this.render()
                        })
                    }}></input>
                <br />
                <label htmlFor="contrast">Contrast:</label>
                <input 
                    type="range" 
                    min="-5000" max="5000"
                    step="500"
                    name="contrast" 
                    value={contrast} 
                    className="slider" 
                    id="contrast" 
                    onChange={e => {
                        setContrast(e.target.value)
                        window.Caman("#image", function(){
                            this.reloadCanvasData();
                            this.revert(false);
                            this.brightness(brightness);
                            this.sharpen(sharpness);
                            this.contrast((e.target.value)/100);
                            this.render()
                        })
                    }}></input>
                <br />
                <button onClick={e => {
                    window.Caman("#image", function(){
                        setBrightness(0)
                        setSharpness(0)
                        setContrast(0)
                        this.reloadCanvasData();
                        this.revert(false);
                    })
                    
                }}>Reset</button>
            </>
        }
    }

    return <div>
            <img id="image" alt="" src={imageSrc}></img>
            <br />
            {renderControls()}
        </div>

}

export default FilterEditor