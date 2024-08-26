import toHex from 'colornames';
export const calculateRgba = (input, opacity) => {
    let color = '';
    const colorNameHex = toHex(input);
    if (colorNameHex !== undefined) {
        // Remove the leading '#'
        color = colorNameHex.slice(1);
    }
    else if (input.startsWith(`#`)) {
        color = input.slice(1);
    }
    if (color.length === 3) {
        let res = '';
        for (const c of color) {
            res += c;
            res += c;
        }
        color = res;
    }
    const rgbParts = color.match(/.{2}/g);
    if (rgbParts === null) {
        throw new Error(`Could not identify RGB value of color \`${input}\``);
    }
    const rgbValues = rgbParts.map((hex) => Number.parseInt(hex, 16)).join(`, `);
    return `rgba(${rgbValues}, ${opacity})`;
};
