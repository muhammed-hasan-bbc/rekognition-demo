import { useEffect } from "react";

const Preview = ({ imageDom, cropProps, stylingFilterString, previewCanvasRef , height, width}) => {
  useEffect(() => {
    if (previewCanvasRef && previewCanvasRef.current) {
      const cropCanvas = previewCanvasRef.current;

      const newCrop = cropProps;

      const scaleX = imageDom.naturalWidth / imageDom.width;
      const scaleY = imageDom.naturalHeight / imageDom.height;
      const ctx = cropCanvas.getContext("2d");

      const pixelRatio = window.devicePixelRatio;

      // cropCanvas.width = newCrop.width * pixelRatio;
      // cropCanvas.height = newCrop.height * pixelRatio;

      cropCanvas.width = width * pixelRatio
      cropCanvas.height = height * pixelRatio

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      ctx.imageSmoothingQuality = 'high'
      ctx.filter = stylingFilterString;
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.drawImage(
        imageDom,
        newCrop.x * scaleX,
        newCrop.y * scaleY,
        newCrop.width * scaleX,
        newCrop.height * scaleY,
        0,
        0,
        width,
        height
      );
    }
  }, [cropProps, stylingFilterString, imageDom]);

  return (
    <canvas
      style={{
        width: width,
        height: height
      }}
      id="App-Preview-Canvas"
      ref={previewCanvasRef}
    />
  );
};

export default Preview;
