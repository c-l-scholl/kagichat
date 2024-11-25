
const useCookie = () => {

	const setCookie = (cName: string, value: string, ttl: number) => {
		const date = new Date();
		date.setDate(date.getTime() + (ttl * 24 * 60 * 60 * 1000));
		const utcDate = date.toUTCString();
		document.cookie = `${cName}=${value}; ${utcDate}; path=/`;
	}

	const deleteCookie = (cName: string) => {
		setCookie(cName, "", 0);
	}

	const getCookie = (cName: string): string => {
		const cDecoded = decodeURIComponent(document.cookie);
		const cArray = cDecoded.split("; ");
		cArray.forEach((element) => {
			if (element.indexOf(cName) == 0) {
				return element.substring(cName.length + 1);
			}
		})
		return "";
	}

	return {
		setCookie,
		deleteCookie,
		getCookie
	}
}

export default useCookie;