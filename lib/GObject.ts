// deno-lint-ignore-file no-inferrable-types
import ComponentInterface from "./Component.ts";
import GameWindow from "./GameWindow.ts";

export default class GObject {
    private _name: string = "";
    public dontDestroy?: boolean = false;

    public get name() : string {
        return this._name;
    }

    private components: ComponentInterface[] = [];

    constructor(name: string) {
        this._name = name;
    }

    public addComponent(...components: ComponentInterface[]): GObject{
        components.forEach(value => {
            this.components.push(value);
        });
        return this;
    }

    public initObject(gameWin: GameWindow): GObject {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].init(this, gameWin);
        }
        return this;
    }

    public postInitObject(gameWin: GameWindow): GObject {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].postInit(this, gameWin);
        }
        return this;
    }

    public updateObject(gameWin: GameWindow): GObject {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update(this, gameWin);
        }
        return this;
    }

    public drawObject(): GObject {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].draw();
        }
        return this;
    }

    // deno-lint-ignore ban-types
    public getComponent(t: Function): Object | undefined {
        return this.components.find(value =>
            // deno-lint-ignore ban-types
            (value as Object).constructor.name === t.name
        );
    }

    public destroy(gameWin: GameWindow) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].destroy(gameWin);
        }
    }
}