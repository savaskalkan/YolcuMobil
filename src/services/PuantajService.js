import Host from '../config/host';

export default class PuantajService {
    host = new Host();

    getAracResimlerByAracId(request) {
        return fetch(this.host.ServiceUrl + 'Puntaj/GetAracResimlerByAracId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (res) {
            return res.json();
        });
    }

    getAracDetailsByAracId(request) {
        return fetch(this.host.ServiceUrl + 'Puntaj/GetAracDetailsByAracId', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        }).then(function (res) {
            ;
            return res.json();
        }).catch(function (ex) {
            console.log("err", ex);
        });
    }
}


