let profiles;

async function getProfiles() {
    const response = await fetch('https://randomuser.me/api/?results=8');
    if (response.ok) {
        return response.json();
    }

    throw new Error('Failed to fetch the profiles');
}

function profileIterator(profiles) {
    let nextIndex = 0;
    return {
        next: () => {
            return nextIndex < profiles.length ? profiles[nextIndex++] : undefined;
        }
    }
}

async function loadProfiles() {
    const data = await getProfiles();
    profiles = profileIterator(data.results);
    setInterval(() => postMessage(profiles.next()), 3000);
}

(function load() {
    loadProfiles().then(() => {});
})();
