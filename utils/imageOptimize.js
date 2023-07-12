const Jimp = require("jimp");
const CustomHttpError = require("./customHttpError");

// const imageOptimize = async (filePath) => {
//   const imageTypesArray = ["jpg", "jpeg", "png", "bmp", "tiff", "gif"];
//   const filePathArray = filePath.split(".");
//   try {
//     if (!imageTypesArray.includes(filePathArray[filePathArray.length - 1])) {
//       throw new CustomHttpError(400, "avatar file should be in 'image' format");
//     }
//     await Jimp.read(filePath)
//       .then((image) => {
//         return image
//           .resize(250, 250) // resize
//           .write(filePath); // save
//       })
//       .catch((error) => {
//         throw error;
//       });
//   } catch (error) {
//     const errorCode = error.status || 400;
//     const errorMessage = error.message;
//     throw new CustomHttpError(errorCode, errorMessage);
//   }
// };

const imageOptimize = async (filePath) => {
  try {
    const jimpImage = await Jimp.read(filePath);
    jimpImage
      .autocrop()
      .cover(
        250,
        250,
        Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(filePath);
  } catch (error) {
    throw new CustomHttpError(400, "we can not load avatar file");
  }
};
module.exports = imageOptimize;
