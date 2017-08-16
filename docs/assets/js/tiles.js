
var CreateTiles = function (element, contents) {
	var div = document.createElement('div');
	var img = document.createElement('img');
	var p = document.createElement('p');
	var a = document.createElement('a');

	var link = a.cloneNode();
	var tile = div.cloneNode();
	var image = img.cloneNode();
	var title = div.cloneNode();
	var description = div.cloneNode();

	link.setAttribute('class', 'link');
	tile.setAttribute('class', 'tile');
	image.setAttribute('class', 'image');
	title.setAttribute('class', 'title');
	description.setAttribute('class', 'description');

	contents.forEach(function (content, index) {
		var tileClone = tile.cloneNode(true);
		var container = null;

		if (content.link) {
			var linkClone = link.cloneNode(true);
			linkClone.href = content.link;
			tileClone.appendChild(linkClone);
			container = linkClone;
		} else {
			container = tileClone;
		}

		if (content.image) {
			var imageClone = image.cloneNode(true);
			imageClone.src = content.image;
			container.appendChild(imageClone);
		}

		if (content.title) {
			var titleClone = title.cloneNode(true);
			titleClone.innerText = content.title;
			container.appendChild(titleClone);
		}

		if (content.description) {
			var descriptionClone = description.cloneNode(true);
			descriptionClone.innerText = content.description;
			container.appendChild(descriptionClone);
		}

		element.appendChild(tileClone);
	});
};
 
// var CreateTiles = function (element, contents) {
// 	var div = document.createElement('div');
// 	var img = document.createElement('img');
// 	var p = document.createElement('p');
// 	var a = document.createElement('a');
//
// 	var link = a.cloneNode();
// 	var tile = div.cloneNode();
// 	var tileLink = div.cloneNode();
// 	var image = div.cloneNode();
// 	var title = div.cloneNode();
// 	var description = div.cloneNode();
//
// 	link.setAttribute('class', 'link');
// 	tile.setAttribute('class', 'tile');
// 	tileLink.setAttribute('class', 'tile');
// 	image.setAttribute('class', 'image');
// 	title.setAttribute('class', 'title');
// 	description.setAttribute('class', 'description');
//
// 	image.appendChild(img.cloneNode());
// 	title.appendChild(p.cloneNode());
// 	description.appendChild(p.cloneNode());
//
// 	link.appendChild(image.cloneNode(true));
// 	link.appendChild(title.cloneNode(true));
// 	link.appendChild(description.cloneNode(true));
// 	tileLink.appendChild(link.cloneNode(true));
//
// 	tile.appendChild(image.cloneNode(true));
// 	tile.appendChild(title.cloneNode(true));
// 	tile.appendChild(description.cloneNode(true));
//
// 	contents.forEach(function (content, index) {
// 		var tileLinkClone = tileLink.cloneNode(true);
// 		var tileClone = tile.cloneNode(true);
//
// 		if (content.link) {
// 			tileLinkClone.firstChild.href = content.link;
// 			tileLinkClone.firstChild.children[0].firstChild.src = content.image;
// 			tileLinkClone.firstChild.children[1].firstChild.innerText = content.title;
// 			tileLinkClone.firstChild.children[2].firstChild.innerText = content.description;
// 			element.appendChild(tileLinkClone);
// 		} else {
// 			tileClone.children[0].firstChild.src = content.image;
// 			tileClone.children[1].firstChild.innerText = content.title;
// 			tileClone.children[2].firstChild.innerText = content.description;
// 			element.appendChild(tileClone);
// 		}
//
// 	});
// };
