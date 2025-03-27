
function myReduce(array, callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : array[0];
    const startIndex = initialValue !== undefined ? 0 : 1;

    for (let i = startIndex; i < array.length; i++) {
        accumulator = callback(accumulator, array[i], i, array);
    }

    return accumulator;
}

// 使用我们自己实现的 reduce
const longestString = myReduce(
    ['', "bab", "ba"],
    (longest, str) => {
        console.log("String操作/index.js str::", str);
        console.log("String操作/index.js longest::", longest);
        return str.length > longest.length ? str : longest;
    },
    ''
);

console.log("最终结果:", longestString);