"use strict";
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
exports.getSimpleJwtAuth = void 0;
const async_storage_1 = require("@react-native-async-storage/async-storage");
const lodash_1 = require("lodash");
const getSimpleJwtAuth = (key, path) => {
    return {
        interceptorRequest: (config) => __awaiter(void 0, void 0, void 0, function* () {
            const authCached = yield async_storage_1.default.getItem(key);
            if (authCached && config.headers) {
                const cachedParsed = JSON.parse(authCached);
                const token = (0, lodash_1.get)(cachedParsed, path);
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }),
    };
};
exports.getSimpleJwtAuth = getSimpleJwtAuth;
