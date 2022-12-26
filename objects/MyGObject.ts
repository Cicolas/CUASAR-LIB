import GameWindow from "../lib/GameWindow.ts";
import GObject from "../lib/GObject.ts";

export default class MyGObject extends GObject {
    constructor() {
        super("MyGObject");
    }

    initObject(gameWin: GameWindow): MyGObject {
        console.log("myGObject init");

        return super.initObject(gameWin);
    }

    postInitObject(gameWin: GameWindow): MyGObject {
        console.log("myGObject postInit");

        return super.postInitObject(gameWin);
    }
}