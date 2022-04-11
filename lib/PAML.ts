import GameWindow from "./GameWindow";
import GObject from "./GObject";
import Scene from "./Scene";
import { assertion, construct, getClassConstructorParams } from "./utils";

interface ComponentMapItem {
    name: string;
    fun: Function;
}

interface PAMLReaderOptions{
    componentMap: ComponentMapItem[];
}

export default class PAMLReader {
    private elem: HTMLElement;
    private gameWinElem: Element;
    private options: PAMLReaderOptions;

    public gameWin: GameWindow;

    constructor(options: PAMLReaderOptions) {
        this.options = options;
    }

    public read() {
        this.elem = document.getElementsByTagName("paml")[0] as HTMLElement;

        if (this.elem) {
            this.gameWinElem = this.elem.getElementsByTagName("GameWindow")[0];
            assertion(this.gameWinElem, "none <GameWindow> found");
            this.init();
        }

        return this.gameWin;
    }

    init() {
        const name = this.gameWinElem.getAttribute("name")??"game";
        this.gameWin = new GameWindow(name);

        const width = +this.gameWinElem.getAttribute("width")??800;
        const height = +this.gameWinElem.getAttribute("height")??600;

        this.gameWin.setResolution(width, height);

        for (let i = 0; i < this.gameWinElem.childElementCount; i++) {
            const element = this.gameWinElem.children[i];
            this.setupScenes(element, i);
        }

        // console.log(this.gameWin);
    }

    setupScenes(element: Element, i: number) {
        const name = element.getAttribute("name")??"cena: "+i;
        const scene = new Scene(name);

        for (let j = 0; j < element.childElementCount; j++) {
            const obj = element.children[j];
            this.setupObjects(scene, obj, j);
        }

        this.gameWin.pushScene(scene);
    }

    setupObjects(scene: Scene, element: Element, i: number) {
        const name = element.getAttribute("name")??"objeto: "+i;
        const obj = new GObject(name);

        for (let j = 0; j < element.childElementCount; j++) {
            const comp = element.children[j];
            this.setupComponents(obj, comp, j);
        }

        scene.addObject(obj);
    }

    setupComponents(object: GObject, element: Element, i: number) {
        // debugger;
        assertion(element.getAttribute("name"), "no component name provided");

        const fun = this.options.componentMap.find(
            (value) => value.name === element.getAttribute("name")
        ).fun;

        const params = getClassConstructorParams(fun);
        const paramsList = []
        params.forEach((value) => {
            assertion(element.getAttribute(value), `no '${value}' argument provided to '${fun.name}' component`);
            paramsList.push(eval(element.getAttribute(value)))
        });

        const comp = construct(fun.prototype.constructor, paramsList);
        // console.log(comp);

        object.addComponent(comp);
    }
}