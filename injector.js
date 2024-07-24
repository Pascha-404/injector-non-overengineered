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