import { concreteBlocks } from "../blocks/concrete";
import { Block } from "../blocks/IBlock";
import { terracottaBlocks } from "../blocks/terracotta";
import { WoolBlocks } from "../blocks/wool";
import { PixelColor } from "../parseImage";

const blocks = [...concreteBlocks, ...terracottaBlocks, ...WoolBlocks];


export default function matchClosestBlock ( pixel : PixelColor, palette : string )  {
    let distance = 10000;
    let closest : Block = blocks[0];
    let blockPalette : Block[] = [];
    if ( palette === 'all' ) {
        blockPalette = blocks;
    }

    else if ( palette === 'wool') {
        blockPalette = WoolBlocks;
    }

    else if ( palette === 'concrete') {
        blockPalette = concreteBlocks;
    }

    else if ( palette === 'terracotta') {
        blockPalette = terracottaBlocks;
    }

    blockPalette.forEach((block) => {
        let dr = block.r - pixel.r;
        let dg = block.g - pixel.g;
        let db = block.b - pixel.b;

        let diff = Math.sqrt ( Math.pow( dr, 2) + Math.pow( dg, 2) + Math.pow( db, 2));

        if( diff < distance ) {
            distance = diff;
            closest = block;
        }
    });
    return closest;
}