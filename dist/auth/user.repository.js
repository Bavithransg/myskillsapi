"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    signUp(AuthCredentialsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password, ssn, dob } = AuthCredentialsDto;
            const user = new user_entity_1.User();
            user.name = name;
            user.salt = yield bcrypt.genSalt();
            user.password = yield this.hashPassword(password, user.salt);
            user.ssn = ssn;
            user.dob = dob;
            try {
                yield user.save();
            }
            catch (error) {
                console.log(error);
                if (error.code === 'ER_DUP_ENTRY') {
                    throw new common_1.ConflictException('Name already exist.');
                }
                else {
                    throw new common_1.InternalServerErrorException();
                }
            }
        });
    }
    validateUserPassword(authLoginCredentialsDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = authLoginCredentialsDto;
            const user = yield this.findOne({ name });
            if (user && (yield user.validatePassword(password))) {
                return user.name;
            }
            else {
                return null;
            }
        });
    }
    hashPassword(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt.hash(password, salt);
        });
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_entity_1.User)
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map