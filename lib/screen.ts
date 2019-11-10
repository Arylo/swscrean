import { screen } from "electron";

const DEFAULT_SCREEN_ODBJECT = {
    x: 0,
    y: 0,
    main: { width: 480, height: 320 },
    display: { width: 800, height: 600 },
    screens: []
};

let ext: { [key: string]: any } = {};

export function parserScreen() {
    const { x, y, width, height } = screen.getPrimaryDisplay().bounds;
    const [pw, ph] = [Math.floor(width / 24), Math.floor(height / 24)];
    ext = { ...ext, x, y, screens: [{ width, height, pw, ph }] };
    ext = {
        ...ext,
        main: {
            ...DEFAULT_SCREEN_ODBJECT.main,
            x: 0,
            y: 0,
            width: Math.ceil(pw * 8),
            // height: Math.ceil(pw * 6),
            height: Math.ceil(ph * 16)
        }
    };
    ext = {
        ...ext,
        display: {
            ...DEFAULT_SCREEN_ODBJECT.display,
            x: ext.main.width + 1,
            y: 0,
            width: Math.ceil(pw * 16),
            height: Math.ceil(pw * 12)
        }
    };
}

export function getObject() {
    return { ...DEFAULT_SCREEN_ODBJECT, ...ext };
}
