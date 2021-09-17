// source https://stackoverflow.com/questions/13762864/image-brightness-detection-in-client-side-script
// This function will convert each color to gray scale and return average of all pixels, 
// so final value will be between 0 (darkest) and 255 (brightest)
function getImageDarkness(imageDom,callback) {

    var colorSum = 0;

    // create canvas
    var canvas = document.createElement("canvas");
    canvas.width = imageDom.width;
    canvas.height = imageDom.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(imageDom,0,0);

    var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
    var data = imageData.data;
    var r,g,b,avg;

    for(var x = 0, len = data.length; x < len; x+=4) {
        r = data[x];
        g = data[x+1];
        b = data[x+2];

        avg = Math.floor((r+g+b)/3);
        colorSum += avg;
    }

    var brightness = Math.floor(colorSum / (imageDom.width*imageDom.height));
    callback(brightness);
}

export {
    getImageDarkness
}