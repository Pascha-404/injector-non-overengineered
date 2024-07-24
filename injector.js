// prettier-ignore
const translations = {/* TRANSLATIONS_JSON */};

String.prototype.stripNormalize = function () {
	return this.replace(/s\+/g, ' ').trim();
};
