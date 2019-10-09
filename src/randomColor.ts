declare function randomColor(options?: RandomColorOptionsSingle): string;
declare function randomColor(options?: RandomColorOptionsMultiple): string[];

interface RandomColorOptionsSingle {
	hue?: number | string;
	luminosity?: "bright" | "light" | "dark" | "random";
	seed?: number | string;
	format?: "hsvArray" | "hslArray" | "hsl" | "hsla" | "rgbArray" | "rgb" | "rgba" | "hex";
	alpha?: number;
}

interface RandomColorOptionsMultiple extends RandomColorOptionsSingle {
	count: number;
}

declare module "randomcolor" {
	export = randomColor;
}
