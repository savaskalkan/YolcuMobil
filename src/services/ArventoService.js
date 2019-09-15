import Host from '../config/host';

export default class ArventoService {
    host = new Host();

    getWehicleLocationInformation(request) {
        return fetch(this.host.ServiceUrl + 'Arvento/GetWehicleLocationInformation', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (result) {
            return result.json();
        });
    }

    voyageAmoungTimeControl(request) {
        return fetch(this.host.ServiceUrl + 'Arvento/VoyageAmoungTimeControl', {
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