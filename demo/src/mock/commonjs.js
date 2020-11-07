(function (modules) {
    const modulesCache = {}
    const _require=function(moduleId){
        const _module={
            _exports:{}
        }
        if(modulesCache[moduleId]){
            console.log("trigger cache return ",modulesCache[moduleId])
            return modulesCache[moduleId]
        }
        else{
            modules[moduleId].call(this,_module,_module._exports,_require)
            modulesCache[moduleId]=_module._exports
            return _module._exports
        }
    }
    _require("./src/index.js")
})({
    "./src/moduleA.js": function (_module, _exports, _require) {
        const moduleB=_require("./src/moduleB.js")
        console.log("moduleB",moduleB)
        const moduleA = { name: "moduleA" }
        _module._exports = moduleA
    },
    "./src/moduleB.js": function (_module, _exports, _require) {
        const moduleB = { name: "moduleB" }
        _module._exports = moduleB
    },
    "./src/index.js": function (_module, _exports, _require) {
        const moduleA = _require("./src/moduleA.js")
        const moduleB = _require("./src/moduleB.js")
        console.log("moduleA is ", moduleA, " moduleB is ", moduleB)
    }
})