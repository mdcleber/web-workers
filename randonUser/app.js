console.log("WebWorker: Starting");
var worker = new Worker("users.js");
var count = 0;

worker.addEventListener("message", function (e) {
    count++;
    console.log('count: ', count);
    //console.log(e);
    nextProfile(e.data);
}, false);

worker.onerror = function (e) {
    throw new Error(e.message + " (" + e.filename + ":" + e.lineno + ")");
};

function nextProfile(profile) {    

    if (profile) {
        document.getElementById('profileDisplay').innerHTML = `
            <ul class="list-group">
                <li class="list-group-item">Name: ${profile.name.title} ${profile.name.first} ${profile.name.last}</li>
                <li class="list-group-item">Age: ${profile.dob.age}</li>
                <li class="list-group-item">Location: ${profile.location.city} - ${profile.location.country} </li>
                <li class="list-group-item">Gender: ${profile.gender}</li>
                <li class="list-group-item">Email: ${profile.email}</li>
            </ul>`;

        document.getElementById('imageDisplay').innerHTML = `<img src="${profile.picture.large}" >`;
    }
    else {
        window.location.reload();
    }
}
