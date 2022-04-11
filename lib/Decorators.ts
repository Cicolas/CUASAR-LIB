// deno-lint-ignore no-explicit-any
export function dontDestroy(constructor: any) {
    return class extends constructor {
        dontDestroy = true;
    };
}