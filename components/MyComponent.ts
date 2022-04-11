// deno-lint-ignore-file no-unused-vars
import ComponentInterface from "../lib/Component";
import GameWindow from "../lib/GameWindow";
import GObject from "../lib/GObject";

export default class MyComponent implements ComponentInterface {
    public name = "My Component";
    private number = 0;

    init() {
        console.log(this.name);
    }

    postInit() {}

    update(obj: GObject, gameWin: GameWindow){
        console.log(this.number);
        this.number++;

        if (this.number > 10) {
            gameWin.isRunning = false;
        }
    }

    draw(){}
    destroy() {}
}