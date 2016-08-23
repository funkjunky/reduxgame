const exclusives = (obj, mappings) => {
    return mappings.reduce((carry, mapping) => ({...carry, ...exclusive(obj, mapping)}), {});
};

function* entries(obj) {
   for (let key of Object.keys(obj)) {
     yield [key, obj[key]];
   }
}

//given an object, and a mapping object, we return a the new objects properties mapped onto the old object, if and only if there is exactly one key matched.
//examples (obj, mapping) -> mapping's value object:
//({apple: 1, pear: 1}, {apple: {a: 42}}) -> {a: 42}
//({apple: 1, pear: 1}, {apple: {a: 42}, pear: {b: 12}}) -> {}
//TODO: the _def part is gross...
const exclusive = (obj, mapping) => {
    let found = false;
    for(let [key, value] of entries(mapping)) {
        if(found && obj[key])
            return mapping._def;
        else if(obj[key])
            found = value;
    }

    if(found)
        return found;
    else
        return mapping._def;
}

//only apply controls if applyControls is true
const movement = (state = {x: 0, y: 0}, {type, input = {}, applyControls = false} ) => (applyControls)
    ? {
        ...state,
        ...exclusives(input, [{37: {x: -1200}, 39: {x:1200}, '_def': {x: 0}}, {38: {y:-1200}, 40: {y:1200}, '_def': {y: 0}}])
    }
    : state;

export default movement;
