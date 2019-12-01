"use strict";
var BankAccount = /** @class */ (function () {
    function BankAccount() {
        this.balance = 0;
    }
    BankAccount.prototype.deposit = function (credit) {
        this.balance += credit;
        return this.balance;
    };
    return BankAccount;
}());
//# sourceMappingURL=app.js.map