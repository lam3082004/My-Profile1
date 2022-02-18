function dateSort(a, b) {
    return new Date(b.date) - new Date(a.date);
}
let categorieSave = null
function alphaSort(map) {
    keys = [];
    for (i in map) {
        keys.push(i);
    }
    return keys.sort();
}

let flag = ''
function populateMenu(categories = undefined) {
    var output = "";
    var keys = alphaSort(categorieSave || categories);
    console.log(keys);
    for (i in keys) {
        output += `<li class='filter ${keys[i] === flag ? 'activeButton' : ''} ' onclick='populateTimeline(\"${keys[i]}\")'>${keys[i]}</li>`;
    }
    output += `<li class='filter ${'Contact' === flag ? 'activeButton' : ''}' onclick='contactDialog()'>Contact</li>`;
    document.getElementById('links').innerHTML = output;
}

function useImage(type) {
    var icon = "icons/checkbox-blank-circle.svg";
    var color = "#2196f3";
    if (type == "Background") {
        icon = "icons/book.svg";
    } else if (type == "Projects") {
        icon = "icons/memory.svg";
    } 
    else if (type == "Target") {
        icon = "icons/school.svg";
    } 
    else {
        icon = "icons/memory.svg";
    }
    var output = `<div class='cd-timeline-img cd-picture' style='background-color: ${color}'>
        <img src='${icon}' alt='${type}'></div>`;
    return output;
}

function getUrl(url, text) {
    return `<a href='${url}' target='_blank' class='cd-read-more' rel='noopener'>${text}</a>`;
}

function populateTimeline(filter) {
    activeNativigation(filter)
    // Reset
    rehide();
    document.getElementById('cd-timeline').innerHTML = "";

    // Sort by date
    me.sort(dateSort);
    // Current date
    currDate = "";
    // Query categories
    let checkName = ''
    categories = [];
    var count = 0;
    for (var index = 0; index < me.length; index++) {
        var item = me[index];
        categories[item.type] = item.type;

        if ((filter !== undefined && item.type == filter)
            || filter === undefined) {
                
            var output = "<div class='cd-timeline-block'>";
            output += useImage(item.type);

            output += "<div class='cd-timeline-content'><p>";
            output += `<h1 style="padding : 10px 3px; color: white">${item.name}</h1>`;

            if (item.type == "Projects") {

                output += `<h3>${item.description}</h3>`;
                checkName = 'Project'
            }
            else if (item.type == "Background") {

                output += `<h3>${item.description}</h3>`;
                checkName = 'Background'
            }
            else if (item.type == "Target") {
                output += `<h3>${item.description}</h3>`;
                checkName = 'Target'
            } else {
                checkName = item.type
                output += item.description ? `<h3>${item.description}</h3>` : '';
            }
            output += "</p>";
            if (item.link !== undefined) {
                output += getUrl(item.link, item.linkText);
            }
            if (item.imageSrc) {
                output += `<img src=${item.imageSrc} />`
            }
            output += `<span class='cd-date'>${item.date}</span>`;
            currDate = item.date;
            output += "</div>   </div>";
            document.getElementById('cd-timeline').innerHTML += output;
            count++;
            document.getElementById('view_x_items').innerHTML = count + ' ' + ((count == 1) ? item.type : checkName);
        }
    }
    rehide();
    $('#contact-me').fadeOut(400);
    $('#cd-timeline').fadeIn(400);
    return categories;
}
function activeNativigation(active) {
    localStorage.setItem('cv-active', active)
    flag = active
    populateMenu()
}
function contactDialog() {

    activeNativigation('Contact')
    var output = "<ul>";
    for (var i = 0; i < contact.length; i++) {
        var item = contact[i];
        if (item.icon !== undefined) {
            output += `<li><a target='_blank' href='${item.link}'><img src='${item.icon}' alt='${item.type}' /></a></li>`;
        } else {
            output += `<li><a target='_blank' href='${item.link}'>${item.type}</a></li>`;
        }
    }
    output += "</ul>";
    document.getElementById('contact-list').innerHTML = output;

    var count = contact.length;
    document.getElementById('view_x_items').innerHTML = count + ((count == 1) ? " Item" : " Items");
    $('#cd-timeline').fadeOut(200);
    setTimeout(function () {
        $('#contact-me').fadeIn(200);
    }, 200);
}
window.onload = function () {
    categories = populateTimeline(localStorage.getItem('cv-active')) || 'Background';
    console.log('categories', categories)
    categorieSave = categories
    populateMenu(categories);
};