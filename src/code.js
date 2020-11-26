function jump(array) {
    if (array[0] === 0 && array.length > 1) {
        return false
    } else if (array.length === 1) {
        return true
    }
}
var canJump = function (nums) {
    let max = 0 // 能够走到的数组下标
    for (let i = 0; i < nums.length; i++) {
        if (max < i) return false // 当前这一步都走不到，后面更走不到了
        max = Math.max(nums[i] + i, max)
    }

    return max >= nums.length - 1
}
console.log(canJump([2, 0, 1, 3, 4]))
