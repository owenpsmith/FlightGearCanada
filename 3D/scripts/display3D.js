var canvas;
var details;
var loading;
var viewer;
var current;
var models;

function load3D(modelsToLoad)
{
    models = modelsToLoad;

	canvas = document.getElementById("canvas");
	details = document.getElementById("details");
	loading = document.getElementById("loading");
	viewer = new HG.Viewer(canvas);
	current = 0;

	resize();
	createGallery();
	showModel(models[current]);
};

function resize()
{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight - 110 - 45;

	window.addEventListener("resize", function(event)
	{
		viewer.onResize(window.innerWidth, window.innerHeight);
	}, false);
};

function createGallery()
{
	for (var i = 0; i < models.length; ++ i)
	{
		var img = document.createElement("img");

		img.id = "img" + i;
		img.className = "thumbnail" + (i === current? " selected": "");
		img.src = models[i].thumbPath;
		img.alt = models[i].thumbPath;
		img.title = models[i].acName + " - " + models[i].operator;
		img.style.left = (5 + 128 * i) + "px";
		img.onclick = onClick;

		document.body.appendChild(img);
	}
};

function onClick()
{
	var selected = parseInt( this.id.substring(3) );

	if (current !== selected){

		var img = document.getElementById("img" + current);
		img.setAttribute("class", "thumbnail");

		current = selected;
		this.setAttribute("class", "thumbnail selected");

		showModel(models[current]);
	}
};

function showModel(model)
{
	var infoHTML = "";
	loading.style.display = "block";

	infoHTML += "<p id='name'>"         + model.acName + " - " + model.operator  + "</p>\n";
	infoHTML += "<p id='modelAuthor'>"  + "Model by "          + model.modAuthor + "</p>\n";
	infoHTML += "<p id='liveryAuthor'>" + "Livery by "         + model.livAuthor + "</p>\n";

	details.innerHTML = infoHTML;

	console.log("Loading model " + model.modelPath);

    var params = {callback: onLoaded, texturePath: model.liveryPath, setup: model.setup};
	viewer.show(model.modelPath, params);
};

function onLoaded()
{
	loading.style.display = "none";
};



