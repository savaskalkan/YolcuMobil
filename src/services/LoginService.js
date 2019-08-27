import Host from '../config/host';
import {LoginModel,OtpSmsModel} from '../models';

export default class LoginService {
    host = new Host();

    login(gsmNumber, password) {
        let loginModel = new LoginModel();
        loginModel.GsmNumber = gsmNumber;
        loginModel.Password = password;

        return fetch(this.host.ServiceUrl + 'Login/LoginPassengerMobile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginModel),
        }).then(function (result) {
            return result.json();
        });
    }

    sendOtpSms(gsmNumber, message) {
        let otpSmsModel = new OtpSmsModel();
        otpSmsModel.GsmNumber = gsmNumber;
        otpSmsModel.Message = message;

        return fetch(this.host.ServiceUrl + 'Login/SendOtpSmsForPassenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(otpSmsModel),
        }).then(function (result) {
            return result.json();
        });
    }

    createPasswordMobile(createPasswordMobileModel) {
        return fetch(this.host.ServiceUrl + 'Login/CreatePasswordMobileForPassenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(createPasswordMobileModel),
        }).then(function (result) {
            return result.json();
        });
    }

    updatePasswordMobile(updatePasswordMobileModel) {
        return fetch(this.host.ServiceUrl + 'Login/UpdatePasswordMobileForPassenger', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePasswordMobileModel),
        }).then(function (result) {
            return result.json();
        });
    }

    updateNotificationToken(updatePasswordMobileModel) {
        return fetch(this.host.ServiceUrl + 'Login/UpdateNotificationToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatePasswordMobileModel),
        }).then(function (result) {
            return result.json();
        });
    }
}


