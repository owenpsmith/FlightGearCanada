var canvas;
var details;
var loading;
var viewer;
var current;

function load3D(){
console.log("load3D() - 1");
  canvas = document.getElementById("canvas");
console.log("load3D() - 2");
  details = document.getElementById("details");
console.log("load3D() - 3");
  loading = document.getElementById("loading");
console.log("load3D() - 4");
  viewer = new HG.Viewer(canvas);
console.log("load3D() - 5");
  current = 0;

  resize();
console.log("load3D() - 6");
  createGallery(Models);
console.log("load3D() - 7");
  showModel(Models[current]);
console.log("load3D() - 8");
};

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize",
    function(event){
      viewer.onResize(window.innerWidth, window.innerHeight);
    }, false);
};

function createGallery(models){
  for (var i = 0; i < models.length; ++ i){
    var img = document.createElement("img");

    img.id = "img" + i;
    img.className = "thumbnail" + (i === current? " selected": "");
    img.src = models[i].thumbnail;
    img.alt = models[i].name;
    img.title = models[i].name;
    img.style.left = (5 + 100 * i) + "px";
    img.onclick = onClick;

    document.body.appendChild(img);
  }
};

function onClick(){

	var selected = parseInt( this.id.substring( this.id.length - 1 ) );

	if (current !== selected){

		var img = document.getElementById("img" + current);
		img.setAttribute("class", "thumbnail");

		current = selected;
		this.setAttribute("class", "thumbnail selected");

		showModel(Models[current]);
	}
};

function showModel(model){
console.log("showModel() - 1");
	loading.style.display = "block";
console.log("showModel() - 2");

	details.innerHTML = "<p id='name'>" + model.name + "</p>";
console.log("showModel() - 3");

	viewer.show(model.file, model.setup, onLoaded);
console.log("showModel() - 4");
};

function onLoaded(){
	loading.style.display = "none";
};

