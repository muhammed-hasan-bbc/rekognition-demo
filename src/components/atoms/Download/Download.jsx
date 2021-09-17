const Download = ({filename, downloadLink, text}) => {
    return  <a href="/" id="download" onClick={e => {
        document.getElementById("download").download = filename
        document.getElementById("download").href = downloadLink
    }}>
        {text}
    </a>
}

export default Download