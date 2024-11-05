import { Request, Response, NextFunction } from "express";
import colors from "colors";



const logger = (req: Request, res: Response, next: NextFunction) => {

	type MethodColorsType = {
		[key: string]: colors.Color; 
};

	const methodColors: MethodColorsType = {
		GET: colors.green,
		POST: colors.yellow,
		PUT: colors.blue,
		DELETE: colors.red,
	}

	const curColor: colors.Color = methodColors[req.method] || colors.white;

	console.log(
		curColor(`${req.method} ${req.protocol}://${req.get("host")}${req.originalUrl}`)
	);
	next();
};

export default logger;
