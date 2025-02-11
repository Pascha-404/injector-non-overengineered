// prettier-ignore
const translations = {/* TRANSLATIONS_JSON */};

// Utlity Functions

const countMatches = (array1, array2) => {
	return array1.filter(element => array2.includes(element)).length;
};

const getQueryParam = param => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get(param);
};

const applyPlaceholders = (text, placeholderArray) => {
	let textContent = text;
	placeholderArray.forEach(placeholder => {
		textContent = textContent.replace(
			new RegExp(placeholder.name, 'g'),
			placeholder.value
		);
	});
	return textContent;
};

const stripNormalize = str => {
	return str.replace(/\s+/g, ' ').trim();
};

function capitalizeFirstLetter(string) {
	return string[0].toUpperCase() + string.slice(1);
}

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

 /* Function that creates a element and replaces a existing element with the new one
 	@newElement - element type, for example: 'p', 'div', 'h1' ...
 	@toReplace - the element that should be replaced, should be of type HTMLElement
 	@innerHtml - defines the innerHTML attribute of the new created element */
const createAndReplace = (newElement, toReplace, innerHtml) => {
	const element = document.createElement(newElement);
	element.innerHTML = innerHtml;
	toReplace.replaceWith(element);

	return element;
};

// Replacement Functions

const replaceTextContent = (selector, translations) => {
	document.querySelectorAll(selector).forEach(element => {
		const originalText = stripNormalize(element.innerHTML);
		let foundTranslation = null;

		for (let key in translations) {
			if (stripNormalize(key) === originalText) {
				foundTranslation = stripNormalize(translations[key]);
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
				element.setAttribute(attr, stripNormalize(translations[originalAttrValue]));
			}
		});
	});
};

const replaceDateTime = selector => {
	document.querySelectorAll(selector).forEach(element => {
		setInterval(() => {
			element.innerHTML = createDateTime();
		}, 1000);
		element.setAttribute('id', `${element.getAttribute('id')}-updated`);
	});
};

const modifyCurrencyFormat = selector => {
	document.querySelectorAll(selector).forEach(element => {
		const originalText = element.innerHTML;
		const formatedText = originalText.replace(
			/(\d+)\.(\d{2})\s*(\D)/g,
			(match, beforeDot, afterDot) => {
				return `${beforeDot},${afterDot} €`;
			}
		);
		element.innerHTML = formatedText;
	});
};

const replaceDynamicText = (targetArray, translations) => {
	targetArray.forEach(target => {
		document.querySelectorAll(target.selector).forEach(element => {
			const originalTextSplit = stripNormalize(element.innerHTML).split(' ');
			for (let key in translations) {
				const matches = countMatches(originalTextSplit, stripNormalize(key).split(' '));
				if (matches === originalTextSplit.length - target.placeholders.length) {
					element.innerHTML = applyPlaceholders(translations[key], target.placeholders);
				}
			}
		});
	});
};

/*  @inptSelector - Selector for linked input
	@selector - Selector for text element that should be replaced */
const replaceItemCountText = (inptSelector, selector) => {
	const inpt = document.querySelector(inptSelector);
	const maxItems = 5;
	const textElement = document.querySelector(selector);
	const newTextElement = createAndReplace(
		'p',
		textElement,
		`Bitte wählen Sie zwischen 1 und 5 Produkten: Aktuelle Gesamtmenge ${
			maxItems - inpt.value
		} weitere Artikel`
	);

	inpt.addEventListener('change', () => {
		newTextElement.innerHTML = `Bitte wählen Sie zwischen 1 und 5 Produkten: Aktuelle Gesamtmenge ${
			maxItems - inpt.value
		} weitere Artikel`;
		modifyCurrencyFormat('#price-display');
	});
};

// Execute Functions

replaceItemCountText('input[name="quantity"]', '#available-items');
replaceDynamicText(
	[
		{
			selector: '#welcome',
			placeholders: [
				{ name: '{Name}', value: capitalizeFirstLetter(getQueryParam('name')) },
			],
		},
	],
	translations
);
modifyCurrencyFormat('#price-display');
replaceDateTime('#current-date-time');
replaceTextContent('h3,p,button', translations);
replaceAttributes('button', ['data-soldout', 'data-adding', 'data-added'], translations);
