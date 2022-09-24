// The id for commands. 
export const enum WoolColors {
    white = 0,
    orange = 1,
    magenta = 2,
    lightBlue = 3,
    yellow = 4,
    lime = 5,
    pink = 6,
    gray = 7,
    lightGray = 8,
    cyan = 9,
    purple = 10,
    blue = 11,
    brown = 12,
    green = 13,
    red = 14,
    black = 15
}

type Color = {
    "colorId" : WoolColors,
    "r":number,
    "g":number,
    "b":number
}


const Orange : Color = {
    "colorId" : WoolColors.orange,
    "r" : 240,
    "g" : 118,
    "b" : 19
}

const Magenta : Color = {
    "colorId" : WoolColors.magenta,
    "r" : 225,
    "g" : 68,
    "b" : 179
}

const LightBlue : Color = {
    "colorId" : WoolColors.lightBlue,
    "r" : 58,
    "g" : 175,
    "b" : 217
}

const Yellow : Color = {
    "colorId" : WoolColors.yellow,
    "r" : 248,
    "g" : 198,
    "b" : 39
}

const Lime : Color = {
    "colorId" : WoolColors.lime,
    "r" : 112,
    "g" : 185,
    "b" : 25
}

const Pink : Color = {
    "colorId" : WoolColors.pink,
    "r" : 237,
    "g" : 120,
    "b" : 140
}

const Gray : Color = {
    "colorId" : WoolColors.gray,
    "r" : 30,
    "g" : 30,
    "b" : 30
}

const LightGray : Color = {
    "colorId" : WoolColors.lightGray,
    "r" : 142,
    "g" : 142,
    "b" : 134
}

const Cyan : Color = {
    "colorId" : WoolColors.cyan,
    "r" : 21,
    "g" : 137,
    "b" : 145
}

const Purple : Color = {
    "colorId" : WoolColors.purple,
    "r" : 121,
    "g" : 42,
    "b" : 172
}

const Blue : Color= {
    "colorId" : WoolColors.blue,
    "r" : 10,
    "g" : 10,
    "b" : 157
}

const Brown : Color = {
    "colorId" : WoolColors.brown,
    "r" : 114,
    "g" : 71,
    "b" : 40
}

const Green : Color= {
    "colorId" : WoolColors.green,
    "r" : 84,
    "g" : 109,
    "b" : 27
}

const Red : Color = {
    "colorId" : WoolColors.red,
    "r" : 255,
    "g" : 85,
    "b" : 85
}

const White : Color = {
    "colorId" : WoolColors.white,
    "r" : 255,
    "g" : 255,
    "b" : 255
}

const Black : Color = {
    "colorId" : WoolColors.black,
    "r" : 0,
    "g" : 0,
    "b" : 0
}

const Colors = [White, Orange, Magenta, LightBlue, Yellow, Lime, Pink, Gray, LightGray, Cyan, Purple, Blue, Brown, Green, Red, Black]

export function findGreyscaleWoolColor(r: number, b: number, g: number ) : WoolColors {
  
    //let grayValue = (r + b + g) / 3;
    let grayValue = (r * .299) + (g * .587) + (b * .114);

    if(grayValue <= 70){
        return WoolColors.black;
    }
    else if(grayValue <= 140){
        return WoolColors.gray;
    }
    else if(grayValue <= 210){
        return WoolColors.lightGray;
    }
    else return WoolColors.white;
}

export function findClosestWoolColor(r : number , g : number , b : number ) : WoolColors {
    let closest = {
        distance : 100000000,
        color: White.colorId
    }
    Colors.map((color) => {
        let distance = Math.pow(color.r - r, 2) + Math.pow(color.g - g, 2) + Math.pow(color.b -b, 2);
        //console.log(distance);
        if(distance < closest.distance) {
            closest.distance = distance;
            closest.color = color.colorId
        }
    })
    return closest.color;
}