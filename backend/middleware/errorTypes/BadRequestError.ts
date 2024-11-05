
import { CustomError } from "./CustomError";

export default class BadRequestError extends CustomError {
	private static readonly mStatus = 400;
	readonly status: number;
	readonly mContext: { [key: string]: any };

	constructor(params?: { code?: number, message?: string, context?: { [key: string]: any }}) {
		const { code, message } = params || {};

		super(message || "Bad Request");
		this.status = code || BadRequestError.mStatus;
		this.mContext = params?.context || {};

		Object.setPrototypeOf(this, BadRequestError.prototype);
	}

	get errors() {
		return [{ message: this.message, context: this.mContext }];
	}

	get statusCode() {
		return this.status;
	}

}