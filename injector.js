// prettier-ignore
const translations = {/* TRANSLATIONS_JSON */};

String.prototype.stripNormalize = function () {
	return this.replace(/\s+/g, ' ').trim();
};

const replaceTextContent = (selector, translations) => {
	document.querySelectorAll(selector).forEach(element => {
		const originalText = element.innerHTML.stripNormalize();
		let foundTranslation = null;

		for (let key in translations) {
			if (key.stripNormalize() === originalText) {
				foundTranslation = translations[key].stripNormalize();
				break;
			}
		}
		if (foundTranslation) {
			element.innerHTML = foundTranslation;
		}
	});
};

const replaceAttributes = (selector, attributes, translations) => {
	document.querySelectorAll(selector).forEach(element => {
		attributes.forEach(attr => {
			const originalAttrValue = element.getAttribute(attr);
			if (translations[originalAttrValue]) {
				element.setAttribute(attr, translations[originalAttrValue].stripNormalize());
			}
		});
	});
};

const createDateTime = () => {
	const now = new Date();
	const day = String(now.getDate()).padStart(2, '0');
	const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
	const year = now.getFullYear();
	const hours = String(now.getHours()).padStart(2, '0'); // 24-hour format
	const minutes = String(now.getMinutes()).padStart(2, '0');
	const seconds = String(now.getSeconds()).padStart(2, '0');
	return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
};

const replaceDateTime = selector => {
	document.querySelectorAll(selector).forEach(element => {
		setInterval(() => {
			element.innerHTML = createDateTime();
		}, 1000);
		element.setAttribute('id', `${element.getAttribute('id')}-updated`);
	});
};

replaceDateTime('#current-date-time');
replaceTextContent('h3,p,button', translations);
replaceAttributes('button', ['data-soldout', 'data-adding', 'data-added'], translations);
