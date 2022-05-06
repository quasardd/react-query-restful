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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildMutation = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const lodash_1 = require("lodash");
const react_query_1 = require("react-query");
const __1 = require("..");
const Mutation = ({ operation, path, invalidatePaths, options, cacheResponse, }) => {
    const { axios, autoInvalidation } = (0, __1.useRestContext)();
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
            yield async_storage_1.default.setItem(cacheResponse.key, JSON.stringify(response.data));
        }
        return response.data;
    }), Object.assign({ onSuccess: (data, variables, context) => {
            if (autoInvalidation) {
                queryClient.invalidateQueries((0, __1.buildUrl)(path, variables === null || variables === void 0 ? void 0 : variables.appendToUrl));
            }
            if (invalidatePaths) {
                invalidatePaths.forEach((v) => {
                    queryClient.invalidateQueries(v);
                });
            }
            if (onSuccess) {
                onSuccess(data, variables, context);
            }
        } }, restOptions));
};
function build(config, operation) {
    return (overrideConfig) => Mutation(Object.assign(Object.assign(Object.assign({}, config), { operation }), overrideConfig));
}
function buildMutation(config) {
    const buildWithConfig = (0, lodash_1.curry)(build)(config);
    const formattedPaths = [];
    if (Array.isArray(config.path)) {
        config.path.forEach((path) => {
            const singularPath = path.replace(/s$/, "");
            formattedPaths.push(singularPath);
        });
    }
    else {
        const { path } = config;
        const singularPath = path.replace(/s$/, "");
        formattedPaths.push(singularPath);
    }
    const methods = {};
    formattedPaths.forEach((path) => {
        methods[(0, lodash_1.camelCase)(`create ${path} mutation`)] = buildWithConfig("CREATE");
        methods[(0, lodash_1.camelCase)(`update ${path} mutation`)] = buildWithConfig("UPDATE");
        methods[(0, lodash_1.camelCase)(`replace ${path} mutation`)] = buildWithConfig("REPLACE");
        methods[(0, lodash_1.camelCase)(`delete ${path} mutation`)] = buildWithConfig("DELETE");
    });
    return methods;
}
exports.buildMutation = buildMutation;
function getMethodFromOperation(operation) {
    switch (operation) {
        case "UPDATE":
            return "PATCH";
        case "REPLACE":
            return "PUT";
        case "DELETE":
            return "DELETE";
        case "CREATE":
        default:
            return "POST";
    }
}
//# sourceMappingURL=index.js.map