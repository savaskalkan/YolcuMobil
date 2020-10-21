import Host from '../config/host';

export default class QrService {
    host = new Host();

    setQrInfo(request) {
        return fetch(this.host.ServiceUrl + 'qr/addyolcubiniskontrol', {
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