// deno-lint-ignore-file no-inferrable-types
import GameWindow from "./GameWindow.ts";
import GObject from "./GObject.ts";

export default class Scene {
    #name: string = "";
    public get name() : string { return this.#name; }
    private set name(v: string) { this.#name = v; }

    private objects: GObject[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public addObject(...objs: GObject[]): Scene {
        for (let i = 0; i < objs.length; i++) {
            this.objects.push(objs[i]);
        }
        return this;
    }

    public getObjects(name: string): GObject[] | undefined {
        return this.objects.filter(value =>
            value.name === name
        );
    }

    public initScene(gameWin: GameWindow): Scene {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].initObject(gameWin).postInitObject(gameWin);
        }
        return this;
    }

    public updateScene(gameWin: GameWindow): Scene {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].updateObject(gameWin);
        }
        return this;
    }

    public drawScene(): Scene {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].drawObject();
        }
        return this;
    }

    public removeObject(obj: GObject) {
        this.objects = this.objects.filter(value => value !== obj);
    }

    public end(gameWin: GameWindow): GObject[] {
        for (let i = 0; i < this.objects.length; i++) {
            if (!this.objects[i].dontDestroy) this.objects[i].destroy(gameWin);
        }

        return this.objects.filter((value) => value.dontDestroy)
    }
}
