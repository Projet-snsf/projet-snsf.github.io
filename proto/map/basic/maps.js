


var pseudo =document.getElementById('pseudo').textContent;
// var geojsons;
var map;
// ------------------------------------LAYERS-----------------------------
var osm ='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
var osmt ='http://a.tile.opentopomap.org/{z}/{x}/{y}.png'
var gsat ='https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
var gmap ='https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'
var ghyd ='http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}'
var arc ='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png'

// ------------------------------------LAYERS-----------------------------
// ---------------------MAP INITIALISATION-------------------------------
 map = L.map('map',{
    fullscreenControl: true,
    fullscreenControlOptions: { // optional
        title:"Plein Ecran !",
        titleCancel:"Sortir du plein Ecran"
    }}).setView([7.98, -5.59], 7);

//-----------------MAP INITIALISATION--------------------------------

// --------------------MAP SETS-------------------------------
var layerosm =  L.tileLayer(osm, {minZoom: 1});
var layerosmt =  L.tileLayer(osmt, {maxZoom: 25});
var layergsat =  L.tileLayer(gsat, {maxZoom: 20});
var layergmap =  L.tileLayer(gmap, {maxZoom: 20});
var layerghyd = L.tileLayer(ghyd,{ maxZoom: 20,subdomains:['mt0','mt1','mt2','mt3']})
var layerarc =  L.tileLayer(arc, {maxZoom: 20});
// --------------------MAP SETS--------------------------------

var baseMaps = {
    'OpenStreetMap': layerosm,
    'OSM Topographic': layerosmt,
    'Google Satellite':layergsat,
    'Google Maps':layergmap,
    'Google Hydrid':layerghyd,
    'ESRI Imagery':layerarc,
}

//------------------DATA---------------------------------
const lim = L.geoJSON(limciv,{
    style : function (feature) {
            return {
            color: 'black',
            fillColor : 'none',
            opacity: '1'}
        }})

// -----------Centroides------------------       
var simbo = {
            radius: 5,
            fillColor: "grey",
            color: "white",
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.3,
  };

 
var centro = L.geoJSON(centroides,{
    onEachFeature: function (feature, layer) {
        const popupContent =
            '<h6 class = "headpop">Points alertes standards</h6>' +
            '<div class="container"><table class="table table-striped">' +
            "<thead><tr><th>Proprietes</th><th>Valeurs</th></tr></thead>" +
            "<tbody><tr><td> ID </td><td>" +
            feature.properties.id+
            "</td></tr>" +
            "<tr><td>DN </td><td>" +
            feature.properties.DN +
            "<tr><td>Date </td><td>" +
            feature.properties.date +
            "</td></tr>" +
            "<tr><td>Cadastre</td><td>" +
            feature.properties.cadastr +
            "</td></tr>" +
            "<tr><td> Sous prefecture</td><td>" +
            feature.properties.sous_pref +
            "</td></tr>";
        layer.bindPopup(popupContent);},
        pointToLayer: function (feature, latlng) { return L.circleMarker(latlng,simbo)}       
})


const popContainer = document.querySelector('.popContainer');
const popHeader = document.querySelector('.popHeader');
const popBtn = document.querySelector('.popHeader i');
const popContent = document.querySelector('.popContent');
const miniCloser = document.querySelector('.mini-closer');
const miniMapper = document.querySelector('.miniMapper');
popBtn.addEventListener('click',  ()=>{
  popContainer.style.transition="all 0.8s ease";
popContainer.style.right="-200%"
})

miniCloser.addEventListener('click',()=>{document.getElementById('mini-map').style.display="none"})
miniMapper.addEventListener('click',()=>{document.getElementById('mini-map').style.display="block"})

var miniMap;
function runForEachFeature(feature,layer){
  layer.on('click', function () {
      popContainer.style.right = '0%';
      popContent.innerHTML = poppercontent(feature);
      if (miniMap) { miniMap.remove()}
      miniMap= L.map('mini-map', {
        zoomControl: true, 
        attributionControl: false 
      }).setView([layer.getLatLng().lat, layer.getLatLng().lng], 12);

      var miniTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(miniMap);
      miniMap.eachLayer(function (l) {if (l != miniTile) {miniMap.removeLayer(l)}});
      L.geoJSON(feature).addTo(miniMap);
});
};

    function poppercontent(feature) {   
         if (feature.properties.Nature_alerte =='Alerte positive') {
          return ` 
            <div id="container-tab">
                <table class="table table-bordered poptab">
                    <tbody>
                      <tr><td><i class="fa fa-address-card"></i></td><td>Noms </td><td class="text-primary">
                          ${feature.properties.Noms} 
                      </td></tr>
                      <tr><td><i class="fa fa-address-card"></i></td><td>Numero </td><td class="text-primary">
                          ${feature.properties.Telephone} 
                      </td></tr>
                      <tr><td><i class="fa fa-address-card"></i></td><td>Adresse_mail </td><td class="text-primary">
                          ${feature.properties.Email}
                      </td></tr>
                      <tr><td><i class="fa fa-address-card"></i></td><td>Structure</td><td class="text-primary">
                          ${feature.properties.Structure}
                      </td></tr>
                      <tr><td><i class="fa fa-address-card"></i></td><td>Date_observation </td><td class="text-primary">
                          ${feature.properties.Date_observation}
                      </td></tr> 
                      <tr><td><i class="fas fa-layer-group"></i></td><td>ID_Alerte </td><td class="text-primary">
                          ${feature.properties.ID_Alerte}
                      </td></tr>
                      <tr><td><i class="fas fa-layer-group"></i></td><td>ID_Alerte </td><td class="text-primary">
                          ${feature.properties.Nature_alerte}
                      </td></tr>
                      <tr><td><i class="fas fa-layer-group"></i></td><td>Zone Cadastrale </td><td class="text-primary">
                          ${feature.properties.Zone_cadastrale}
                      </td></tr>
                      <tr><td><i class="fas fa-layer-group"></i></td><td>Annee_deforestation </td><td class="text-primary">
                          ${feature.properties.Annee_deforestation}
                      </td></tr>
                      <tr><td><i class="fas fa-layer-group"></i></td><td>Evaluation urgence </td><td class="text-primary momomo">
                          ${feature.properties.Evaluation_urgence}
                      </td></tr>
                      <tr><td><i class="fas fa-layer-group"></i></td><td>Description alerte </td><td class="text-primary momomo">
                          ${feature.properties.Description_alerte}
                      </td></tr>
                      <tr><td><i class="fas fa-layer-group"></i></td><td>Cause_deforestation </td><td class="text-primary momomo">
                          ${feature.properties.Cause_deforestation}
                      </td></tr>
                    </tbody>
              </table>
                <div class="collapsible">
                 <h3  onclick="collapser()"> <i class="fas fa-images"></i> <span> GALLERIE PHOTOS <i class="fas fa-angle-down galIcon"></i></span></h3>
                    <div class="photoManer content">
                        <div class="thumbnail-container" onclick="openImage('map/photos/${feature.properties.Photographie_gps}')"><img src="map/photos/${feature.properties.Photographie_gps}" alt="gps"><div class="zoom-icon"><i class="fas fa-arrows-to-eye"></i> GPS</div></div>
                        <div class="thumbnail-container" onclick="openImage('map/photos/${feature.properties.Photo_Nord}')"><img src="map/photos/${feature.properties.Photo_Nord}" alt="alerte"><div class="zoom-icon"><i class="fas fa-arrows-to-eye"></i> NORD</div></div>
                        <div class="thumbnail-container" onclick="openImage('map/photos/${feature.properties.Photo_Ouest}')"><img src="map/photos/${feature.properties.Photo_Ouest}" alt="nord"><div class="zoom-icon"><i class="fas fa-arrows-to-eye"></i> OUEST</div></div>
                        <div class="thumbnail-container" onclick="openImage('map/photos/${feature.properties.Photo_Sud}')"><img src="map/photos/${feature.properties.Photo_Sud}" alt="ouest"><div class="zoom-icon"><i class="fas fa-arrows-to-eye"></i> SUD</div></div>
                        <div class="thumbnail-container" onclick="openImage('map/photos/${feature.properties.Photo_Sud}')"><img src="map/photos/${feature.properties.Photo_Est}" alt="sud"><div class="zoom-icon"><i class="fas fa-arrows-to-eye"></i> EST</div></div>
                    </div> 
                </div> 
              
              `
}

else {
    return ` 
          <div class="container-tab">
            <table class="table table-bordered poptab">
              <tbody>
                <tr><td><i class="fa fa-address-card"></i></td><td>Noms </td><td class="text-primary">
                   ${feature.properties.Noms} 
                </td></tr>
                <tr><td><i class="fa fa-address-card"></i></td><td>Numero </td><td class="text-primary">
                   ${feature.properties.Telephone} 
                </td></tr>
                <tr><td><i class="fa fa-address-card"></i></td><td>Adresse_mail </td><td class="text-primary">
                   ${feature.properties.Email}
                </td></tr>
                <tr><td><i class="fa fa-address-card"></i></td><td>Structure</td><td class="text-primary">
                   ${feature.properties.Structure}
                </td></tr>
                <tr><td><i class="fa fa-address-card"></i></td><td>Date_observation </td><td class="text-primary">
                   ${feature.properties.Date_observation}
                </td></tr> 
                <tr><td><i class="fas fa-layer-group"></i></td><td>ID_Alerte </td><td class="text-primary">
                   ${feature.properties.ID_Alerte}
                </td></tr>
                <tr><td><i class="fas fa-layer-group"></i></td><td>ID_Alerte </td><td class="text-primary">
                   ${feature.properties.Nature_alerte}
                </td></tr>
                <tr><td><i class="fas fa-layer-group"></i></td><td>Zone Cadastrale </td><td class="text-primary">
                   ${feature.properties.Zone_cadastrale}
                </td></tr>
                <tr><td><i class="fas fa-layer-group"></i></td><td>Nature Occupation</td><td class="text-primary">
                   ${feature.properties.Nature_ods}
                </td></tr>
              </tbody>
            </table> `
}
}
function openImage(mg) {
  const imgCont = document.getElementById('popContentImg')
  const img = document.getElementById('largeImage')
  imgCont.style.zIndex="9999";
  imgCont.style.display="block";
  img.src =mg;
  console.log(mg);
}
function closeModal(){
document.getElementById('popContentImg').style.display="none"
}



// --------------------------------------------------------------------------------------------------
var surveys = L.geoJSON(surveydatas,{
        style: {color: 'red', weight:"0", opacity:"0", fillColor : "white", fillOpacity:"0",radius: 1},
        onEachFeature:runForEachFeature,
        pointToLayer: function (feature, latlng) { return L.circleMarker(latlng)}       
}).addTo(map);

const surveycluster = L.markerClusterGroup().addLayer(surveys);
// -------------------------------------------------------------------------------------------------


function dataBuilder(geojson) {
    if (map) {map.remove()}
    map = L.map('map',{
      fullscreenControl: true,
      fullscreenControlOptions: { // optional
          title:"Plein Ecran !",
          titleCancel:"Sortir du plein Ecran"
      }}).setView([7.98, -5.59], 7);
      layerosm.addTo(map)
    map.addLayer(surveycluster);
    centro.addTo(map);
    lim.addTo(map);


    var global = L.geoJSON(geojson)
    if (geojson.length>1) {map.fitBounds(global.getBounds())}
    var uler = document.querySelector('.idListView');
    var falertes = geojson.filter(geo=>{return geo.properties.Nature_alerte==="Fausse alerte"})
    var palertes = geojson.filter(geo=>{return geo.properties.Nature_alerte==="Alerte positive" && geo.geometry.type ==="Point"})
    var polalertes = geojson.filter(geo=>{return geo.properties.Nature_alerte==="Alerte positive" && geo.geometry.type ==="Polygon"})
    var pomixalertes = geojson.filter(geo=>{return geo.properties.Nature_alerte==="Alerte positive"})

    document.getElementById('resPositive').textContent=pomixalertes.length;
    document.getElementById('resNormal').textContent=geojson.length;
    document.getElementById('resNegative').textContent=falertes.length;

    var geofalertes= L.geoJSON(falertes,{
          style: { color : "green" ,fillColor:"green", fillOpacity:"1"},
      onEachFeature:runForEachFeature,
      pointToLayer: function (feature, latlng) { return L.circleMarker(latlng)} 
    }).addTo(map)

    var geopalertes= L.geoJSON(palertes,{
      style: { color : "red" ,fillColor:"red", fillOpacity:"1"},
      onEachFeature:runForEachFeature,
      pointToLayer: function (feature, latlng) { return L.circleMarker(latlng)}  
    }).addTo(map)

    var geopolalertes = L.geoJSON(polalertes,{
      style: { color : "red" ,fillColor:"none", fillOpacity:"1"},
        onEachFeature:runForEachFeature,
        pointToLayer: function (feature, latlng) { return L.circleMarker(latlng)} 
    }).addTo(map)
    
//----------PRINTER----------
L.control.browserPrint().addTo(map);

//----------SCALER----------
L.control.scale({
    metric : true,
    imperial : false,
    maxWidth: 100,
    weight:1,
    position: 'bottomright',
}).addTo(map);


//--------------ZOOMER------------
map.on('enterFullscreen', function(){
    if(window.console) window.console.log('enterFullscreen');
});
map.on('exitFullscreen', function(){
    if(window.console) window.console.log('exitFullscreen');
});

// -------LOGO------------------------------
L.Control.Watermark = L.Control.extend({
    onAdd:function(map) {
    var img = L.DomUtil.create('img');
    img.src = 'assets/logo/dark.png';
    img.style.width = "40px";
    img.style.marginBottom='6px';
    img.style.marginLeft='8px';
    return img;},
    onRemove : function(map) {},});
    L.control.watermark = function (opts) {
        return new L.Control.Watermark(opts);
    }; L.control.watermark({position:'bottomleft'}).addTo(map);

//--------COORDINATES CONTROL----------
L.control.coordinates({
        useDMS : false,
        useLatLngOrder: true
    }).addTo(map)


//-------SEARCH CONTROL--------------
const searchControl = new L.Control.Search({
    layer : surveys,
    zoom : 18,
    propertyName : "ID_Alerte"
});
map.addControl(searchControl);

const compass =new L.Control.Compass({position: 'bottomright',autoActive: true,	showDigit: true,})
map.addControl( compass);


  var drawnItems = new L.FeatureGroup();
      map.addLayer(drawnItems);

      var drawControl = new L.Control.Draw({
        edit: {featureGroup: drawnItems},
        draw: {
          rectangle: {shapeOptions: {color: 'red', fillColor: 'transparent',},},
          polygon: {shapeOptions: {color: 'red', fillColor: 'transparent',  },},
          circle: false,circlemarker:false,marker: true,polyline: false,polygon: true
        },});

      map.addControl(drawControl);
      map.on('draw:created', function (e) {
        var type = e.layerType,
          layer = e.layer;
        drawnItems.addLayer(layer);
  
    });


  




// ------------------------------------------
var Couches = {
    'Limite CIV':lim, 
    'Masques':surveycluster ,
    'Alertes standards':centro ,
    'Fausse Alerte':geofalertes,
    'Alerte Positive':geopalertes,
    'Surface Positive':geopolalertes,

}

L.control.layers(baseMaps,Couches).addTo(map);

//-------GEOCODER CONTROL--------------
L.Control.geocoder({position: 'topright',
  geocoder: L.Control.Geocoder.nominatim()
}).addTo(map);



var addbtn = L.Control.extend({
  options: {position: 'topleft'},
  onAdd: function(map) {
      var container = L.DomUtil.create('div', 'leaflet-control');
      container.innerHTML = '<div class="noteBtns"><button title="Afficher les notes" class="btns active adder"  onclick="adder()"><i class="fas fa-ad"></i></button> <button title="Masquer les notes"  class="btns remover"  onclick="remover()"><i class="fas fa-delete-left"></i></button> </div>';
      return container;
  }
});
map.addControl(new addbtn());

var MS = L.control
.notifications({
  //  className: 'pastel' ,
   className: 'modern' ,
    timeout: 3000,
    position: 'topright',
    closable: true,
    dismissable: true,
})
.addTo(map);

var ML = L.control
.notifications({
  //  className: 'pastel' ,
   className: 'modern' ,
    timeout: 60000,
    position: 'topright',
    closable: true,
    dismissable: false,
})
.addTo(map);


  map.on(L.Draw.Event.CREATED, function (event) {
    var layer = event.layer;
    drawnItems.addLayer(layer);
    var geojson = layer.toGeoJSON();
    var geotype = event.layerType;
          layer.bindPopup('<form class="noteForm"><textarea id="propertiesInput"  placeholder="Ajouter Une Note"></textarea> <br/> <input onclick="viewer(event)" class="btn-success"  id="popupForm" type="button" value="Ajouter"/></form>');
          layer.openPopup() 
          $('#popupForm').click(function(event) {
                var note = $('#propertiesInput').val();
                var coordo = geojson.geometry.coordinates;
                geojson.properties.note=note
                var geojsons = JSON.stringify(geojson)
                layer.closePopup();

                $.ajax({
                    url: 'layouts/save_note.php',
                    type: 'POST',
                    data: {noms:pseudo,geojson:geojsons, coordo: JSON.stringify(coordo),geotype:geotype, note: note },
                    success: function(response) {console.log(response),MS.info("!!!!","Note bien réçue")},
                    error: function(xhr, status, error) { console.error('Erreur: ' + error)}
                  });
            })
    
});




    uler.innerHTML= geojson.map(element => {
      if (element.properties.Nature_alerte=="Alerte positive") {
        return ` <li class="mapItem mapPos">
                    <span title="Id alerte" class="btn-danger mapids">${element.properties.ID_Alerte || "Inconnu"}</span>
                    <span class="mapItemBtns">
                      <span title="Zoom centré" onclick="fitIn(${element.geometry.coordinates[0]},${element.geometry.coordinates[1]})" class="btn-secondary"><i class="fas fa-search-plus"></i></span>
                      <span title="zoom animé" onclick="fullIn(${element.geometry.coordinates[0]},${element.geometry.coordinates[1]})" class="btn-secondary"><i class="fas fa-arrows-to-circle"></i></span>
                    </span>
                </li>`
      }
      else{
        return ` <li class="mapItem mapNeg">
                    <span title="Id alerte" class="btn-success mapids">${element.properties.ID_Alerte || "Inconnu"}</span>
                      <span class="mapItemBtns">
                      <span title="Zoom centré" onclick="fitIn(${element.geometry.coordinates[0]},${element.geometry.coordinates[1]})" class="btn-secondary"><i class="fas fa-search-plus"></i></span>
                      <span title="zoom animé" onclick="fullIn(${element.geometry.coordinates[0]},${element.geometry.coordinates[1]})" class="btn-secondary"><i class="fas fa-arrows-to-circle"></i></span>
                    </span>
                </li>`

      }
        
                  }).join('');
  
}


function fullIn(lng, lat) {
  map.flyTo([lat,lng],18,{duration:2})
  var pos = L.marker([lat,lng])
  setTimeout(() => {pos.addTo(map).bindPopup('point').openPopup()}, 2500);
  setTimeout(() => {pos.remove()}, 8000);
  
}

function fitIn(lng, lat) {
  map.fitBounds([[lat,lng]],4)
  var pos = L.circle([lat,lng],{radius:10,fillOpacity:0})
  setTimeout(() => {pos.addTo(map).bindPopup('point').openPopup()}, 100);
  setTimeout(() => {pos.remove()}, 8000);
  
}

function viewer(evt) {console.log(evt)}

function remover ()  {
 map.eachLayer(function(layer) { if (layer instanceof L.Marker || layer instanceof L.Polygon && layer.options.title=="note") { map.removeLayer(layer)}});};
     
 function adder () {remover();
  fetch('layouts/get_note.php')
          .then(response => response.json())
          .then(data =>{
            console.log(data)
            data.forEach(element => {
              if (element.geotype=="marker") { 
                L.marker(element.coordo.replace('[','').split(',').map(parseFloat).reverse(),{title:"note"}).bindTooltip(element.note,{permanent:true}).addTo(map)}
              else{ 
                var geo = JSON.parse(element.geojson);
                var coordos = geo.geometry.coordinates[0]
                coordos.forEach(cr=>{cr.reverse()})
                var poly = L.polygon(coordos,{title:"note",fillOpacity:0.1}).bindTooltip(element.note,{permanent:true}).addTo(map)
              }
              })})
          .catch(error => console.error('Erreur:', error));} 
// --------------------------------------------------------------------------------------------------------------------

function uppers() {
  console.log(surveydatas);

    var filterForm = document.getElementById('filterForm');
    var Natalerte = document.getElementById('Natalerte');
    var Structurer = document.getElementById('Structurer');
    var Urgence = document.getElementById('Urgence');
    var zonecada = document.getElementById('zonecada');
    var indexer = document.getElementById('indexer');
    var indexerValue = document.getElementById('indexerValue');
    var fid = document.getElementById('fid')
    var findex = document.getElementById('findex');
    var geometry = document.getElementById('geometry');
    var dator = document.getElementById('dator');
    var finb =document.querySelector('.finb')
  
    function updateData() {  
        var selectedNatalerte = Natalerte.value;
        var selectedStructurer = Structurer.value;
        var selectedUrgence = Urgence.value;
        var selectedzonecada = zonecada.value;
        var selectedid =fid.value;
        var selectedindex = findex.value;
        var selectedgeometry = geometry.value;
        var selecteddator = dator.value;
        var indexnb = parseFloat(indexer.value) || 0;
        var filteredGeoJSON = surveydatas.features.filter(function(feature) {
        return (
            (selectedNatalerte === '' || feature.properties.Nature_alerte === selectedNatalerte) &&
            (selectedgeometry === '' || feature.geometry.type === selectedgeometry) &&
            (selectedStructurer === '' || feature.properties.Structure === selectedStructurer) &&
            (selectedUrgence === '' || feature.properties.Evaluation_urgence === selectedUrgence) &&
            (selectedzonecada === '' || feature.properties.Zone_cadastrale === selectedzonecada) &&
            (selectedid === '' || feature.properties.ID_Alerte === selectedid) &&
            (selectedindex === '' || feature.properties._index.toString() === selectedindex) &&
            feature.properties._index >= indexnb  && (selecteddator === '' || feature.properties.Date_observation === selecteddator)
        );
    });
    
    dataBuilder(filteredGeoJSON)
  
    }
  
    filterForm.addEventListener('input', function() {
      updateData(); 
    });
    updateData(); 
  }
uppers()

function graver () { 
    const magers = document.querySelectorAll('.mager');
    magers.forEach(mager => {
        mager.addEventListener('click',function () { 
            mager.classList.toggle('oppo')
         });
    });
 }

function closooo () {document.getElementById('photolab').classList.add('off')};
function logos () {document.getElementById('photolab').classList.remove('off')};

// ----------------- LAYERS CONTROLS ITEMS----------------------------------

//----------------- LAYERS CONTROLS ITEMS----------------------------------
let progress = document.querySelector('.prog');
let totanbss = document.querySelector('.totanbss');
let totanbs = document.querySelector('.totanbs');
let totanbs_en = document.querySelector('.totanbs_en');
let totanbs_dup = document.querySelector('.totanbs_dup');
let totrest = document.querySelector('.totrest');
let totneg = document.querySelector('.totneg');
let totpos = document.querySelector('.totpos');
let topsup = document.querySelector('.topsup');
let totdomaine = document.querySelector('.totdomaine');
let totforet = document.querySelector('.totforet');
let totreserve = document.querySelector('.totreserve');
let totinva = document.querySelector('.totinva');
let toturg1 = document.querySelector('.toturg1');
let toturg2 = document.querySelector('.toturg2');
let toturg3 = document.querySelector('.toturg3');
let toturg4 = document.querySelector('.toturg4');
let toturginva = document.querySelector('.toturginva');
let totid= document.querySelector('.totidva');
let totidinva = document.querySelector('.totidinva');
let idun = document.querySelector('.idun');
let iddup = document.querySelector('.iddup');

totanbss.innerHTML =centroides.features.length;
totaux =centroides.features.length;


function staters() {
  
        const calculerSuperficie = (features) => {
          let superficieTotale = 0;
          features.forEach((feature) => {
            if (feature.geometry.type=='Polygon') {
                  const polygone = turf.polygon(feature.geometry.coordinates);
                  superficieTotale += turf.area(polygone);
            }
          
          });
          return superficieTotale;
        };

        const superficieTotale = calculerSuperficie(surveydatas.features);
        var nb_topsup=parseFloat(superficieTotale/1000000).toFixed(2)+' km²'

        const Id_val = 'ID_Alerte';
        const Id_val_uniques = {};
        const Id_val_dupliques = [];

        const Index_val = '_index';
        const Index_val_uniques = {};
        const Index_val_dupliques = [];

        surveydatas.features.forEach((feature) => {
            const id_pro = feature.properties[Id_val];
            if (feature.properties.ID_Alerte && feature.geometry.type=='Point') {
              if (Id_val_uniques[id_pro]) {
                Id_val_dupliques.push(id_pro);
            } else {
                Id_val_uniques[id_pro] = true;
            }
            }
            
        });

        surveydatas.features.forEach((feature) => {
            const index_pro = feature.properties[Index_val];
            if (Index_val_uniques[index_pro]) {
                Index_val_dupliques.push(index_pro);
            } else {
                Index_val_uniques[index_pro] = true;
            }
        });

        const Index_uniques = Object.keys(Index_val_uniques).length;
        



        const Natpos = 'Nature_alerte';
        const nb_natpos = surveydatas.features.reduce((count, feature) => {
          if (feature.properties && feature.properties[Natpos]) {
            if (feature.properties[Natpos] === 'Alerte positive') {
              return count + 1;
            }
          }
          return count;
        }, 0);

        const Natneg = 'Nature_alerte';
        const nb_natneg = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties[Natneg]) {
            if (feature.properties[Natneg] === 'Fausse alerte') {
              return countneg + 1;
            }
          }
          return countneg;
        }, 0);

        const nb_domaine = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties.Zone_cadastrale) {
            if (feature.properties.Zone_cadastrale === 'Domaine rural') {
              return countneg + 1;
            }
          }
          return countneg;
        }, 0);

        const nb_foret = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties.Zone_cadastrale) {
            if (feature.properties.Zone_cadastrale === 'Forêt classée') {
              return countneg + 1;
            }
          }
          return countneg;
        }, 0);

        const nb_aire = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties.Zone_cadastrale) {
            if (feature.properties.Zone_cadastrale === 'Aires protégées') {
              return countneg + 1;
            }
          }
          return countneg;
        }, 0);

        const nb_inva = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && !feature.properties.Zone_cadastrale) {
              return countneg + 1;
          }
          return countneg;
        }, 0);


        const nb_urg4 = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties.Evaluation_urgence) {
            if (feature.properties.Evaluation_urgence === '4 - Situation critique') {
              return countneg + 1;
            }
          }
          return countneg;
        }, 0);
        const nb_urg1 = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties.Evaluation_urgence) {
            if (feature.properties.Evaluation_urgence === '1 - Faible urgence') {
              return countneg + 1;
            }
          }
          return countneg;
        }, 0);
        const nb_urg2 = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties.Evaluation_urgence) {
            if (feature.properties.Evaluation_urgence === '2 - Moyenne urgence') {
              return countneg + 1;
            }
          }
          return countneg;
        }, 0);
        const nb_urg3 = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties.Evaluation_urgence) {
            if (feature.properties.Evaluation_urgence === '3 - Urgence élevée') {
              return countneg + 1;
            }
          }
          return countneg;
        }, 0);

        const nb_urginva = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties.Nature_alerte=='Alerte positive' && !feature.properties.Evaluation_urgence) {
              return countneg + 1;
          }
          return countneg;
        }, 0);

        const nb_id = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && feature.properties.ID_Alerte) {
              return countneg + 1;
          }
          return countneg;
        }, 0);

        const nb_idinva = surveydatas.features.reduce((countneg, feature) => {
          if (feature.properties && !feature.properties.ID_Alerte) {
              return countneg + 1;
          }
          return countneg;
        }, 0);

    const nombreEntites = surveydatas.features.length;
    totrest.innerHTML=totaux-Index_uniques
    totanbs.innerHTML=nombreEntites
    totpos.innerHTML=nb_natpos
    topsup.innerHTML=nb_topsup
    totneg.innerHTML=nb_natneg
    totdomaine.innerHTML=nb_domaine
    totforet.innerHTML=nb_foret
    totreserve.innerHTML=nb_aire
    totinva.innerHTML=nb_inva
    toturg1.innerHTML=nb_urg1
    toturg2.innerHTML=nb_urg2
    toturg3.innerHTML=nb_urg3
    toturg4.innerHTML=nb_urg4
    toturginva.innerHTML=nb_urginva


    let perco =parseInt((parseInt(nombreEntites) *100 )/parseInt(totaux));
    progress.style.width= perco + "%"
    var pource = document.createElement('span')
    pource.innerHTML = perco + "%"
    pource.className = 'percevalue';
    progress.appendChild(pource)
  

}
staters()


  window.addEventListener('load', function(){
    setTimeout(() => {
      var lds =  document.querySelector('.loading')
      lds.style.opacity ='0.7'
      lds.style.display ='none'   
    }, 1000);
})


function collapser() {
      const collapsible = document.querySelector('.collapsible')
        collapsible.classList.toggle('active');
        const content = collapsible.querySelector('.content');
        if (content.style.display === 'block') {content.style.display = 'none';}
        else {content.style.display = 'block';}

      const headerBtn = collapsible.querySelector('h3');
        headerBtn.classList.toggle('actived')
}
