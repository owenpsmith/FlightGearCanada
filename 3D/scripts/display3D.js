var canvas;
var details;
var loading;
var viewer;
var current;
var models;

function load3D(modelsToLoad)
{
    models = modelsToLoad;
    
    if (viewer == null)
    {
		canvas = document.getElementById("canvas");
		details = document.getElementById("details");
		loading = document.getElementById("loading");
		viewer = new HG.Viewer(canvas);
	}
	
	current = 0;

	resize();
	createGallery();
	showModel(models[current]);
};

function resize()
{
	canvas.width = window.innerWidth - 24;
	canvas.height = window.innerHeight - 110 - 35 - 24;

	window.addEventListener("resize", function(event)
	{
		viewer.onResize(window.innerWidth - 24, window.innerHeight - 110 - 45 - 24);
	}, false);
};

function createGallery()
{
	for (var i = 0; i < models.length; ++ i)
	{
		var $gallery = document.getElementById("gallery");
		var img = document.createElement("img");

		img.id = "img" + i;
		img.className = "thumbnail" + (i === current? " selected": "");
		img.src = models[i].thumbPath;
		img.alt = models[i].thumbPath;
		img.title = models[i].acName + " - " + models[i].operator;
		img.style.left = (5 + 128 * i) + "px";
		img.onclick = onClick;

		$gallery.appendChild(img);
	}
};

function onClick()
{
	var selected = parseInt( this.id.substring(3) );

	if (current !== selected)
	{
		var img = document.getElementById("img" + current);
		img.setAttribute("class", "thumbnail");

		if (models[selected].modelPath == models[current].modelPath)
		{
			// same aircraft, just refresh livery
			showLivery(models[selected]);
		}
		else
		{
			// refresh all
			showModel(models[selected]);
		}

		current = selected;
		this.setAttribute("class", "thumbnail selected");
	}
};


function showModel(model)
{
	loading.style.display = "block";
	updateHTML(model);

    var params = {callback: onLoaded, texturePath: model.liveryPath, setup: model.setup};
	viewer.show(model.modelPath, params);
};

function showLivery(model)
{
	updateHTML(model);

	viewer.newLiveryPath(model.liveryPath);
};

function updateHTML(model)
{
	var infoHTML = "";

	infoHTML += "<p id='name'>"         + model.acName + " - " + model.operator  + "</p>\n";
	infoHTML += "<p id='modelAuthor'>"  + "Model by "          + model.modAuthor + "</p>\n";
	infoHTML += "<p id='liveryAuthor'>" + "Livery by "         + model.livAuthor + "</p>\n";

	details.innerHTML = infoHTML;
};

function onLoaded()
{
	loading.style.display = "none";
};



