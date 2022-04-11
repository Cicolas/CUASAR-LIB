// deno-lint-ignore-file no-inferrable-types ban-unused-ignore
import GameWindow from "./GameWindow.ts";
import GObject from "./GObject.ts";

export default interface ComponentInterface {
    name: string;
    init: (obj: GObject, gameWin: GameWindow) => void;
    postInit: (obj: GObject, gameWin: GameWindow) => void;
    update: (obj: GObject, gameWin: GameWindow) => void;
    // deno-lint-ignore ban-types
    draw: (context?: Object) => void;
    destroy: (gameWin: GameWindow) => void;
}