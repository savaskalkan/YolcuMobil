import Host from '../config/host';

export default class MapService {
    host = new Host();

    getProjects(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetProjectsForPassenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getRoutes(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetRoutesForPassenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getVoyages(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetVoyagesForPassenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getStations(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetStations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getDirections(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetDirections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    getCarIdFromPassenger(request) {
        return fetch(this.host.ServiceUrl + 'Map/GetCarIdFromPassenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }
}


