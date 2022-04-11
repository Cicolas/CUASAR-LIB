import MyComponent from "../components/MyComponent";

var acorn = require("acorn");

export function assertion(condition: any, errorMsg: string) {
    if (!condition) {
        throw errorMsg;
    }
}

export function getClassConstructorParams(cls) {
    const ast = acorn.parse(cls.toString(), {
      ecmaVersion: 2020
    })

    return ast.body[0].params.map(value => value.name);
}

export function construct(constructor, args) {
    function Component() : void {
        constructor.apply(this, args);
    }
    Component.prototype = constructor.prototype;
    const f = new Component();
    return f;
}