import { useDrawCanvasContext } from "../../context/drawCanvasContext";
import { CanvasElement } from "../../types/CanvasElement.type";

// const resizeImageData = (pixelsColorsArray: Uint8ClampedArray) => {
//   const sourcePixelLength = 560;
//   const targetPixelLength = 20;

//   const targetPixelArray = [];

//   //   for (
//   //     let targetPixelY = 0;
//   //     targetPixelY < sourcePixelLength;
//   //     targetPixelY += 20
//   //   ) {
//   //     for (
//   //       let targetPixelX = 0;
//   //       targetPixelX < sourcePixelLength;
//   //       targetPixelX += 20
//   //     ) {
//   //       let bigPixelSum = 0;
//   //       for (
//   //         let sourcePixelY = 0;
//   //         sourcePixelY < targetPixelLength;
//   //         sourcePixelY += 1
//   //       ) {
//   //         for (
//   //           let sourcePixelX = 0;
//   //           sourcePixelX < targetPixelLength;
//   //           sourcePixelX += 1
//   //         ) {
//   //           bigPixelSum +=
//   //             pixelsColorsArray[
//   //               targetPixelX + sourcePixelX + (targetPixelY + sourcePixelY) * 560
//   //             ];
//   //         }
//   //       }
//   // The pixelColorsArray contains 4 numbers representing the RGB of the pixel
//   // I need to multiply by 4 or something xd
//   let bigPixelSum = 0;
//   for (let y = 0; y < 20; y += 1) {
//     for (let x = 0; x < 20; x += 1) {
//       //   console.log(pixelsColorsArray[x + y * 560]);
//       //   bigPixelSum += pixelsColorsArray[x + y * 560];
//       // pixelsColorsArray[x + y * 560] = 180;
//     }
//   }

//   targetPixelArray.push(bigPixelSum / (20 * 20));
//   // }
//   //   }
//   console.log(targetPixelArray);
//   return targetPixelArray;
// };

const getPixelsFromCanvas = (
  canvasRef: React.MutableRefObject<CanvasElement>
): Uint8ClampedArray => {
  const canvas = canvasRef.current;
  if (!canvas) {
    throw new Error("Canvas could not be located!");
  }

  const canvasContext = canvas.getContext("2d");
  if (!canvasContext) {
    throw new Error("Canvas context could not be retrieved!");
  }

  // const canvasLength = 560;
  const canvasImageData = canvasContext.getImageData(0, 0, 560, 560);

  return canvasImageData.data;
};

const PredictButton = () => {
  const canvasRef = useDrawCanvasContext();

  return (
    <button onClick={() => getPixelsFromCanvas(canvasRef)}>
      Make Prediction
    </button>
  );
};

export default PredictButton;
