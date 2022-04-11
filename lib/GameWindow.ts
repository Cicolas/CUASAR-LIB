// deno-lint-ignore-file no-inferrable-types
import Scene from "./Scene.ts";

export default class GameWindow {
    private _name: string = "";

    public isRunning: boolean = false;

    public get name() : string {
        return this._name;
    }

    private width: number = 0;
    private height: number = 0;
    public frame: number = 0;
    public fps: number = 0;
    public dt: number = 0;
    public pause: boolean = false;

    private lastFrameTime: number = 0;
    private scene: Scene[] = [];

    constructor(name: string) {
        this._name = name;
    }

    public setResolution(width: number, height: number): GameWindow {
        this.width = width;
        this.height = height;
        return this;
    }

    public pushScene(scene: Scene): GameWindow {
        this.scene.push(scene.initScene(this));
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
            if (!this.pause) {
                this.updateGame().drawGame();
            }
        }
    }

    public call(fun: (gameWin: GameWindow) => void): GameWindow {
        fun(this);
        return this;
    }
}