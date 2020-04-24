function mixin(target, ...objects) {
    for (const object of objects) {
        if (typeof object === 'object') {
            for (const key of Object.keys(object)) {
                if (typeof object[key] === 'object') {
                    target[key] = Array.isArray(object[key]) ? [] : {};
                    mixin(target[key], object[key]);
                } else {
                    Object.assign(target, object);
                }
            }
        }
    }
    return target;
}

const Superhuman = {
    arms: 2,
    legs: 2,
    walk() { console.log('Walking'); }
}

Superhuman.init = function(name, realName) {
    this.name = name;
    this.realName = realName;
    this.init = undefined; // this line removes the init function, so it can only be called once
    return this;
}

const wonderWoman = Object.create(Superhuman);

function copy(target) {
    const object = Object.create(Object.getPrototypeOf(target));
    mixin(object, target);
    return object;
}