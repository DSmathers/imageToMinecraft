// The id for commands. 
export const enum ColorIds {
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

interface Color {
    id : ColorIds;
    r : number;
    g : number; 
    b : number;
}



const White : Color = {
    id : ColorIds.white,
    r : 255,
    g : 255,
    b : 255
}

const LightGray : Color = {
    id : ColorIds.lightGray,
    r : 255,
    g : 255,
    b : 255
}

const Gray : Color = {
    id : ColorIds.gray,
    r : 156,
    g : 156,
    b : 151
}

const Black : Color = {
    id : ColorIds.black,
    r : 29,
    g : 28,
    b : 33
}

const Yellow : Color = {
    id : ColorIds.yellow,
    r : 255,
    g : 216,
    b : 61
}

const Orange : Color = {
    id : ColorIds.orange,
    r : 249,
    g : 128,
    b : 29
}

const Red : Color = {
    id : ColorIds.red,
    r : 176,
    g : 46,
    b : 38
}

const Brown : Color = {
    id : ColorIds.brown,
    r : 130,
    g : 84,
    b : 50
}

const Lime : Color = {
    id : ColorIds.lime,
    r : 128,
    g : 199,
    b : 31
}

const Green : Color = {
    id : ColorIds.green,
    r : 93,
    g : 124,
    b : 21
}

const LightBlue : Color = {
    id : ColorIds.lightBlue,
    r : 58,
    g : 170,
    b : 218
}

const Cyan : Color = {
    id : ColorIds.cyan,
    r : 22,
    g : 156,
    b : 157
}

const Blue : Color = {
    id : ColorIds.blue,
    r : 60,
    g : 68,
    b : 169
}

const Pink : Color = {
    id : ColorIds.pink,
    r : 243,
    g : 140,
    b : 170
}

const Magenta : Color = {
    id : ColorIds.magenta,
    r : 198,
    g : 79,
    b : 189
}

const Purple : Color = {
    id : ColorIds.purple,
    r : 137,
    g : 50,
    b : 183
}

const BaseColors = [ White, LightGray, Gray, Black, Yellow, Orange, Red, Brown, Lime, Green, LightBlue, Cyan, Blue, Pink, Magenta, Purple];

export function matchToBaseColor ( r : number, g : number, b : number ) : ColorIds {
    let closestDistance : number = 10000; // 10k closest as base. 
    let closestColor : ColorIds = ColorIds.white; 
    BaseColors.map((color) => {
        let dr = color.r - r;
        let dg = color.g - g;
        let db = color.b - b;

        let diff = Math.sqrt(Math.pow(dr, 2) + Math.pow(dg, 2) + Math.pow(db, 2));

        if( diff < closestDistance ) {
            closestColor = color.id; 
        }
    })
    return closestColor;
}

export function findClosestColor (r : number , g : number , b : number ) : ColorIds {
    let closest = {
        distance : 100000000,
        color: White.id
    }
    BaseColors.map((color) => {
        let distance = Math.pow(color.r - r, 2) + Math.pow(color.g - g, 2) + Math.pow(color.b -b, 2);

        if(distance < closest.distance) {
            closest.distance = distance;
            closest.color = color.id
        }
    })
    return closest.color;
}

export function matchToGreyscale ( r : number, g : number, b : number ) : ColorIds {
    let grayValue = (r * .299) + (g * .587) + (b * .114);
    
    if ( grayValue < 70 ) {
        return ColorIds.black
    }

    else if ( grayValue < 140 ) {
        return ColorIds.gray
    }

    else if ( grayValue < 210 ) {
        return ColorIds.lightGray
    }

    else return ColorIds.white

}