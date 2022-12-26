// deno-lint-ignore-file no-unused-vars
import ComponentInterface from "../lib/Component.ts";
import GameWindow from "../lib/GameWindow.ts";
import GObject from "../lib/GObject.ts";

export default class MyComponent implements ComponentInterface {
    public get name() : string {
        return "My Component"
    }
    private number = 0;

    init(obj: GObject, gameWin: GameWindow) {
        const mc = obj.getComponent(MyComponent);

        console.log(obj.getComponent(MyComponent));
    }

    update(obj: GObject, gameWin: GameWindow){
        console.log(this.number);

        if(this.number++ >= 10) {
            gameWin.pause();
        }
    }
}