
function toggleCollapse(element) {
    element.classList.toggle("activa");
}
///////////////////////NAVBAR
document.querySelectorAll('.navbar .nav-buttons button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.navbar .nav-buttons button').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        document.querySelectorAll('.container .section').forEach(section => {
            section.classList.remove('active');
        });
        const target = this.getAttribute('data-target');
        document.getElementById(target).classList.add('active');
    });
});



/////////////////////////////////////
function getDaysBetweenDates(date1, date2) {
    const startDate = new Date(date1);
    const endDate = new Date(date2);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
function updateProgresse() {
    const startDate = '2024-09-01';
    const referenceDate = '2024-10-31';
    const today = new Date().toISOString().split('T')[0];
    const totalDaysPeriod = getDaysBetweenDates(startDate, referenceDate);
    const daysRemaining = getDaysBetweenDates(today, referenceDate);
    const progressPercent = Math.max((daysRemaining / totalDaysPeriod) * 100, 0);
    const radius = 90;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (circumference * (progressPercent / 100));
    document.querySelector('.progress-circler .progress').style.strokeDashoffset = offset;
    document.getElementById('progress-percent').textContent = `${Math.round(progressPercent)}%`;
    document.getElementById('progress-days').textContent = `${daysRemaining} jours restants`;
}

window.onload = function() {
    updateModuleStatus();
    updateProgresse();
};









///////////////////////////EVOLUATIO CIRCULAIRE
document.querySelectorAll('.collapsible').forEach(collapsible => {
    collapsible.addEventListener('click', function () {
        this.classList.toggle('active');
        const content = this.querySelector('.content');
        if (content.style.display === 'block') {
            content.style.display = 'none';
        } else {
            content.style.display = 'block';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.goal-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', updatePro);
    });
    updateAllPro();
});


function updatePro() {
    const sectionNumber = this.getAttribute('data-section');
    if (sectionNumber) {
        updateSectionPro(sectionNumber);
        updateGlobalPro();
    }
}

function updateSectionPro(sectionNumber) {
    const sectionCheckboxes = document.querySelectorAll(`.goal-checkbox[data-section="${sectionNumber}"]`);
    const checkedCount = document.querySelectorAll(`.goal-checkbox[data-section="${sectionNumber}"]:checked`).length;
    const totalCheckboxes = sectionCheckboxes.length;
    const percentage = totalCheckboxes ? (checkedCount / totalCheckboxes) * 100 : 0;
    const dashArray = `${percentage}, 100`;
    
    const section = document.querySelector(`.collapsible[data-section="${sectionNumber}"]`);
    if (section) {
        const sectionProgressCircle = section.querySelector('.section-progress .circle:nth-of-type(2)');
        const sectionProgressPercentage = section.querySelector('.section-progress .percentage');
        if (sectionProgressCircle) {
            sectionProgressCircle.style.strokeDasharray = dashArray;
        }
        if (sectionProgressPercentage) {
            sectionProgressPercentage.textContent = `${Math.round(percentage)}%`;
        }
    }
}

function updateGlobalPro() {
    const allCheckboxes = document.querySelectorAll('.goal-checkbox');
    const checkedCount = document.querySelectorAll('.goal-checkbox:checked').length;
    const totalCheckboxes = allCheckboxes.length;
    const percentage = totalCheckboxes ? (checkedCount / totalCheckboxes) * 100 : 0;
    const dashArray = `${percentage}, 100`;

    const globalProgressCircle = document.querySelector('.progress-circle-container .circle:nth-of-type(2)');
    const globalProgressPercentage = document.querySelector('.progress-circle-container .percentage');
    if (globalProgressCircle) {
        globalProgressCircle.style.strokeDasharray = dashArray;
    }
    if (globalProgressPercentage) {
        globalProgressPercentage.textContent = `${Math.round(percentage)}%`;
    }
}
function updateAllPro() {
    const sectionNumbers = new Set([...document.querySelectorAll('.goal-checkbox')].map(cb => cb.getAttribute('data-section')));
    sectionNumbers.forEach(number => {
        updateSectionPro(number);
    });
    updateGlobalPro();
}







///////////EVOLUTION PAR DATE ET TACHES
const progressCircle = document.querySelector('.progresser-circle');
const progressBar = document.querySelector('.progresser-bar');
const checkboxes = document.querySelectorAll('.goal-checkbox');
const totalTasks = checkboxes.length;
const totalTime = 60; 
let completedTasks = 0;

function getDaysRemaining() {
    const startDate = new Date('2024-09-01'); 
    const currentDate = new Date();
    const timeDiff = currentDate - startDate;
    const daysElapsed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return totalTime - daysElapsed;
}

function updateProgress() {
    const daysRemaining = getDaysRemaining();
    const timeProgress = (totalTime - daysRemaining) / totalTime;
    const taskProgress = completedTasks / totalTasks;
    const overallProgress = (taskProgress - timeProgress) * 100;
    const progressPercentage = taskProgress * 100;
    progressCircle.style.left = `${progressPercentage}%`;
    progressCircle.querySelector('span').textContent = `${Math.round(overallProgress)}%`;

    if (taskProgress > timeProgress) {progressBar.style.backgroundColor = "#406d41ea";}
    else if (taskProgress === timeProgress) {progressBar.style.backgroundColor = "orange";}
     else {progressBar.style.backgroundColor = "#f05630";}

}

function initializeCompletedTasks() {
    completedTasks = [...checkboxes].filter(cb => cb.checked).length;
    updateProgress();
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        completedTasks = [...checkboxes].filter(cb => cb.checked).length;
        updateProgress();
    });
});

initializeCompletedTasks();







//////////////////HISTORICS DES ACTIVITES
 const activities = [
    {
        "activity": "Debut du développment du module 2",
        "startDate": "2024-09-13T10:00:00",
        "endDate": "2024-09-17T11:00:00",
        "comment": "Fin de conception Interface UI de photo-interpretation"
    },
  
    {
        "activity": "Debut du développment du module 2",
        "startDate": "2024-09-12T10:00:00",
        "endDate": "2024-09-12T11:00:00",
        "comment": "Debut du développement du système de mise en cache des images"
    },
    {
        "activity": "Debut du développment du module 2",
        "startDate": "2024-09-10T10:00:00",
        "endDate": "2024-09-10T11:00:00",
        "comment": "Debut du développement du système de recupération des images"
    },

    {
        "activity": "Conception des maquettes",
        "startDate": "2024-09-04T09:00:00",
        "endDate": "2024-09-10T12:00:00",
        "comment": "Conception des maquettes des applications web et mobile)"
    },
    {
        "activity": "Réunion de cadrage",
        "startDate": "2024-09-03T14:00:00",
        "endDate": "2024-09-04T16:00:00",
        "comment": "Discussion sur le chronogrammme et modules du projet"
    }
];

const activitiesList = document.getElementById('activities-list');
const noActivities = document.getElementById('no-activities');

function calculateDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24)); 
    return duration;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function renderActivities(activities) {
    if (activities.length === 0) {
        noActivities.style.display = 'block';
        return;
    }

    noActivities.style.display = 'none';
    activities.forEach((activity, index) => {
        const activityDiv = document.createElement('div');
        activityDiv.classList.add('activity-item');
        
        const duration = calculateDuration(activity.startDate, activity.endDate);

        activityDiv.innerHTML = `
            <div class="activity-header"><i class="fas fa-tachometer-alt"></i>${activity.activity}</div>
            <div class="activity-date"><i class="fas fa-calendar-alt"></i> De ${formatDate(activity.startDate)} à ${formatDate(activity.endDate)}</div>
            <div class="activity-duration"><i class="fas fa-clock"></i> Durée: ${duration} jour(s)</div>
            <div class="activity-comment"><i class="fas fa-comment"></i> ${activity.comment}</div>
        `;

        activitiesList.appendChild(activityDiv);
    });
}

renderActivities(activities);



function updateModuleStatus() {
    var modules = document.querySelectorAll('.collapsible');
    var today = new Date();
    
    var totalChecked = 0;
    var totalTasks = 0;
    var totalOutOfTime = 0;
    var totalPending = 0;

    modules.forEach(moduleDiv => {
        var startDate = moduleDiv.getAttribute('data-start-date');
        var endDate = moduleDiv.getAttribute('data-end-date');
        var start = new Date(startDate);
        var end = new Date(endDate);
        var duration = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        var daysRemaining = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        moduleDiv.querySelector('.duration').textContent = duration+' J';
        moduleDiv.querySelector('.status-indicator').textContent = daysRemaining >= 0 ? daysRemaining : '0';
        var progressPercent =  (daysRemaining * 100 )/ duration;
        var progressCircles = moduleDiv.querySelector('.progressday-circle');
        progressCircles.style.background = `conic-gradient(rgb(14, 87, 14) ${progressPercent}%, #e0e0e0 ${progressPercent}%)`;
        var isPast = today > end;
        var checkboxes = moduleDiv.querySelectorAll('.content input[type="checkbox"]');
        var checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        var totalModuleTasks = checkboxes.length;

        totalChecked += checkedCount;
        totalTasks += totalModuleTasks;

        checkboxes.forEach(cb => {
            if (!cb.checked) {
                if (isPast) {
                    totalOutOfTime++; 
                } else {
                    totalPending++; 
                }
            }
        });

        if (isPast) {
            if (checkedCount === totalModuleTasks) {
                moduleDiv.className = 'collapsible green-bg';
            } else if (checkedCount > 0) {
                moduleDiv.className = 'collapsible orange-bg';
            } else {
                moduleDiv.className = 'collapsible red-bg'; 
            }
        } else {
            if (checkedCount === totalModuleTasks) {
                moduleDiv.className = 'collapsible green-bg'; 
            } else if (checkedCount === 0) {
                moduleDiv.className = 'collapsible gray-bg'; 
            } else {
                moduleDiv.className = 'collapsible blue-bg'; 
            }
        }
    });


    document.getElementById('checked-vs-total').textContent = `${totalChecked}`;
    document.getElementById('checked-total').textContent = ` ${totalTasks}`;
    document.getElementById('out-of-time').textContent = totalOutOfTime;
    document.getElementById('pending').textContent = totalPending;
}
