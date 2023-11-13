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
exports.ChattingSchema = exports.Chatting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_validator_1 = require("class-validator");
const sockets_model_1 = require("./sockets.model");
const options = {
    id: false,
    collection: 'chattings',
    timestamps: true,
};
let Chatting = class Chatting extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: {
            _id: { type: mongoose_2.Types.ObjectId, required: true, ref: 'sockets' },
            id: { type: String },
            username: { type: String, required: true },
        },
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", sockets_model_1.Socket)
], Chatting.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Chatting.prototype, "chat", void 0);
Chatting = __decorate([
    (0, mongoose_1.Schema)(options)
], Chatting);
exports.Chatting = Chatting;
exports.ChattingSchema = mongoose_1.SchemaFactory.createForClass(Chatting);
//# sourceMappingURL=chattings.model.js.map