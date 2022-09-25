"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findClosestWoolColor = exports.findGreyscaleWoolColor = void 0;
const Orange = {
    "colorId": 1,
    "r": 240,
    "g": 118,
    "b": 19
};
const Magenta = {
    "colorId": 2,
    "r": 225,
    "g": 68,
    "b": 179
};
const LightBlue = {
    "colorId": 3,
    "r": 58,
    "g": 175,
    "b": 217
};
const Yellow = {
    "colorId": 4,
    "r": 248,
    "g": 198,
    "b": 39
};
const Lime = {
    "colorId": 5,
    "r": 112,
    "g": 185,
    "b": 25
};
const Pink = {
    "colorId": 6,
    "r": 237,
    "g": 120,
    "b": 140
};
const Gray = {
    "colorId": 7,
    "r": 30,
    "g": 30,
    "b": 30
};
const LightGray = {
    "colorId": 8,
    "r": 142,
    "g": 142,
    "b": 134
};
const Cyan = {
    "colorId": 9,
    "r": 21,
    "g": 137,
    "b": 145
};
const Purple = {
    "colorId": 10,
    "r": 121,
    "g": 42,
    "b": 172
};
const Blue = {
    "colorId": 11,
    "r": 10,
    "g": 10,
    "b": 157
};
const Brown = {
    "colorId": 12,
    "r": 114,
    "g": 71,
    "b": 40
};
const Green = {
    "colorId": 13,
    "r": 84,
    "g": 109,
    "b": 27
};
const Red = {
    "colorId": 14,
    "r": 255,
    "g": 85,
    "b": 85
};
const White = {
    "colorId": 0,
    "r": 255,
    "g": 255,
    "b": 255
};
const Black = {
    "colorId": 15,
    "r": 0,
    "g": 0,
    "b": 0
};
const Colors = [White, Orange, Magenta, LightBlue, Yellow, Lime, Pink, Gray, LightGray, Cyan, Purple, Blue, Brown, Green, Red, Black];
function findGreyscaleWoolColor(r, b, g) {
    let grayValue = (r * .299) + (g * .587) + (b * .114);
    if (grayValue <= 70) {
        return 15;
    }
    else if (grayValue <= 140) {
        return 7;
    }
    else if (grayValue <= 210) {
        return 8;
    }
    else
        return 0;
}
exports.findGreyscaleWoolColor = findGreyscaleWoolColor;
function findClosestWoolColor(r, g, b) {
    let closest = {
        distance: 100000000,
        color: White.colorId
    };
    Colors.map((color) => {
        let distance = Math.pow(color.r - r, 2) + Math.pow(color.g - g, 2) + Math.pow(color.b - b, 2);
        if (distance < closest.distance) {
            closest.distance = distance;
            closest.color = color.colorId;
        }
    });
    return closest.color;
}
exports.findClosestWoolColor = findClosestWoolColor;
