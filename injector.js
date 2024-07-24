// prettier-ignore
const translations = {/* TRANSLATIONS_JSON */};

String.prototype.stripNormalize = function () {
	return this.replace(/\s+/g, ' ').trim();
};

const replaceTextContent = (selector, translations) => {
	document.querySelectorAll(selector).forEach((element, idx) => {
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

replaceTextContent('h3,p,button', translations);
replaceAttributes('button', ['data-soldout', 'data-adding', 'data-added'], translations);
