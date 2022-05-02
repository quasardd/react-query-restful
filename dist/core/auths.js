var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "lodash";
export const getSimpleJwtAuth = (key, path) => {
    return {
        interceptorRequest: (config) => __awaiter(void 0, void 0, void 0, function* () {
            const authCached = yield AsyncStorage.getItem(key);
            if (authCached && config.headers) {
                const cachedParsed = JSON.parse(authCached);
                const token = get(cachedParsed, path);
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }),
    };
};
