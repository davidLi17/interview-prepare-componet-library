//全排列.
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
    //输入：nums = [1,2,3]
    //输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
    //for循环横向遍历,递归纵向遍历.
    //递归终止条件： path.length === nums.length,在叶子节点的时候收集结果.
    const arrLen = nums.length;
    let used = new Array(arrLen).fill(0);//需要初始化为0;
    let path = [];
    let result = [];
    const backTrack = () => {

        if (path.length === arrLen) {
            //叶子节点收集结果,注意要深拷贝 path
            result.push([...path]);//path.slice();
        }
        //     for循环遍历数组：
        // - 判断当前数字是否使用过
        // - 如果没使用过：
        //     1. 标记使用
        //     2. 放入path
        //     3. 递归下一层
        //     4. 回溯：撤销标记
        //     5. 回溯：移除path最后一个元素
        for (let i = 0; i < arrLen; i++) {
            if (!used[i]) {
                used[i] = 1;
                path.push(nums[i]);
                backTrack(path, used);
                used[i] = 0;
                path.pop();
            }
        }
    }
    backTrack();
    return result;
};
let nums = [1, 2, 3, 4];
// console.log(permute(nums));
//子集问题:
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    const arrLen = nums.length;
    let path = [];
    let result = [];

    const backTrack = (startIndex) => {
        // 收集所有节点的结果
        result.push([...path]);

        // 单层搜索逻辑
        for (let i = startIndex; i < arrLen; i++) {
            path.push(nums[i]);
            backTrack(i + 1);  // 注意这里是i+1，不是startIndex+1
            path.pop();  // 回溯，撤销处理的节点
        }
    }

    backTrack(0);  // 从索引0开始
    return result;
};

// 测试
let numsubsets = [1, 2, 3];
// console.log(subsets(numsubsets));
/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
    //输入：s = "25525511135"
    //输出：["255.255.11.135","255.255.111.35"]
    const arrLen = s.length;
    //组合问题,path和result数组先设置好
    let path = [], result = [];
    //- 参数：需要startIndex（当前处理位置）和pointNum（已插入点的数量）
    // - 终止条件：当pointNum为3（已插入三个点）且最后一段也合法时
    // - 单层逻辑：在每个可能的位置切割，验证合法性，然后递归
    // 判断IP段是否合法
    const isValidIp = (str) => {
        //str:0.1.2.201里面的一个部分,比如0,201
        //首先是长度不能>3,而且长度不能是0,刚才没有加入 这个判断,无法通过测试.
        if (str.length > 3 || str.length == 0) return false;

        // 大于1位数时不能以0开头
        if (str.length > 1 && str[0] === "0") return false;
        const num = Number(str);
        return num >= 0 && num <= 255;
    }
    //使用index开始设置切割位置.切割String,也就是数组的变种.
    const backTrack = (startIndex, pointNum) => {
        if (pointNum === 3) {
            const lastPart = s.slice(startIndex);//切分出最后一个部分
            console.log("index.js lastPart::", lastPart);
            if (isValidIp(lastPart)) {
                //path=[255,255,11]
                result.push([...path, lastPart].join("."));
                // console.log("isValidIp path::", path);
                // console.log("isValidIp lastPart::", lastPart);
            }
            return;
        }
        for (let i = startIndex; i < s.length; i++) {
            //startIndex是死的,但是i是会不断增加的
            const curStr = s.slice(startIndex, i + 1);
            // console.log("index.js curStr::", curStr);
            if (isValidIp(curStr)) {
                path.push(curStr);
                backTrack(i + 1, pointNum + 1);//合法的ip才继续进行i+1的切割
                path.pop();
            } else {
                break;
            }
        }
    }
    backTrack(0, 0);
    return result;
};

console.log("index.js restoreIpAddresse;::", restoreIpAddresses("101023"));
