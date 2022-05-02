"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimpleJwtAuth = exports.buildQuery = exports.updateMutation = exports.replaceMutation = exports.deleteMutation = exports.createMutation = exports.BoilerplateQueryProvider = void 0;
var core_1 = require("./core");
Object.defineProperty(exports, "BoilerplateQueryProvider", { enumerable: true, get: function () { return core_1.BoilerplateQueryProvider; } });
var mutations_1 = require("./core/mutations");
Object.defineProperty(exports, "createMutation", { enumerable: true, get: function () { return mutations_1.createMutation; } });
Object.defineProperty(exports, "deleteMutation", { enumerable: true, get: function () { return mutations_1.deleteMutation; } });
Object.defineProperty(exports, "replaceMutation", { enumerable: true, get: function () { return mutations_1.replaceMutation; } });
Object.defineProperty(exports, "updateMutation", { enumerable: true, get: function () { return mutations_1.updateMutation; } });
var queries_1 = require("./core/queries");
Object.defineProperty(exports, "buildQuery", { enumerable: true, get: function () { return queries_1.buildQuery; } });
var auths_1 = require("./core/auths");
Object.defineProperty(exports, "getSimpleJwtAuth", { enumerable: true, get: function () { return auths_1.getSimpleJwtAuth; } });
//# sourceMappingURL=index.js.map