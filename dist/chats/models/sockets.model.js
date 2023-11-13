"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketSchema = exports.Socket = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const options = {
    id: false,
    collection: 'sockets',
    timestamps: true,
};
let Socket = class Socket extends mongoose_1.Document {
};
__decorate([
    (0, mongoose_2.Prop)({
        unique: true,
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Socket.prototype, "id", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        required: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Socket.prototype, "username", void 0);
Socket = __decorate([
    (0, mongoose_2.Schema)(options)
], Socket);
exports.Socket = Socket;
exports.SocketSchema = mongoose_2.SchemaFactory.createForClass(Socket);
//# sourceMappingURL=sockets.model.js.map