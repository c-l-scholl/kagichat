// Also recommended by Mason Hu on Medium
export type CustomErrorContent = {
	message: string,
	context?: { [key: string]: any},
}

export abstract class CustomError extends Error {
	abstract readonly status: number;
	abstract readonly errors: CustomErrorContent[];

	constructor(message: string) {
		super(message);

		Object.setPrototypeOf(this, CustomError.prototype);
	}

	
}