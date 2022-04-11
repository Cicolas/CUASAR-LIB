// deno-lint-ignore-file no-unused-vars ban-unused-ignore
import MyComponent from "./components/MyComponent";
import GameWindow from './lib/GameWindow';
import GObject from "./lib/GObject";
import Scene from "./lib/Scene";

new GameWindow("tela")
.setResolution(512, 512)
.pushScene(
    new Scene("cena1")
    .addObject(
        new GObject("objeto1")
        .addComponent(new MyComponent)
    )
)
.initGame()
.updateNRender()

/* PILE ASTRO MARKUP LANGUAGE .paml
<paml>
    <GameWindow name="tela" width=512 height=512>
        <Scene name="cena1">
            <GObject name="objeto1">
                <Component name="Transform"></Component>
                <Component name="MyComponent"></Component>
            </GObject>
        </Scene>
    </GameWindow>
</paml>
*/