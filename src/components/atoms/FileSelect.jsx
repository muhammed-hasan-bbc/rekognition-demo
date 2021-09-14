const FileSelect = ({onImageChange}) => {
    return <div>
        <input
        type="file"
        accept="image/*"
        name="file"
        onChange={onImageChange}
      />
    </div>
}

export default FileSelect