// deno-lint-ignore-file no-inferrable-types
import GameWindow from "./GameWindow";
import GObject from "./GObject";

export default class Scene {
    private name: string = "";

    private objects: GObject[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public addObject(obj: GObject): Scene {
        // obj.forEach(value => {
        //     this.objects.push(value);
        // });
        this.objects.push(obj);
        return this;
    }

    public getObject(name: string): GObject | undefined {
        return this.objects.find(value =>
            value.name === name
        );
    }

    public initScene(gameWin: GameWindow): Scene {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].initObject(gameWin);
        }
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].postInitObject(gameWin);
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
            if (!this.objects[i].dontDestroy) {
                this.objects[i].destroy(gameWin);
            }
        }

        return this.objects.filter((value) => value.dontDestroy)
    }
}
