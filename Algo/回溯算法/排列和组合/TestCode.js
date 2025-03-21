/**
 * 处理元素无重不可复选的回溯算法
 * @returns {{
 *   combination: (nums: number[]) => number[][],
 *   permutation: (nums: number[]) => number[][]
 * }}
 */
const backtrackNoRepeatNoReuse = () => {
    /**
     * 生成所有可能的组合/子集
     * @param {number[]} nums - 输入数组
     * @returns {number[][]} 所有可能的组合结果
     */
    const combination = (nums) => {
        const result = [];
        const path = [];

        /**
         * 回溯函数
         * @param {number} startIndex - 开始遍历的索引
         */
        const backtrack = (startIndex) => {
            result.push([...path]);

            for (let i = startIndex; i < nums.length; i++) {
                path.push(nums[i]);
                backtrack(i + 1);
                path.pop();
            }
        }

        backtrack(0);
        return result;
    }

    /**
     * 生成所有可能的排列
     * @param {number[]} nums - 输入数组
     * @returns {number[][]} 所有可能的排列结果
     */
    const permutation = (nums) => {
        const result = [];
        const path = [];
        const used = new Array(nums.length).fill(false);

        const backtrack = () => {
            if (path.length === nums.length) {
                result.push([...path]);
                return;
            }

            for (let i = 0; i < nums.length; i++) {
                if (used[i]) continue;

                used[i] = true;
                path.push(nums[i]);
                backtrack();
                path.pop();
                used[i] = false;
            }
        }

        backtrack();
        return result;
    }

    return { combination, permutation };
}

/**
 * 处理元素可重不可复选的回溯算法
 * @returns {{
 *   combination: (nums: number[]) => number[][],
 *   permutation: (nums: number[]) => number[][]
 * }}
 */
const backtrackWithRepeatNoReuse = () => {
    /**
     * 生成所有可能的组合/子集（处理重复元素）
     * @param {number[]} nums - 输入数组
     * @returns {number[][]} 所有可能的组合结果
     */
    const combination = (nums) => {
        const result = [];
        const path = [];
        nums.sort((a, b) => a - b);  // 先排序

        /**
         * 回溯函数
         * @param {number} startIndex - 开始遍历的索引
         */
        const backtrack = (startIndex) => {
            result.push([...path]);

            for (let i = startIndex; i < nums.length; i++) {
                // 跳过重复元素
                if (i > startIndex && nums[i] === nums[i - 1]) continue;

                path.push(nums[i]);
                backtrack(i + 1);
                path.pop();
            }
        }

        backtrack(0);
        return result;
    }

    /**
     * 生成所有可能的排列（处理重复元素）
     * @param {number[]} nums - 输入数组
     * @returns {number[][]} 所有可能的排列结果
     */
    const permutation = (nums) => {
        const result = [];
        const path = [];
        const used = new Array(nums.length).fill(false);
        nums.sort((a, b) => a - b);  // 先排序

        const backtrack = () => {
            if (path.length === nums.length) {
                result.push([...path]);
                return;
            }

            for (let i = 0; i < nums.length; i++) {
                if (used[i]) continue;
                // 固定相同元素的相对位置
                if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

                used[i] = true;
                path.push(nums[i]);
                backtrack();
                path.pop();
                used[i] = false;
            }
        }

        backtrack();
        return result;
    }

    return { combination, permutation };
}

/**
 * nums 中的元素都是唯一的，每个元素可以被使用若干次
 * @returns {{
 *   combination: (nums: number[]) => number[][],
 *   permutation: (nums: number[]) => number[][]
 * }}
 */
const backtrackNoRepeatWithReuse = () => {
    /**
     * 生成所有可能的组合/子集（允许重复选择）
     * @param {number[]} nums - 输入数组
     * @returns {number[][]} 所有可能的组合结果
     */
    const combination = (nums) => {
        const result = [];
        const path = [];

        /**
         * 回溯函数
         * @param {number} startIndex - 开始遍历的索引
         */
        const backtrack = (startIndex) => {
            if (path.length > nums.length) return;
            result.push([...path]);

            for (let i = startIndex; i < nums.length; i++) {
                path.push(nums[i]);
                backtrack(i);
                path.pop();
            }
        }

        backtrack(0);
        return result;
    }

    /**
     * 生成所有可能的排列（允许重复选择）
     * @param {number[]} nums - 输入数组
     * @returns {number[][]} 所有可能的排列结果
     */
    const permutation = (nums) => {
        const result = [];
        const path = [];

        const backtrack = () => {
            if (path.length === nums.length) {
                result.push([...path]);
                return;
            }

            for (let i = 0; i < nums.length; i++) {
                path.push(nums[i]);
                backtrack();
                path.pop();
            }
        }

        backtrack();
        return result;
    }

    return { combination, permutation };
}

// 测试代码
const nums1 = [1, 2, 3];
const nums2 = [1, 1, 2];
const nums3 = [1, 2, 3];

console.log('1. 元素无重不可复选：');
const { combination: c1, permutation: p1 } = backtrackNoRepeatNoReuse();
console.log('组合：', c1(nums1));
console.log('排列：', p1(nums1));

console.log('\n2. 元素可重不可复选：');
const { combination: c2, permutation: p2 } = backtrackWithRepeatNoReuse();
console.log('组合：', c2(nums2));
console.log('排列：', p2(nums2));

console.log('\n3. 元素无重可复选：');
const { combination: c3, permutation: p3 } = backtrackNoRepeatWithReuse();
console.log('组合：', c3(nums3));
console.log('排列：', p3(nums3));