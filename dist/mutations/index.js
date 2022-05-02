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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMutation = exports.replaceMutation = exports.updateMutation = exports.createMutation = void 0;
const async_storage_1 = require("@react-native-async-storage/async-storage");
const lodash_1 = require("lodash");
const react_query_1 = require("react-query");
const __1 = require("..");
const Mutation = ({ operation, path, invalidatePaths, options, cacheResponse, }) => {
    const { axios } = (0, __1.useQueryContext)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const _a = options || {}, { onSuccess } = _a, restOptions = __rest(_a, ["onSuccess"]);
    return (0, react_query_1.useMutation)((variables) => __awaiter(void 0, void 0, void 0, function* () {
        const method = getMethodFromOperation(operation);
        const response = yield axios.request({
            method,
            data: variables === null || variables === void 0 ? void 0 : variables.data,
            url: (0, __1.buildUrl)(path, variables === null || variables === void 0 ? void 0 : variables.appendToUrl),
        });
        if (cacheResponse) {
            yield async_storage_1.default.setItem(cacheResponse.key, response.data);
        }
        return response.data;
    }), Object.assign({ onSuccess: (data, variables, context) => {
            queryClient.invalidateQueries(path);
            queryClient.invalidateQueries(path);
            if (invalidatePaths) {
                invalidatePaths.forEach((v) => {
                    queryClient.invalidateQueries(v);
                    queryClient.invalidateQueries(v);
                });
            }
            if (onSuccess) {
                onSuccess(data, variables, context);
            }
        } }, restOptions));
};
function buildMutation(operation, config) {
    return function (overrideConfig) {
        return Mutation(Object.assign(Object.assign(Object.assign({}, config), { operation }), overrideConfig));
    };
}
exports.createMutation = (0, lodash_1.curry)(buildMutation)("CREATE");
exports.updateMutation = (0, lodash_1.curry)(buildMutation)("UPDATE");
exports.replaceMutation = (0, lodash_1.curry)(buildMutation)("REPLACE");
exports.deleteMutation = (0, lodash_1.curry)(buildMutation)("DELETE");
function getMethodFromOperation(operation) {
    switch (operation) {
        case "CREATE":
            return "POST";
        case "UPDATE":
            return "PATCH";
        case "REPLACE":
            return "PUT";
        case "DELETE":
            return "DELETE";
    }
}
