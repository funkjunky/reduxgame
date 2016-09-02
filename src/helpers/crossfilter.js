//permutation means order matters.
//Tested with numbers
const crossFilter = (arr, fnc, permutations = false) => {
    let result = [];
    for(let i = 0; i != arr.length; ++i)
        for(let k = ((permutations) ? i + 1 : 0); k != arr.length; ++k)
            if(i != k && fnc(arr[i], arr[k]))
                result.push([arr[i], arr[k]]);

    return result;
};

export default crossFilter;
