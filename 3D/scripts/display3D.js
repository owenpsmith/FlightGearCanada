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
	canvas.height = window.innerHeight;

	window.addEventListener("resize", function(event)
	{
		viewer.onResize(window.innerWidth, window.innerHeight);
	}, false);
};

function createGallery()
{
	for (var i = 0; i < models.length; ++ i){
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
	var selected = parseInt( this.id.substring( this.id.length - 1 ) );

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
	loading.style.display = "block";

	details.innerHTML = "<p id='name'>" + model.acName + " - " + model.operator + "</p>";
    
    var params = {callback: onLoaded, texturePath: model.liveryPath, setup: model.setup};

//    viewer.show(model.modelPath, model.setup, onLoaded, {texturePath: model.liveryPath});
	viewer.show(model.modelPath, params);
//	viewer.show(model.modelPath, {texturePath: model.liveryPath});
//(filename, {callback: onModelLoaded, texturePath: "path/to/textures/"});

    // TEMPORARY
//    onLoaded();
};

function onLoaded()
{
	loading.style.display = "none";
};



