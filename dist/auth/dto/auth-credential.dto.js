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
exports.AuthCredentialsDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AuthCredentialsDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(4),
    class_validator_1.MaxLength(20),
    __metadata("design:type", String)
], AuthCredentialsDto.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(20),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'Passwords should contain at least one upper case letter, one lower case letter and one number or a special character'
    }),
    __metadata("design:type", String)
], AuthCredentialsDto.prototype, "password", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(5),
    class_validator_1.MaxLength(12),
    __metadata("design:type", String)
], AuthCredentialsDto.prototype, "ssn", void 0);
__decorate([
    class_validator_1.IsDate(),
    class_transformer_1.Type(() => Date),
    __metadata("design:type", Date)
], AuthCredentialsDto.prototype, "dob", void 0);
exports.AuthCredentialsDto = AuthCredentialsDto;
//# sourceMappingURL=auth-credential.dto.js.map