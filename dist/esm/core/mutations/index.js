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
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { curry } from "lodash";
import { useMutation, useQueryClient } from "react-query";
import { buildUrl, useQueryContext } from "..";
const Mutation = ({ operation, path, invalidatePaths, options, cacheResponse, }) => {
    const { axios } = useQueryContext();
    const queryClient = useQueryClient();
    const _a = options || {}, { onSuccess } = _a, restOptions = __rest(_a, ["onSuccess"]);
    return useMutation((variables) => __awaiter(void 0, void 0, void 0, function* () {
        const method = getMethodFromOperation(operation);
        const response = yield axios.request({
            method,
            data: variables === null || variables === void 0 ? void 0 : variables.data,
            url: buildUrl(path, variables === null || variables === void 0 ? void 0 : variables.appendToUrl),
        });
        if (cacheResponse) {
            // await AsyncStorage.setItem(cacheResponse.key, response.data);
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
export const createMutation = curry(buildMutation)("CREATE");
export const updateMutation = curry(buildMutation)("UPDATE");
export const replaceMutation = curry(buildMutation)("REPLACE");
export const deleteMutation = curry(buildMutation)("DELETE");
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
//# sourceMappingURL=index.js.map