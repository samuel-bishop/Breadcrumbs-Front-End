webpackJsonp([0],{

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addcontactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__httprequest__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the addcontact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var addcontactPage = /** @class */ (function () {
    function addcontactPage(navCtrl, navParams, request, formBuilder, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.request = request;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.contact = this.formBuilder.group({
            firstName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phoneNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            emailAddress: ['']
        });
    }
    addcontactPage.prototype.contactForm = function () {
        var _this = this;
        this.storage.get('userID').then(function (data) {
            _this.userid = data;
            var contactData = {
                "userid": _this.userid,
                "firstName": _this.contact.value.firstName,
                "lastName": _this.contact.value.lastName,
                "phoneNumber": _this.contact.value.phoneNumber,
                "emailAddress": _this.contact.value.emailAddress
            };
            _this.request.InsertContact(_this.storage.get('userID'), contactData);
            _this.navCtrl.pop();
        });
    };
    addcontactPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad addcontactPage');
    };
    addcontactPage.prototype.cancelClick = function () {
        this.navCtrl.pop();
    };
    addcontactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-addcontact',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\addcontact\addcontact.html"*/'<form [formGroup]="contact" (ngSubmit)="contactForm()">\n\n<ion-list>\n\n\n\n    <ion-item row-1>\n\n      <ion-input placeholder="First Name" formControlName="firstName" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item row-2>\n\n      <ion-input placeholder="Last Name" formControlName="lastName" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item row-3>\n\n      <ion-input placeholder="Phone Number" formControlName="phoneNumber" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-input placeholder="Email Address" formControlName="emailAddress" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n</ion-list>\n\n\n\n<button ion-button type="button" (click)="cancelClick()">Cancel</button>\n\n<button ion-button type="submit" [disabled]= "!contact.valid">Submit</button>\n\n</form>\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\addcontact\addcontact.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* Storage */]])
    ], addcontactPage);
    return addcontactPage;
}());

//# sourceMappingURL=addcontact.js.map

/***/ }),

/***/ 233:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 233;

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return httprequest; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the httprequest provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var aws_url = 'http://ec2-18-235-156-238.compute-1.amazonaws.com:4604';
var aws_tts_url = 'http://ec2-18-205-150-196.compute-1.amazonaws.com:4605';
var httprequest = /** @class */ (function () {
    function httprequest(alertCtrl, loadingCtrl, http, navCtrl, storage) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.storage = storage;
        console.log('Hello httprequest Provider');
    }
    //Load Active Event 
    httprequest.prototype.RequestActiveEvent = function () {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.storage.get('userID').then(function (userid) {
                _this.http.get(aws_url + '/activeEvent/' + userid)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.data = data;
                    resolve(_this.data);
                }, 
                //On Error
                function (error) {
                });
            });
        });
    };
    httprequest.prototype.RequestInactiveEvents = function () {
        var _this = this;
        var data;
        if (data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.storage.get('userID').then(function (userid) {
                _this.http.get(aws_url + '/inactiveEvents/' + userid)
                    .subscribe(function (data) {
                    data = data.json();
                    resolve(data);
                }, function (error) {
                });
            });
        });
    };
    //Load contacts
    httprequest.prototype.RequestContacts = function () {
        var _this = this;
        //Check if the data has already be created
        if (this.data) {
            return Promise.resolve(this.data);
        }
        //Return a new promise
        return new Promise(function (resolve) {
            _this.storage.get('userID').then(function (userid) {
                _this.http.get(aws_url + '/contacts/' + userid)
                    .map(function (res) { return res.json(); }) //Map the response as a JSON object
                    .subscribe(function (data) {
                    _this.data = data;
                    resolve(_this.data);
                }, 
                //On error
                function (error) {
                });
            });
        });
    };
    httprequest.prototype.RequestEvents = function () {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.storage.get('userID').then(function (userid) {
                _this.http.get(aws_url + '/events/' + userid)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.data = data;
                    resolve(_this.data);
                });
            });
        });
    };
    httprequest.prototype.InsertEvent = function (eventData) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append("Accept", 'application/json');
        header.append('Content-Type', 'application/json');
        var requestOpts = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: header });
        this.http.post(aws_url + '/newevent', eventData, requestOpts)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
    };
    httprequest.prototype.InsertContact = function (userid, contactData) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append("Accept", 'application/json');
        header.append('Content-Type', 'application/json');
        var requestOpts = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: header });
        this.http.post(aws_url + '/newContact', contactData, requestOpts)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
    };
    httprequest.prototype.UpdateContact = function (contactData) {
        var alert = this.alertCtrl.create({ title: 'contactData', subTitle: contactData.firstName, buttons: ['OK'] });
        alert.present();
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append("Accept", 'application/json');
        header.append('Content-Type', 'application/json');
        var requestOpts = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: header });
        this.http.post(aws_url + '/updatecontact', contactData, requestOpts)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
    };
    httprequest.prototype.DeleteContact = function (contactid) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append("Accept", 'application/json');
        header.append('Content-Type', 'application/json');
        var requestOpts = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: header });
        var contact = { id: contactid };
        this.http.post(aws_url + '/deletecontact', contact, requestOpts)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
    };
    httprequest.prototype.RequestEventContacts = function (eventID) {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http.get(aws_url + '/eventContacts/' + eventID)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            });
        });
    };
    httprequest.prototype.DisableEvent = function (eventID) {
        var requestOpts = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: header });
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append("Accept", 'application/json');
        header.append('Content-Type', 'application/json');
        var body = { 'eventID': eventID };
        this.http.post(aws_url + '/disableEvent/', body)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
    };
    //Create User Account
    httprequest.prototype.CreateUser = function (data) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this.http.post(aws_url + '/createUser/', data)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
        });
    };
    httprequest.prototype.ResetPassword = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: headers });
        this.http.post(aws_url + '/resetPassword/', user)
            .subscribe(function (data) {
            console.log(data['body']);
        }, function (error) {
        });
    };
    httprequest.prototype.GetUserID = function (user) {
        var _this = this;
        if (this.data) {
            return Promise.resolve(this.data);
        }
        return new Promise(function (resolve) {
            _this.http.get(aws_url + '/getUserID/' + user.username)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.data = data;
                resolve(_this.data);
            }, function (error) {
                console.log(error);
            });
        });
    };
    httprequest.prototype.SignIn = function (user) {
        var _this = this;
        if (this.user) {
            return Promise.resolve(this.user);
        }
        return new Promise(function (resolve) {
            _this.http.get(aws_url + '/confirmUser/' + user.username + '/' + user.password)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                _this.user = data;
                console.log(data);
                console.log(_this.user);
                resolve(_this.user);
            });
        });
    };
    httprequest.prototype.InsertContactInfo = function (userid, contactData) {
        var header = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        header.append("Accept", 'application/json');
        header.append('Content-Type', 'application/json');
        var requestOpts = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* RequestOptions */]({ headers: header });
        this.http.post(aws_url + '/createContactInfo/', contactData, requestOpts)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
    };
    httprequest.prototype.StartWatchTest = function (eventID, endTime) {
        var body = {
            'eventID': eventID, 'endTime': endTime, 'c1FName': "TestFName1", 'c1LName': "TestLName1"
        }; //, 'c1Email': "testEmail1@gmail.com", 'c1Phone': "111-111-1111", 'c2FName': "TestFName2", 'c2LName': "TestLName1", 'c2Email': "testEmail2@gmail.com", 'c2Phone': "222-222-2222", 'c3FName': "TestFName3", 'c3LName': "TestLName1", 'c3Email': "testEmail3@gmail.com", 'c3Phone': "333-333-3333"}
        this.http.post(aws_tts_url + '/startwatch/', body)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
    };
    httprequest.prototype.CancelWatch = function (eventID) {
        var body = { 'eventID': eventID };
        this.http.post(aws_tts_url + '/cancelwatch/', body)
            .subscribe(function (data) {
            console.log(data['_body']);
        }, function (error) {
            console.log(error);
        });
    };
    httprequest = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["a" /* Storage */]])
    ], httprequest);
    return httprequest;
}());

//# sourceMappingURL=httprequest.js.map

/***/ }),

/***/ 42:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 479:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPagePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Register_Register__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__password_password__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__httprequest__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LoginPagePage = /** @class */ (function () {
    function LoginPagePage(navCtrl, navParams, alertCtrl, request, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.request = request;
        this.storage = storage;
    }
    LoginPagePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPagePage');
    };
    LoginPagePage.prototype.signIn = function () {
        var _this = this;
        //check to see if username or password are blank
        if (this.username.value == "") {
            var alert_1 = this.alertCtrl.create({
                title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
            });
            alert_1.present();
        }
        else if (this.password.value == "") {
            var alert_2 = this.alertCtrl.create({
                title: "Attention", subTitle: "Password field is empty", buttons: ["Ok"]
            });
            alert_2.present();
        }
        //creates a user, storing the input of username and password into the user object
        var user = {
            username: this.username.value,
            password: this.password.value,
            userID: 0
        };
        //check API server to see if the user is valid
        this.request.GetUserID(user).then(function (data) {
            _this.userID = data['recordset'][0].UserID;
            console.log("uuuussser ID", _this.userID);
            //if the user is valid, then check the password
            if (data['recordset'][0].UserID > 0) {
                _this.request.SignIn(user).then(function (data2) {
                    if (data2 == true) {
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                    }
                    else {
                        //password incorrect alert
                        var alert_3 = _this.alertCtrl.create({
                            title: "Attention", subTitle: "Incorrect password, try again!", buttons: ["Ok"]
                        });
                        alert_3.present();
                    }
                });
            }
        });
    };
    LoginPagePage.prototype.signUp = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__Register_Register__["a" /* RegisterPage */]);
    };
    LoginPagePage.prototype.resetPassword = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__password_password__["a" /* passwordPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("username"),
        __metadata("design:type", Object)
    ], LoginPagePage.prototype, "username", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("password"),
        __metadata("design:type", Object)
    ], LoginPagePage.prototype, "password", void 0);
    LoginPagePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-LoginPage',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\LoginPage\LoginPage.html"*/'<!--\n\n  Generated template for the NewPage page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Log In</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n\n\n    <ion-item>\n\n\n\n      <ion-input round type="text" placeholder="Username" name="username" #username></ion-input>\n\n\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n\n\n      <ion-input type="password" placeholder="Password" name="password" #password></ion-input>\n\n\n\n    </ion-item>\n\n\n    \n\n    <button ion-button round block (click)="signIn()">Sign In</button>\n\n\n\n    <button ion-button round block (click)="signUp()">Register</button>\n    <button ion-button round small (click) ="resetPassword()">Reset Password?</button>\n\n  </ion-list>\n\n\n\n</ion-content>\n\n\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\LoginPage\LoginPage.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* Storage */]])
    ], LoginPagePage);
    return LoginPagePage;
}());

//# sourceMappingURL=LoginPage.js.map

/***/ }),

/***/ 480:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addevent_addevent__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__addcontact_addcontact__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__viewevents_viewevents__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__httprequest__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__editevent_editevent__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__editcontact_editcontact__ = __webpack_require__(489);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var HomePage = /** @class */ (function () {
    function HomePage(alertCtrl, loadingCtrl, navCtrl, request, storage) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.request = request;
        this.storage = storage;
        this.CurrentEventExists = false;
        this.storage.set('lastState', 'newEventSubmit');
        var userid = 1;
        this.storage.set('userID', userid);
        //request.StartWatchTest(1, Date.now());
        //setTimeout(request.CancelWatch(1), 2000);
    }
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var newEvent;
        this.storage.get('lastState').then(function (data) {
            if (data == 'addeventsubmit') {
                _this.storage.set('lastState', 'homepageenter').then(function () {
                    location.reload();
                });
            }
        }).then(function () {
            _this.storage.get('newEventSubmit').then(function (data) {
                newEvent = data;
                if (newEvent == true || document.getElementById("activeEventContent").innerText == "") {
                    _this.getActiveEvent();
                    _this.getInactiveEvents();
                }
            });
        });
    };
    HomePage.prototype.getActiveEvent = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Loading Event...'
        });
        loading.present().then(function () {
            _this.request.RequestActiveEvent().then(function (data) {
                _this.storage.set('activeEvent', data['recordset'][0]);
                document.getElementById("activeEventContent").innerText = data['recordset'][0].EventName;
                _this.CurrentEventExists = true;
                _this.storage.set('newEventSubmit', false);
            }).catch(function () { document.getElementById("activeEventContent").innerText = "No Active Events"; _this.CurrentEventExists = false; });
            loading.dismiss();
        });
    };
    HomePage.prototype.getInactiveEvents = function () {
        var _this = this;
        this.request.RequestInactiveEvents().then(function (data) {
            _this.storage.set('inactiveEvents', data['recordset']);
            _this.storage.set('newEventSubmit', false);
        });
    };
    HomePage.prototype.LoadContacts = function (EventID) {
        this.request.RequestEventContacts(EventID).then(function (data) {
            return data;
        });
    };
    HomePage.prototype.onLink = function (url) {
        window.open(url);
    };
    HomePage.prototype.addEvent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__addevent_addevent__["a" /* addeventPage */]);
    };
    HomePage.prototype.viewEvents = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__viewevents_viewevents__["a" /* vieweventsPage */]);
    };
    HomePage.prototype.addContact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__addcontact_addcontact__["a" /* addcontactPage */]);
    };
    HomePage.prototype.editContact = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__editcontact_editcontact__["a" /* editcontactPage */]);
    };
    HomePage.prototype.editEvent = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__editevent_editevent__["a" /* editeventPage */]);
    };
    HomePage.prototype.checkIn = function () {
        var _this = this;
        this.storage.get('activeEvent').then(function (data) {
            _this.request.DisableEvent(data.EventID);
        }).then(function () {
            _this.CurrentEventExists = false;
            _this.storage.set('newEventSubmit', true)
                .then(function () {
                location.reload();
            });
        });
        console.log("disableEvent");
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\home\home.html"*/'<!-- Put shit here -->\n\n\n\n<ion-card>\n\n  <ion-card-header>\n\n    Current Event\n\n  </ion-card-header>\n\n  <ion-card-content>\n\n    <ion-label id="activeEventContent"> </ion-label>\n\n    <button ion-button name="CurrentEventCheckIn" *ngIf="CurrentEventExists" (click)="checkIn()"> Check In </button>\n\n  </ion-card-content>\n\n</ion-card>\n\n\n\n<button ion-button type="button" (click)="addEvent()"> Add New Event </button>\n\n<button ion-button type="button" *ngIf="CurrentEventExists" (click)="editEvent()"> Edit Active Event</button>\n\n<button ion-button type="button" (click)="viewEvents()"> View Past Events </button>\n\n<button ion-button type="button" (click)="addContact()"> Add New Contact </button>\n\n<button ion-button type="button" (click)="editContact()"> Edit Contact </button>\n\n\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\home\home.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_5__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["a" /* Storage */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addeventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__addcontact_addcontact__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__httprequest__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(643);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__ = __webpack_require__(485);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var AddEventMap;
var startLocMarker; //Marker Object for Start Location on Google Map
var endLocMarker; //Marker Object for End Location on Google Map
var isStartOrEndDestination; //Map marker toggle between Start and End Position
var autocomplete;
var places;
var addeventPage = /** @class */ (function () {
    function addeventPage(alertCtrl, loadingCtrl, navCtrl, navParams, request, formBuilder, storage) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.request = request;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.todaysDate = new Date();
        this.todaysDateString = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString(); //Stringified Event Start Date
        this.endDateString = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 58750).toISOString(); //Stringified Event End Date
        isStartOrEndDestination = false;
        //Creating Forms
        storage.get('userID').then(function (data) { _this.userid = data; console.log(_this.userid); });
        this.loadContacts();
        this.event = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            startLat: [''],
            startLong: [''],
            endLat: [''],
            endLong: [''],
            startDate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            endDate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            contactsList: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            participants: ['']
        });
    }
    addeventPage.prototype.initMap = function () {
        var _this = this;
        //Init Google Maps API objects
        this.currentLat = 42.2587;
        this.currentLng = 121.7836;
        var geo = new __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */]();
        geo.getCurrentPosition().then(function (loc) {
            if (loc != null) {
                _this.currentLat = loc.coords.latitude;
                _this.currentLng = loc.coords.longitude;
            }
            console.log("geo - Lat: " + loc.coords.latitude + ", Lng: " + loc.coords.longitude);
        }).then(function () {
            var element = _this.AddEventMapEl.nativeElement;
            AddEventMap = new google.maps.Map(element, {
                zoom: 7,
                center: { lat: _this.currentLat, lng: _this.currentLng },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            if (_this.currentLat != 0.0 && _this.currentLng != 0.0) {
                startLocMarker = new google.maps.Marker({ position: new __WEBPACK_IMPORTED_MODULE_7__ionic_native_google_maps__["a" /* LatLng */](_this.currentLat, _this.currentLng), map: AddEventMap, label: 'S' });
            }
        }).then(function () {
            //console.log(`MapType: ${getTypeNameForDebugging(AddEventMap)}`);
            //Listeners for the google maps
            AddEventMap.addListener('click', function (event) {
                if (isStartOrEndDestination == true) {
                    if (startLocMarker != null) {
                        startLocMarker.setMap(null);
                    }
                    startLocMarker = new google.maps.Marker({ position: event.latLng, map: AddEventMap, label: 'S' });
                }
                else {
                    if (endLocMarker != null) {
                        endLocMarker.setMap(null);
                    }
                    endLocMarker = new google.maps.Marker({ position: event.latLng, map: AddEventMap, label: 'E' });
                }
            }); //var marker = new google.maps.Marker({ position: event.latLng, AddEventMap: AddEventMap });
        });
        var defaultBounds = new google.maps.LatLngBounds(new google.maps.LatLng(this.currentLat - 0.5, this.currentLng), new google.maps.LatLng(this.currentLat, this.currentLng + 0.5));
        var input = document.getElementById('searchInput');
        var options = {
            bounds: defaultBounds,
            types: ['address']
        };
        autocomplete = new google.maps.places.Autocomplete(input, options);
        //places = new google.maps.places.PlacesServices(AddEventMap);
        //autocomplete.addListener('place_changed', function () {
        //  var place = autocomplete.getPlace();
        //  if (place.geometry) {
        //    AddEventMap.panTo(place.geometry.location);
        //    AddEventMap.setZoom(15);
        //    this.search();
        //  } else {
        //  }
        //})
    };
    addeventPage.prototype.ionViewDidLoad = function () {
        //Initialize google AddEventMap and markers
        this.initMap();
    };
    addeventPage.prototype.search = function () {
        var search = {
            bounds: AddEventMap.getBounds(),
            types: ['lodging']
        };
    };
    addeventPage.prototype.togglePosition = function () {
        if (isStartOrEndDestination == true) {
            isStartOrEndDestination = false;
            document.getElementById('togglePosition').textContent = "End";
        }
        else {
            isStartOrEndDestination = true;
            document.getElementById('togglePosition').textContent = "Start";
        }
    };
    addeventPage.prototype.addMarker = function (pos, title) {
        var markerOptions = {
            position: pos,
            title: title
        };
        return AddEventMap.addMarker(markerOptions);
    };
    addeventPage.prototype.ionViewWillLoad = function () {
    };
    addeventPage.prototype.eventForm = function () {
        var _this = this;
        var endDate = new Date(this.event.value.endDate);
        if (this.event.value.contactsList == null) {
            var alert = this.alertCtrl.create({ title: 'Error: No Contacts Selected', subTitle: 'Please select at least one contact', buttons: ['ok'] });
            alert.present();
        }
        if (this.event.value.endDate < this.event.value.startDate) {
            var alert = this.alertCtrl.create({ title: 'Error: Time Conflict', subTitle: 'Please check that your dates are not conflicting (End Date should not be before Start Date)', buttons: ['ok'] });
            alert.present();
        }
        else if (endLocMarker.getMap() === null) {
            var alert = this.alertCtrl.create({ title: 'Error: Input Error', subTitle: 'Please select an end point on the AddEventMap', buttons: ['ok'] });
            alert.present();
        }
        else {
            var loading = this.loadingCtrl.create({
                content: 'Loading Event...'
            });
            this.storage.set('newEventSubmit', true)
                .then(function () {
                var contactsListString = "";
                for (var i = 0; i < _this.event.value.contactsList.length; i++) {
                    if (i != 0) {
                        contactsListString += ",";
                    }
                    if (_this.event.value.contactsList[i] != "") {
                        contactsListString += _this.event.value.contactsList[i].EmergencyContactID;
                    }
                }
                return contactsListString;
            })
                .then(function (contactsListString) {
                //console.log(`startLocPos- lat: ${startLocMarker.getPosition().lat()} lng: ${startLocMarker.getPosition().lng()}`);
                var eventData = {
                    "userid": _this.userid,
                    "name": _this.event.value.name,
                    "description": _this.event.value.description,
                    "startLat": startLocMarker.getPosition().lat(),
                    "startLong": startLocMarker.getPosition().lng(),
                    "endLat": endLocMarker.getPosition().lat(),
                    "endLong": endLocMarker.getPosition().lng(),
                    "startDate": _this.event.value.startDate,
                    "endDate": _this.event.value.endDate,
                    "contactsList": contactsListString,
                    "participants": _this.event.value.participants
                };
                return eventData;
            })
                .then(function (eventData) {
                _this.storage.set('lastState', 'addeventsubmit')
                    .then(function () {
                    //CurrentEvent stores the last submitted event's data
                    _this.storage.set('CurrentEvent', eventData);
                    _this.request.InsertEvent(eventData);
                    _this.navCtrl.pop();
                });
            });
        }
    };
    addeventPage.prototype.loadContacts = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Loading Contacts...'
        });
        loading.present().then(function () {
            _this.request.RequestContacts().then(function (data) {
                _this.contacts = data['recordset'];
            });
            loading.dismiss();
        });
    };
    addeventPage.prototype.cancelClick = function () {
        this.navCtrl.pop();
    };
    addeventPage.prototype.addContactClick = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__addcontact_addcontact__["a" /* addcontactPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('AddEventMap'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ElementRef */])
    ], addeventPage.prototype, "AddEventMapEl", void 0);
    addeventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-addevent',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\addevent\addevent.html"*/'<div>\n\n  <form [formGroup]="event" (ngSubmit)="eventForm()">\n\n    <ion-item>\n\n      <ion-input placeholder="Event Name" formControlName="name" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n    <!--\n\n  <ion-input placeholder="Start Latitude" [(ngModel)]="currentLat" formControlName="startLat" type="text"></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n  <ion-input placeholder="Start Longitude" [(ngModel)]="currentLng" formControlName="startLong" type="text"></ion-input>\n\n   -->\n\n    <!--\n\n  <ion-item>\n\n    <ion-input placeholder="End Latitude" formControlName="endLat" type="text"></ion-input>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-input placeholder="End Longitude" formControlName="endLong" type="text"></ion-input>\n\n  </ion-item>\n\n  -->\n\n\n\n    <ion-item>\n\n      <ion-label color="primary">Start Date/Time</ion-label>\n\n      <ion-datetime formControlName="startDate" [(ngModel)]="todaysDateString" allowOldDates="false" [min]="todaysDateString"\n\n                    id="startDate" max="2021-12-31" pickerFormat="MMM/D/YY h:mm A" displayFormat="MM/DD/YYYY h:mm A">Start Date</ion-datetime>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary">End Date/Time</ion-label>\n\n      <ion-datetime formControlName="endDate" [(ngModel)]="endDateString" allowOldDates="false" [min]="endDateString" max="2021-12-31"\n\n                    id="endDate" pickerFormat="MMM/D/YY h:mm A" displayFormat="MM/DD/YYYY h:mm A">Start Date</ion-datetime>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary">Contact(s)</ion-label>\n\n      <ion-select name="contactsList" [(ngModel)]="contact" multiple="true">\n\n        <ion-option *ngFor="let contact of contacts" [value]="contact">{{contact.ContactFirstName}} {{contact.ContactLastName}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <button ion-button type="button" (click)="addContactClick()">Add New Contact..</button>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-input placeholder="Participants (optional)" formControlName="participants" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-input placeholder="Description (required)" formControlName="description" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n\n\n    <button ion-button type="button" (click)="cancelClick()">Cancel</button>\n\n    <button ion-button type="submit" [disabled]="!event.valid">Submit</button>\n\n    <button ion-button type="button" id="togglePosition" (click)="togglePosition()">End</button>\n\n  </form>\n\n</div>\n\n<div> <input type="text" id="searchInput" placeholder="Search an address.." /> </div>\n\n<div #AddEventMap id="AddEventMap"></div>\n\n\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\addevent\addevent.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* Storage */]])
    ], addeventPage);
    return addeventPage;
}());

//# sourceMappingURL=addevent.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return vieweventsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__httprequest__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__viewEvent_viewEvent__ = __webpack_require__(487);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var vieweventsPage = /** @class */ (function () {
    function vieweventsPage(loadingCtrl, navCtrl, navParams, request, storage, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.request = request;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
    }
    vieweventsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        //Put the user's inactive events into local storage
        this.storage.get('inactiveEvents').then(function (events) {
            if (events != null) {
                _this.inactiveEvents = events;
                //function to convert SQL Server smalldatetime to a more human readable string
            }
            else {
                _this.getInactiveEvents();
            }
            function formatTime(datetime) {
                var year = (new Date(datetime).getFullYear()).toString();
                var month = monthNames[(new Date(datetime).getMonth())];
                var weekday = dayNames[(new Date(datetime).getDay())];
                var date = (new Date(datetime).getDate()).toString();
                var result = weekday + ', ' + month + ' ' + date + ', ' + year;
                return result;
            }
        });
    };
    vieweventsPage.prototype.getInactiveEvents = function () {
        var _this = this;
        this.request.RequestInactiveEvents().then(function (data) {
            _this.storage.set('inactiveEvents', data['recordset']);
            _this.storage.set('newEventSubmit', false);
        });
    };
    //When ViewEvent gets called, push viewEventPage onto stack.
    vieweventsPage.prototype.ViewEvent = function (e) {
        var _this = this;
        this.storage.set('viewedEvent', e).then(function () {
            _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__viewEvent_viewEvent__["a" /* viewEventPage */]);
        });
    };
    vieweventsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* Component */])({
            selector: 'page-viewevents',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\viewevents\viewevents.html"*/''/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\viewevents\viewevents.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__httprequest__["a" /* httprequest */]],
            template: "\n<ion-header>\n  <ion-navbar>\n    <ion-title>Event History</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <ion-card *ngFor=\"let e of inactiveEvents\" (click)=\"ViewEvent(e)\">\n    <ion-card-header>\n      {{e.EventName}}\n    </ion-card-header>\n    <ion-card-content>\n       Create on: {{e.EventCreationDate}}\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n"
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* Storage */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */]])
    ], vieweventsPage);
    return vieweventsPage;
}());

//# sourceMappingURL=viewevents.js.map

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return viewEventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__httprequest__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var viewEventPage = /** @class */ (function () {
    function viewEventPage(loadingCtrl, navCtrl, navParams, request, storage) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.request = request;
        this.storage = storage;
    }
    viewEventPage.prototype.getEventContacts = function (eventid) {
        var _this = this;
        this.request.RequestEventContacts(eventid)
            .then(function (data) {
            _this.storage.set('eventContacts', data['recordset']);
        });
    };
    viewEventPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        //create enums for names of months and days
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var loading = this.loadingCtrl.create({
            content: 'Loading Events...'
        });
        loading.present().then(function () {
            //get the stored viewedEvent
            _this.storage.get('viewedEvent')
                .then(function (data) {
                _this.request.RequestEventContacts(data.EventID)
                    .then(function (data) {
                    _this.storage.set('eventContacts', data['recordset']);
                })
                    .then(function () {
                    _this.storage.get('eventContacts')
                        .then(function (econtacts) {
                        _this.eventContacts = econtacts;
                    });
                    //function to convert SQL Server smalldatetime to a more human readable string
                    function formatTime(datetime) {
                        var year = (new Date(datetime).getFullYear()).toString();
                        var month = monthNames[(new Date(datetime).getMonth())];
                        var weekday = dayNames[(new Date(datetime).getDay())];
                        var date = (new Date(datetime).getDate()).toString();
                        var time = new Date(datetime).toISOString().slice(11, 16);
                        var hourInt = parseInt(time.slice(0, 2));
                        if (hourInt > 12) {
                            hourInt -= 12;
                            time = hourInt.toString() + time.slice(2) + ' PM';
                        }
                        else
                            time = time + ' AM';
                        if (time.startsWith('0'))
                            time = time.slice(1);
                        var result = weekday + ', ' + month + ' ' + date + ', ' + year + ' at ' + time;
                        return result;
                    }
                    //this.EventName = data.EventName;
                    //set the values for the elements in viewEvent
                    document.getElementById("viewEventTitle").textContent = data.EventName;
                    document.getElementById("EventStartDateLabel").textContent = formatTime(data.EventStartDate);
                    document.getElementById("EventEndDateLabel").textContent = formatTime(data.EndDate);
                    document.getElementById("EventPosLatLabel").textContent = data.PositionLatitude;
                    document.getElementById("EventPosLonLabel").textContent = data.PositionLongitude;
                    document.getElementById("EventParticipantsLabel").textContent = data.EventParticipants ? data.EventParticipants : '(blank)';
                    document.getElementById("EventDescriptionLabel").textContent = data.EventDescription ? data.EventDescription : '(blank)';
                });
            });
        });
        loading.dismiss();
    };
    viewEventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-viewEvent',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\viewEvent\viewEvent.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title id="viewEventTitle">View Event</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-item>\n\n    <ion-label stacked>Start Time</ion-label>\n\n    <ion-textarea disabled id="EventStartDateLabel"></ion-textarea>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label stacked>End Time</ion-label>\n\n    <ion-textarea disabled id="EventEndDateLabel"></ion-textarea>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label stacked>Destination Latitude</ion-label>\n\n    <ion-textarea disabled id="EventPosLatLabel"></ion-textarea>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label stacked>Destination Longitude</ion-label>\n\n    <ion-textarea disabled id="EventPosLonLabel"></ion-textarea>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label stacked>Participants</ion-label>\n\n    <ion-textarea rows="3" disabled id="EventParticipantsLabel"></ion-textarea>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label stacked>Description</ion-label>\n\n    <ion-textarea rows="6" disabled id="EventDescriptionLabel"></ion-textarea>\n\n  </ion-item>\n\n  <ion-item>\n\n    <ion-label stacked>Emergency Contacts</ion-label>\n\n    <ion-textarea rows="1" disabled *ngFor="let c of eventContacts" value="{{c.ContactFirstName}} {{c.ContactLastName}}"></ion-textarea>\n\n  </ion-item>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\viewEvent\viewEvent.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["a" /* Storage */]])
    ], viewEventPage);
    return viewEventPage;
}());

//# sourceMappingURL=viewEvent.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return editeventPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__addcontact_addcontact__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__httprequest__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__ = __webpack_require__(485);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EditEventMap;
var startLocMarker; //Marker Object for Start Location on Google Map
var endLocMarker; //Marker Object for End Location on Google Map
var isStartOrEndDestination; //Map marker toggle between Start and End Position
var autocomplete;
var places;
var editeventPage = /** @class */ (function () {
    function editeventPage(alertCtrl, loadingCtrl, navCtrl, navParams, request, formBuilder, storage) {
        var _this = this;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.request = request;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.todaysDate = new Date();
        this.todaysDateString = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 60000).toISOString(); //Stringified Event Start Date
        this.endDateString = new Date(this.todaysDate.getTime() - this.todaysDate.getTimezoneOffset() * 58750).toISOString(); //Stringified Event End Date
        //Initialize google EditEventMap and markers
        this.loadContacts();
        isStartOrEndDestination = false;
        //Creating Forms
        storage.get('userID').then(function (data) { _this.userid = data; console.log(_this.userid); });
        this.event = this.formBuilder.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            description: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            startLat: [''],
            startLong: [''],
            endLat: [''],
            endLong: [''],
            startDate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            endDate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            contactsList: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            participants: ['']
        });
    }
    editeventPage.prototype.ionViewWillLoad = function () {
        var _this = this;
        //CurrentEvent stores the last submitted event's data
        this.storage.get('activeEvent').then(function (event) {
            _this.eventName = event.EventName;
            _this.eventDescription = event.EventDescription;
            _this.eventEndDate = event.EndDate;
            _this.eventStartDate = event.EventCreationDate;
            _this.eventParticipants = event.EventParticipants;
            _this.eventStartLat = event.StartLat;
            _this.eventStartLng = event.StartLon;
            _this.eventEndLat = event.EndLat;
            _this.eventEndLng = event.EndLon;
            /* TODO */
            //Need to populate the contacts list with previously selected items
            //for(var contact in event.contactsList) {
            //  for (var oldcontact in this.contacts) {
            //    if (contact == oldcontact) {
            //    }
            //  }
            //}
        });
    };
    editeventPage.prototype.ionViewDidLoad = function () {
        this.initMap();
    };
    editeventPage.prototype.initMap = function () {
        var _this = this;
        //CurrentEvent stores the last submitted event's data
        this.storage.get('activeEvent').then(function (event) {
            //var alert = this.alertCtrl.create({ title: 'Error: Connection Issue', subTitle: `${event}`, buttons: ['ok'] });
            //alert.present();
            var element = _this.EditEventMapEl.nativeElement;
            EditEventMap = new google.maps.Map(element, {
                zoom: 7,
                center: { lat: event.StartLat, lng: event.StartLon },
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
            //Create location markers for start and end point of currently active event
            startLocMarker = new google.maps.Marker({ position: new __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["a" /* LatLng */](event.StartLat, event.StartLon), map: EditEventMap, label: 'S' });
            endLocMarker = new google.maps.Marker({ position: new __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_maps__["a" /* LatLng */](event.EndLat, event.EndLon), map: EditEventMap, label: 'E' });
        }).then(function () {
            /* Listeners */
            // OnClick Listener
            EditEventMap.addListener('click', function (event) {
                if (isStartOrEndDestination == true) {
                    if (startLocMarker != null) {
                        startLocMarker.setMap(null);
                    }
                    startLocMarker = new google.maps.Marker({ position: event.latLng, map: EditEventMap, label: 'S' });
                }
                else {
                    if (endLocMarker != null) {
                        endLocMarker.setMap(null);
                    }
                    endLocMarker = new google.maps.Marker({ position: event.latLng, map: EditEventMap, label: 'E' });
                }
            });
        });
    };
    editeventPage.prototype.search = function () {
        var search = {
            bounds: EditEventMap.getBounds(),
            types: ['lodging']
        };
    };
    //Toggle between dropping "Start" or "End" location markers
    editeventPage.prototype.togglePosition = function () {
        if (isStartOrEndDestination == true) {
            isStartOrEndDestination = false;
            document.getElementById('togglePosition').textContent = "End";
        }
        else {
            isStartOrEndDestination = true;
            document.getElementById('togglePosition').textContent = "Start";
        }
    };
    editeventPage.prototype.addMarker = function (pos, title) {
        var markerOptions = {
            position: pos,
            title: title
        };
        return EditEventMap.addMarker(markerOptions);
    };
    editeventPage.prototype.eventForm = function () {
        var _this = this;
        var endDate = new Date(this.event.value.endDate);
        if (this.event.value.contactsList == null) {
            var alert = this.alertCtrl.create({ title: 'Error: No Contacts Selected', subTitle: 'Please select at least one contact', buttons: ['ok'] });
            alert.present();
        }
        if (this.event.value.endDate < this.event.value.startDate) {
            var alert = this.alertCtrl.create({ title: 'Error: Time Conflict', subTitle: 'Please check that your dates are not conflicting (End Date should not be before Start Date)', buttons: ['ok'] });
            alert.present();
        }
        else if (endLocMarker.getMap() === null) {
            var alert = this.alertCtrl.create({ title: 'Error: Input Error', subTitle: 'Please select an end point on the EditEventMap', buttons: ['ok'] });
            alert.present();
        }
        else {
            var loading = this.loadingCtrl.create({
                content: 'Loading Event...'
            });
            this.storage.set('newEventSubmit', true)
                .then(function () {
                var contactsListString = "";
                for (var i = 0; i < _this.event.value.contactsList.length; i++) {
                    if (i != 0) {
                        contactsListString += ",";
                    }
                    if (_this.event.value.contactsList[i] != "") {
                        contactsListString += _this.event.value.contactsList[i].EmergencyContactID;
                    }
                }
                return contactsListString;
            })
                .then(function (contactsListString) {
                console.log("startLocPos- lat: " + startLocMarker.getPosition().lat() + " lng: " + startLocMarker.getPosition().lng());
                var eventData = {
                    "userid": _this.userid,
                    "name": _this.event.value.name,
                    "description": _this.event.value.description,
                    "startLat": startLocMarker.getPosition().lat(),
                    "startLong": startLocMarker.getPosition().lng(),
                    "endLat": endLocMarker.getPosition().lat(),
                    "endLong": endLocMarker.getPosition().lng(),
                    "startDate": _this.event.value.startDate,
                    "endDate": _this.event.value.endDate,
                    "contactsList": contactsListString,
                    "participants": _this.event.value.participants
                };
                _this.storage.set('CurrentEvent', eventData);
                return eventData;
            })
                .then(function (eventData) {
                _this.storage.set('lastState', 'addeventsubmit')
                    .then(function () {
                    _this.request.InsertEvent(eventData);
                    _this.navCtrl.pop();
                });
            });
        }
    };
    editeventPage.prototype.loadContacts = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Loading Contacts...'
        });
        loading.present().then(function () {
            _this.request.RequestContacts().then(function (data) {
                _this.contacts = data['recordset'];
            });
            loading.dismiss();
        });
    };
    editeventPage.prototype.cancelClick = function () {
        this.navCtrl.pop();
    };
    editeventPage.prototype.addContactClick = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__addcontact_addcontact__["a" /* addcontactPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])('EditEventMap'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* ElementRef */])
    ], editeventPage.prototype, "EditEventMapEl", void 0);
    editeventPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-editevent',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\editevent\editevent.html"*/'<div>\n\n  <form [formGroup]="event" (ngSubmit)="eventForm()">\n\n    <ion-item>\n\n      <ion-input placeholder="Event Name" [(ngModel)]="eventName" formControlName="name" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary">Start Date/Time</ion-label>\n\n      <ion-datetime formControlName="startDate" [(ngModel)]="eventStartDate" allowOldDates="false" [min]="todaysDateString"\n\n                    id="startDate" max="2021-12-31" pickerFormat="MMM/D/YY h:mm A" displayFormat="MM/DD/YYYY h:mm A">Start Date</ion-datetime>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary">End Date/Time</ion-label>\n\n      <ion-datetime formControlName="endDate" [(ngModel)]="eventEndDate" allowOldDates="false" [min]="endDateString" max="2021-12-31"\n\n                    id="endDate" pickerFormat="MMM/D/YY h:mm A" displayFormat="MM/DD/YYYY h:mm A">Start Date</ion-datetime>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-label color="primary">Contact(s)</ion-label>\n\n      <ion-select name="contactsList" [(ngModel)]="contact" multiple="true" formControlName="contactsList">\n\n        <ion-option *ngFor="let contact of contacts"  [value]="contact">{{contact.ContactFirstName}} {{contact.ContactLastName}}</ion-option>\n\n      </ion-select>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <button ion-button type="button" (click)="addContactClick()">Add New Contact..</button>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-input placeholder="Participants (optional)" [(ngModel)]="eventParticipants" formControlName="participants" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n      <ion-input placeholder="Description (required)" [(ngModel)]="eventDescription" formControlName="description" type="text"></ion-input>\n\n    </ion-item>\n\n\n\n\n\n    <button ion-button type="button" (click)="cancelClick()">Cancel</button>\n\n    <button ion-button type="submit" [disabled]="!event.valid">Submit</button>\n\n    <button ion-button type="button" id="togglePosition" (click)="togglePosition()">End</button>\n\n  </form>\n\n</div>\n\n<div #EditEventMap id="EditEventMap"></div>\n\n\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\editevent\editevent.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_4__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["a" /* Storage */]])
    ], editeventPage);
    return editeventPage;
}());

//# sourceMappingURL=editevent.js.map

/***/ }),

/***/ 489:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return editcontactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__httprequest__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//TODO: Get select options to update on edit and delete.
/*
  Generated class for the editcontact page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var editcontactPage = /** @class */ (function () {
    function editcontactPage(alertCtrl, navCtrl, loadingCtrl, navParams, request, formBuilder, storage) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.navParams = navParams;
        this.request = request;
        this.formBuilder = formBuilder;
        this.storage = storage;
        this.loadContacts();
        this.editcontact = this.formBuilder.group({
            contactID: [''],
            firstName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            lastName: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            phoneNumber: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required],
            emailAddress: ['']
        });
    }
    editcontactPage.prototype.loadContacts = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Loading Contacts...'
        });
        loading.present();
        this.request.RequestContacts().then(function (data) {
            _this.contacts = data['recordset'];
            _this.contactID = data['recordset'][0].EmergencyContactID;
            _this.contactFirstName = data['recordset'][0].ContactFirstName;
            _this.contactLastName = data['recordset'][0].ContactLastName;
            _this.contactPhoneNumber = data['recordset'][0].ContactPhoneNumber;
            _this.contactEmailAddress = data['recordset'][0].ContactEmailAddress;
        }).then(function () {
            loading.dismiss();
        });
    };
    editcontactPage.prototype.onSelectChange = function (selectedValue) {
        this.contactID = selectedValue.EmergencyContactID;
        this.contactFirstName = selectedValue.ContactFirstName;
        this.contactLastName = selectedValue.ContactLastName;
        this.contactPhoneNumber = selectedValue.ContactPhoneNumber;
        this.contactEmailAddress = selectedValue.ContactEmailAddress;
    };
    editcontactPage.prototype.editcontactForm = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Changes', subTitle: 'Are you sure you want to change this emergency contact?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        var editcontactData = {
                            "contactid": _this.contactID,
                            "firstName": _this.editcontact.value.firstName,
                            "lastName": _this.editcontact.value.lastName,
                            "phoneNumber": _this.editcontact.value.phoneNumber,
                            "emailAddress": _this.editcontact.value.emailAddress
                        };
                        _this.request.UpdateContact(editcontactData);
                        //can't get the select list to update :(
                        //for (let contact of this.contacts) {
                        //  if (contact.contactID == this.contactID) {
                        //    delete this.contacts['contact'];
                        //  }
                        //}
                    }
                }]
        });
        alert.present();
    };
    editcontactPage.prototype.cancelClick = function () {
        this.navCtrl.pop();
    };
    editcontactPage.prototype.deleteContact = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm Delete', subTitle: 'Are you sure you want to permanently delete this emergency contact?',
            buttons: [{
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Confirm',
                    handler: function () {
                        _this.request.DeleteContact(_this.contactID);
                    }
                }]
        });
        alert.present();
    };
    editcontactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-editcontact',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\editcontact\editcontact.html"*/'<form [formGroup]="editcontact" (ngSubmit)="editcontactForm()">\n\n  <ion-item>\n\n    <ion-select id="contactSelection" name="contactID" [(ngModel)]="contact" (ionChange)="onSelectChange(contact)" multiple="false" formControlName="contactID" interface="action-sheet">\n\n      <ion-option *ngFor="let contact of contacts; let i = index" [value]="contact" [selected]="i===0">{{contact.ContactFirstName}} {{contact.ContactLastName}}</ion-option>\n\n    </ion-select>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>First Name</ion-label>\n\n    <ion-input [(ngModel)]="contactFirstName" formControlName="firstName" type="text" inputmode="text"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Last Name</ion-label>\n\n    <ion-input [(ngModel)]="contactLastName" formControlName="lastName" type="text" inputmode="text"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Phone Number</ion-label>\n\n    <ion-input [(ngModel)]="contactPhoneNumber" formControlName="phoneNumber" type="tel" inputmode="tel"></ion-input>\n\n  </ion-item>\n\n\n\n  <ion-item>\n\n    <ion-label floating>Email Address</ion-label>\n\n    <ion-input [(ngModel)]="contactEmailAddress" formControlName="emailAddress" type="email" inputmode="email"></ion-input>\n\n  </ion-item>\n\n\n\n  <button ion-button type="button" (click)="cancelClick()">Cancel</button>\n\n  <button ion-button type="submit" [disabled]="!editcontact.valid">Save</button>\n\n  <button ion-button type="button" (click)="deleteContact(i)">Delete</button>\n\n</form>\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\editcontact\editcontact.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["a" /* Storage */]])
    ], editcontactPage);
    return editcontactPage;
}());

//# sourceMappingURL=editcontact.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__httprequest__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, alertCtrl, request, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.request = request;
        this.storage = storage;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage.prototype.Register = function () {
        var _this = this;
        //check fields to see if they are valid
        if (this.firstName.value == "") {
            var alert_1 = this.alertCtrl.create({
                title: "Attention", subTitle: "First Name field is empty", buttons: ["Ok"]
            });
            alert_1.present();
        }
        else if (this.lastName.value == "") {
            var alert_2 = this.alertCtrl.create({
                title: "Attention", subTitle: "Last Name field is empty", buttons: ["Ok"]
            });
            alert_2.present();
        }
        else if (this.email.value == "") {
            var alert_3 = this.alertCtrl.create({
                title: "Attention", subTitle: "Email field is empty", buttons: ["Ok"]
            });
            alert_3.present();
        }
        else if (this.phonenumber.value == "") {
            var alert_4 = this.alertCtrl.create({
                title: "Attention", subTitle: "Phone number field is empty", buttons: ["Ok"]
            });
            alert_4.present();
        }
        else if (this.username.value == "") {
            var alert_5 = this.alertCtrl.create({
                title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
            });
            alert_5.present();
        }
        else if (this.password.value == "") {
            var alert_6 = this.alertCtrl.create({
                title: "Attention", subTitle: "Password field is empty", buttons: ["Ok"]
            });
            alert_6.present();
        }
        else 
        //submit data if all feilds are valid
        {
            var data2_1 = {
                username: this.username.value,
                password: this.password.value,
                "firstName": this.firstName.value,
                "lastName": this.lastName.value,
                "emailAddress": this.email.value,
                "phoneNumber": this.phonenumber.value
            };
            this.request.CreateUser(data2_1);
            this.request.GetUserID(data2_1).then(function (data) {
                _this.userID = data['recordset'][0].UserID;
                _this.request.InsertContactInfo(_this.userID, data2_1);
            });
        }
        var alert = this.alertCtrl.create({
            title: "User Created", subTitle: "Usercreated, please log in ", buttons: ["Ok"]
        });
        alert.present();
        this.navCtrl.pop();
    };
    RegisterPage.prototype.Cancel = function () {
        this.navCtrl.pop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("firstName"),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "firstName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("lastName"),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "lastName", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("email"),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "email", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("mobile"),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "phonenumber", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("username"),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "username", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("password"),
        __metadata("design:type", Object)
    ], RegisterPage.prototype, "password", void 0);
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-Register',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\Register\Register.html"*/'<!--\n\n  Generated template for the NewPage page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Register</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list no-line>\n\n    <ion-item>\n\n\n\n      <ion-input type="text" placeholder="First Name" name="firstName" #firstName></ion-input>\n\n\n\n    </ion-item>\n\n    <ion-item>\n\n\n\n      <ion-input type="text" placeholder="Last Name" name="lastName" #lastName></ion-input>\n\n\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n\n\n      <ion-input type="email" placeholder="Email" name="email" #email></ion-input>\n\n\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n\n\n      <ion-input type="number" placeholder="Phone Number" name="phonenumber" #mobile></ion-input>\n\n\n\n    </ion-item>\n\n    <ion-item>\n\n\n\n      <ion-input type="text" placeholder="Username" name="username" #username></ion-input>\n\n\n\n    </ion-item>\n\n\n\n    <ion-item>\n\n\n\n      <ion-input type="password" placeholder="Password" name="password" #password></ion-input>\n\n\n\n    </ion-item>\n\n\n\n  </ion-list>\n\n\n\n  <div padding>\n\n\n\n    <button ion-button round outline block (click)="Register()">Register</button>\n\n    <button ion-button round outline block (click)="Cancel()">Cancel</button>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\Register\Register.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__httprequest__["a" /* httprequest */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["a" /* Storage */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=Register.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return passwordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__httprequest__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the password page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var passwordPage = /** @class */ (function () {
    function passwordPage(navCtrl, navParams, alertCtrl, request) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.request = request;
    }
    passwordPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad passwordPage');
    };
    passwordPage.prototype.submit = function () {
        var _this = this;
        //verify they have values
        if (this.username.value == "") {
            var alert_1 = this.alertCtrl.create({
                title: "Attention", subTitle: "Username field is empty", buttons: ["Ok"]
            });
            alert_1.present();
        }
        else if (this.oPassword.value == "") {
            var alert_2 = this.alertCtrl.create({
                title: "Attention", subTitle: "Old password field is empty", buttons: ["Ok"]
            });
            alert_2.present();
        }
        else if (this.nPassword.value == "") {
            var alert_3 = this.alertCtrl.create({
                title: "Attention", subTitle: "New password field is empty", buttons: ["Ok"]
            });
            alert_3.present();
        }
        //check the username
        var user = {
            username: this.username.value,
            password: this.oPassword.value,
            nPassword: this.nPassword.value,
            userID: 0
        };
        //check valid user through API server
        //check API server to see if the user is valid
        this.request.GetUserID(user).then(function (data) {
            _this.userID = data['recordset'][0].UserID;
            console.log("uuuussser ID", _this.userID);
            //if the user is valid, then check the password
            if (data['recordset'][0].UserID > 0) {
                _this.request.SignIn(user).then(function (data2) {
                    if (data2 == true) {
                        _this.request.ResetPassword(user);
                    }
                    else {
                        //password incorrect alert
                        var alert_4 = _this.alertCtrl.create({
                            title: "Attention", subTitle: "Incorrect old password, try again!", buttons: ["Ok"]
                        });
                        alert_4.present();
                    }
                });
            }
        });
        var alert = this.alertCtrl.create({
            title: "Password Updated", subTitle: "Password updated, please log in again", buttons: ["Ok"]
        });
        alert.present();
        this.navCtrl.pop();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("username"),
        __metadata("design:type", Object)
    ], passwordPage.prototype, "username", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("oPassword"),
        __metadata("design:type", Object)
    ], passwordPage.prototype, "oPassword", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* ViewChild */])("nPassword"),
        __metadata("design:type", Object)
    ], passwordPage.prototype, "nPassword", void 0);
    passwordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({
            selector: 'page-password',template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\password\password.html"*/'<!--\n\n  Generated template for the NewPage page.\n\n\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar>\n\n    <ion-title>Reset Password</ion-title>\n\n  </ion-navbar>\n\n\n  \n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-input round type="text" placeholder="Username" name="username" #username></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-input round type="text" placeholder="Old Password" name="oPassword" #oPassword></ion-input>\n\n    </ion-item>\n\n    <ion-item>\n\n      <ion-input round type="text" placeholder="New Password" name="nPassword" #nPassword></ion-input>\n\n    </ion-item>\n\n    <button ion-button round block (click)="submit()">Submit Change</button>\n\n\n\n  </ion-list>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\pages\password\password.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_2__httprequest__["a" /* httprequest */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__httprequest__["a" /* httprequest */]])
    ], passwordPage);
    return passwordPage;
}());

//# sourceMappingURL=password.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(591);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 591:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(633);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(480);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_addevent_addevent__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_addcontact_addcontact__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_viewevents_viewevents__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_viewEvent_viewEvent__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_editevent_editevent__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_LoginPage_LoginPage__ = __webpack_require__(479);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_Register_Register__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_editcontact_editcontact__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_password_password__ = __webpack_require__(491);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Q" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_addevent_addevent__["a" /* addeventPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_addcontact_addcontact__["a" /* addcontactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_viewevents_viewevents__["a" /* vieweventsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_viewEvent_viewEvent__["a" /* viewEventPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_editevent_editevent__["a" /* editeventPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_editcontact_editcontact__["a" /* editcontactPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_LoginPage_LoginPage__["a" /* LoginPagePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_Register_Register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_password_password__["a" /* passwordPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_addevent_addevent__["a" /* addeventPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_addcontact_addcontact__["a" /* addcontactPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_viewevents_viewevents__["a" /* vieweventsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_viewEvent_viewEvent__["a" /* viewEventPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_editevent_editevent__["a" /* editeventPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_LoginPage_LoginPage__["a" /* LoginPagePage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_Register_Register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_editcontact_editcontact__["a" /* editcontactPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_password_password__["a" /* passwordPage */]
            ],
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicErrorHandler */] }, __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["a" /* Storage */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 633:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(634);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_LoginPage_LoginPage__ = __webpack_require__(479);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyApp = /** @class */ (function () {
    function MyApp(platform) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_3__pages_LoginPage_LoginPage__["a" /* LoginPagePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* StatusBar */].styleDefault();
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Splashscreen */].hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* Component */])({template:/*ion-inline-start:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\Whitney\repos\breadcrumbs\Breadcrumbs\Breadcrumbs\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[492]);
//# sourceMappingURL=main.js.map