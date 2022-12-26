// deno-lint-ignore-file no-inferrable-types
import Scene from "./Scene.ts";

export default class GameWindow {
    #name: string = "";
    public get name() : string { return this.#name; }
    private set name(v: string) { this.#name = v; }

    private isRunning: boolean = false;
    public shutdown(delay: number = 0) {
        setTimeout(() => {this.isRunning = false}, delay);
    }

    private width: number = 0;
    private height: number = 0;

    #frame: number = 0;
    public get frame() : number { return this.#frame; }
    private set frame(v: number) { this.#frame = v; }

    #fps: number = 0;
    public get fps() : number { return this.#fps; }
    private set fps(v: number) { this.#fps = v; }

    #dt: number = 0;
    public get dt() : number { return this.#dt; }
    private set dt(v: number) { this.#dt = v; }

    #pause: boolean = false;
    public pause() { this.#pause = true; }
    public resume() { this.#pause = false; }

    private lastFrameTime: number = 0;
    private scene: Scene[] = [];

    constructor(name: string) {
        this.name = name;
    }

    public setResolution(width: number, height: number): GameWindow {
        this.width = width;
        this.height = height;
        return this;
    }

    public pushScene(scene: Scene): GameWindow {
        this.scene.push(scene);
        return this;
    }

    public popScene(): GameWindow {
        const dontDestroyObj = this.scene[this.scene.length-1].end(this);
        this.scene.pop();
        for (let i = 0; i < dontDestroyObj.length; i++) {
            this.scene[this.scene.length-1].addObject(dontDestroyObj[i]);
        }
        return this;
    }

    public initGame(): GameWindow {
        this.isRunning = true;
        this.scene[this.scene.length-1].initScene(this);
        return this;
    }

    public updateGame(): GameWindow {
        this.dt = (Date.now()-this.lastFrameTime)/1000;
        this.fps = 1/(this.dt);
        this.lastFrameTime = Date.now();

        this.scene[this.scene.length-1].updateScene(this);
        return this;
    }

    public drawGame(): GameWindow {
        this.scene[this.scene.length-1].drawScene();
        return this;
    }

    public updateNRender(): void {
        while (this.isRunning) {
            if (!this.#pause) this.updateGame().drawGame();
        }
    }

    public call(fun: (gameWin: GameWindow) => void): GameWindow {
        fun(this);
        return this;
    }
}