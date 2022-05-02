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
import { useQuery } from "react-query";
import { buildUrl, useQueryContext } from "..";
const Query = ({ params, appendToUrl, path, options, cacheResponse, }) => {
    const { axios } = useQueryContext();
    return useQuery(Object.assign({ queryKey: [path, appendToUrl, params], queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield axios.request({
                method: "GET",
                params,
                url: buildUrl(path, appendToUrl),
            });
            if (cacheResponse) {
                yield AsyncStorage.setItem(cacheResponse.key, response.data);
            }
            return response.data;
        }) }, options));
};
export function buildQuery(config) {
    return function (data) {
        return Query(Object.assign(Object.assign({}, config), data));
    };
}