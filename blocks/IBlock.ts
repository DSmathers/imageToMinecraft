import { ColorIds } from "../colors/Colors";

type blockNames = 
    "wool" | 
    "concrete" |
    "stained_hardened_clay"

export interface Block {
    name : blockNames;
    colorId: ColorIds;
    r: number;
    g: number;
    b: number;
}
