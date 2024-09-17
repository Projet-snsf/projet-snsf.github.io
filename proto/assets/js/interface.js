const maps = document.querySelector('.maps');
const activer = document.querySelector('.activer-left');
const sider = document.querySelector('.aside-left');
const insider = document.querySelector('.insider-left');
const fhl = document.querySelector('.fhl');


activer.addEventListener('click', function(){
    sider.classList.toggle ('active-left')
    sider.classList.remove ('side')
    insider.classList.toggle ('insider-left')
    fhl.classList.toggle ('off')
})


// ----------------------------------------
const activera = document.querySelector('.activer-right');
const sidera = document.querySelector('.aside-right');
const insidera = document.querySelector('.insider-right');
const fhr = document.querySelector('.fhr');

activera.addEventListener('click', function(){
    sidera.classList.toggle ('active-right')
    sidera.classList.remove ('sidera')
    insidera.classList.toggle ('opacity')
    insidera.classList.toggle ('insider-right')
    fhr.classList.toggle ('off')
})


function openTab(evt, tabName) {
    var i, tabContent, tabButtons;
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
  
    tabButtons = document.getElementsByClassName("tab-button");
    for (i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }
  
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active");
  }
  
  var indexer = document.getElementById('indexer');
  var indexerValue = document.getElementById('indexerValue');
  indexer.addEventListener('input',(e)=>{indexerValue.textContent = e.target.value})
  