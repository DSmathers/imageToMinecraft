import { ColorIds } from "../colors/Colors";
import { Block } from "./IBlock";

const command_name = 'concrete';

const WhiteConcrete : Block = {
    name: command_name,
    colorId : ColorIds.white,
    r : 255,
    g : 255,
    b : 255
}

const OrangeConcrete : Block = {
    name: command_name,
    colorId : ColorIds.orange,
    r : 249,
    g : 128,
    b : 29
}

const MagentaConcrete : Block = {
    name: command_name,
    colorId : ColorIds.magenta,
    r : 198,
    g : 79,
    b : 189
}

const LightBlueConcrete : Block = {
    name: command_name,
    colorId : ColorIds.lightBlue,
    r : 58,
    g : 170,
    b : 218
}

const YellowConcrete : Block = {
    name: command_name,
    colorId : ColorIds.yellow,
    r : 255,
    g : 216,
    b : 61
}

const LimeConcrete : Block = {
    name: command_name,
    colorId : ColorIds.lime,
    r : 128,
    g : 199,
    b : 31
}

const PinkConcrete : Block = {
    name: command_name,
    colorId : ColorIds.pink,
    r : 243,
    g : 140,
    b : 170
}

const GrayConcrete : Block = {
    name: command_name,
    colorId : ColorIds.gray,
    r : 71,
    g : 79,
    b : 82
}

const LightGrayConcrete : Block = {
    name: command_name,
    colorId : ColorIds.lightGray,
    r : 156,
    g : 157,
    b : 151
}

const CyanConcrete : Block = {
    name: command_name,
    colorId : ColorIds.cyan,
    r : 22,
    g : 156,
    b : 157
}

const PurpleConcrete : Block = {
    name: command_name,
    colorId : ColorIds.purple,
    r : 137,
    g : 50,
    b : 183
}

const BlueConcrete : Block = {
    name: command_name,
    colorId : ColorIds.blue,
    r : 60,
    g : 68,
    b : 169
}

const BrownConcrete : Block = {
    name: command_name,
    colorId : ColorIds.brown,
    r : 130,
    g : 84,
    b : 50
}

const GreenConcrete : Block = {
    name: command_name,
    colorId : ColorIds.green,
    r : 93,
    g : 124,
    b : 21
}

const RedConcrete : Block = {
    name: command_name,
    colorId : ColorIds.red,
    r : 176,
    g : 46,
    b : 38
}

const BlackConcrete : Block = {
    name: command_name,
    colorId : ColorIds.black,
    r : 29,
    g : 28,
    b : 33
}

export const concreteBlocks : Block[] = [
    WhiteConcrete, 
    OrangeConcrete, 
    MagentaConcrete, 
    LightBlueConcrete, 
    YellowConcrete, 
    LimeConcrete, 
    PinkConcrete, 
    GrayConcrete, 
    LightGrayConcrete, 
    CyanConcrete, 
    PurpleConcrete, 
    BlueConcrete, 
    BrownConcrete, 
    GreenConcrete, 
    RedConcrete, 
    BlackConcrete
];
