// deno-lint-ignore-file no-inferrable-types
import ComponentInterface from "./Component.ts";
import GameWindow from "./GameWindow.ts";

export default class GObject {
    #name: string = "";
    public get name() : string { return this.#name; }
    private set name(v: string) { this.#name = v; }

    #dontDestroy: boolean = false;
    public get dontDestroy(): boolean { return this.#dontDestroy; }
    protected set dontDestroy(v: boolean) { this.#dontDestroy = true; }

    private components: ComponentInterface[] = [];

    constructor(name: string, dontDestroy: boolean = false) {
        this.name = name;
        this.dontDestroy = dontDestroy;
    }

    public addComponent(...components: ComponentInterface[]): GObject{
        components.forEach(value => {
            this.components.push(value);
        });
        return this;
    }

    public getComponent<T extends ComponentInterface>(t: {new(): T}): T | undefined {
        return this.components.find(value =>
            value.constructor === t
        ) as T;
    }

    public initObject(gameWin: GameWindow): GObject {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].init?.call(this.components[i], this, gameWin);
        }
        return this;
    }

    public postInitObject(gameWin: GameWindow): GObject {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].postInit?.call(this.components[i], this, gameWin);
        }
        return this;
    }

    public updateObject(gameWin: GameWindow): GObject {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].update?.call(this.components[i], this, gameWin);
        }
        return this;
    }

    public drawObject(): GObject {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].draw?.call(this.components[i]);
        }
        return this;
    }

    public destroy(gameWin: GameWindow) {
        for (let i = 0; i < this.components.length; i++) {
            this.components[i].destroy?.call(this.components[i], gameWin);
        }
    }
}