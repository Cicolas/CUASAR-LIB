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

import MyComponent from "./components/MyComponent";
import PAMLReader from './lib/PAML';

new PAMLReader({
    componentMap: [
        {name: "MyComponent", fun: MyComponent}
    ]
})
.read()
.initGame()
.updateNRender();
