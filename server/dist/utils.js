"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateSeed = void 0;
const GenerateSeed = (length) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.GenerateSeed = GenerateSeed;
//# sourceMappingURL=utils.js.map