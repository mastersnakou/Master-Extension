
/**
 * Vérifie le variable 'value' et l'initialise à 'defaultValue' si non valide
 * @param {boolean} value variable inconnue
 * @param {boolean} defaultValue valeur par défaut du booléen
 */
function setBool(value, defaultVal) {
	var bool = [0, 1];
	var res = value;

	if (bool.indexOf(value) == -1) {
		res = defaultVal;
	}
	return res;
}

/**
 * Vérifie que la variable 'url' est bien définie dans la liste de la configuration et retourne twitch par défaut
 * @param {string} url Lien vers la page pour regarder le stream 
 */
function setUrlRedirect(url) {
	var res = url;

	if (urls.indexOf(res) == -1) {
		res = "https://www.twitch.tv/";
	}

	return res;
}

/**
* Renvoie la différence en jour entre une date et aujourd'hui
* @param {Date} dateSub Date de resub
*/
function getdiffJour(dateSub) {
	var today = new Date(Date.now());
	var diff = today.getTime() - dateSub.getTime();

	return Math.floor(diff / 86400000);
}

/**
 * Vérifie si l'onglet courant est utilisé ou non puis l'utilise ou en crée un nouveau selon le résultat
 * @param {string} elem élément jquery (classe ou id CSS)
 * @param {boolean} url si true elem est une url de type string
 */
function manageTabs(elem, url = false) {
	var redirectURL = url ? elem : $(elem).attr("href");

	var querying = browser.tabs.query({ currentWindow: true, active: true });
	querying.then(function (tabs) {
		if (tabs[0].url == "about:newtab") {
			var updating = browser.tabs.update({ url: redirectURL });
			updating.then(onUpdated, onError);
		} else {
			var creating = browser.tabs.create({
				url: redirectURL
			});
			creating.then(onUpdated, onError);
		}
		window.close();
	}, onError);

}

function onUpdated(tab) {
	console.log(`Updated tab: ${tab.id}`);
}

function onError(error) {
	console.log(`Error: ${error}`);
}