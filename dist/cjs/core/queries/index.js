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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildQuery = void 0;
const async_storage_1 = __importDefault(require("@react-native-async-storage/async-storage"));
const react_query_1 = require("react-query");
const __1 = require("..");
const Query = ({ params, appendToUrl, path, options, cacheResponse, query, }) => {
    const { axios } = (0, __1.useRestContext)();
    return (0, react_query_1.useQuery)(Object.assign({ queryKey: [path, query, appendToUrl, params], queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios.request({
                method: "GET",
                params,
                url: (0, __1.buildUrl)({ path, query, append: appendToUrl }),
            });
            if (cacheResponse) {
                yield async_storage_1.default.setItem(cacheResponse.key, JSON.stringify(response.data));
            }
            return response.data;
        }) }, options));
};
function buildQuery(config) {
    return (data) => Query(Object.assign(Object.assign({}, config), data));
}
exports.buildQuery = buildQuery;
//# sourceMappingURL=index.js.map