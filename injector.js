// prettier-ignore
const translations = {/* TRANSLATIONS_JSON */};

String.prototype.stripNormalize = function () {
	return this.replace(/s\+/g, ' ').trim();
};

const replaceTextContent = (selector, translations) => {
	document.querySelectorAll(selector).forEach(element => {
		const originalText = element.innerHTML.stripNormalize();
		if (translations[originalText].stripNormalize()) {
			element.innerHTML = translations[originalText].stripNormalize();
		}
	});
};
