// function sumup(in1,in2){
//     let number1 = ""
//     let result = []
//     let number2 = ""
//     while(in1.length > 0){
//         number1 += String(in1.pop())
//     }
//     while(in2.length > 0){
//         number2 += String(in2.pop())
//     }
//     let res = Number(number1) + Number(number2)
//     while(res != 0){
//         result.push(res%10)
//         res = Math.trunc(res / 10)
//     }
//     return result
// }

// console.log(sumup([5,6,4],[2,4,3]))


/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
 var addTwoNumbers = function(l1, l2) {
    let number1 = ""
    let result = []
    let number2 = ""
    while(l1.length > 0){
        number1 += String(l1.pop())
    }
    while(l2.length > 0){
        number2 += String(l2.pop())
    }
    let res = Number(number1) + Number(number2)
    while(res != 0){
        result.push(res%10)
        res = Math.trunc(res / 10)
    }
    return new ListNode(result)
};

console.log(addTwoNumbers([2,4,3],[5,6,4]))