"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_pixels_1 = __importDefault(require("get-pixels"));
const woolColors_1 = require("./colors/wool/woolColors");
function parseImage(filename, color = true) {
    const timer = (ms) => new Promise(res => setTimeout(res, ms));
    const path = "./images/";
    let pixelArray = [];
    (0, get_pixels_1.default)(path + filename, (err, pixels) => {
        if (err) {
            return new Error(err.message);
        }
        let height;
        let width;
        try {
            height = pixels.shape[1];
            width = pixels.shape[0];
        }
        catch (e) {
            return new Error(' There was a problem parsing the image. ');
        }
        for (let y = 0; y < pixels.shape[1]; y++) {
            let row = [];
            for (let x = 0; x < pixels.shape[0]; x++) {
                const r = pixels.get(x, y, 0);
                const g = pixels.get(x, y, 1);
                const b = pixels.get(x, y, 2);
                color ? row.push((0, woolColors_1.findClosestWoolColor)(r, g, b)) : row.push((0, woolColors_1.findGreyscaleWoolColor)(r, g, b));
            }
            pixelArray.push(row);
        }
    });
    timer(30);
    return pixelArray;
}
exports.default = parseImage;
