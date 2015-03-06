var canvas;
var details;
var loading;
var viewer;
var current;

function load3D()
{
	canvas = document.getElementById("canvas");
	details = document.getElementById("details");
	loading = document.getElementById("loading");
	viewer = new HG.Viewer(canvas);
	current = 0;

	resize();
	createGallery(Models);
	showModel(Models[current]);
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

function createGallery(models)
{
	for (var i = 0; i < models.length; ++ i){
		var img = document.createElement("img");

		img.id = "img" + i;
		img.className = "thumbnail" + (i === current? " selected": "");
		img.src = models[i].thumbnail;
		img.alt = models[i].name;
		img.title = models[i].name;
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

		showModel(Models[current]);
	}
};

function showModel(model)
{
	loading.style.display = "block";

	details.innerHTML = "<p id='name'>" + model.name + "</p>";

console.log("show");
	viewer.show(model.file, model.setup, onLoaded);
console.log("showed");
};

function onLoaded(){
console.log("loaded");
	loading.style.display = "none";
};

