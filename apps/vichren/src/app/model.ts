/**
 * Common model (base).
 */
export class Model {
    /**
     * Creates a model with an optional initial content.
     */
    constructor(...args) {
        args.length && Object.assign(this, ...args);
    }

    clone(...args) {
        return new Model(...args);
    }
}
