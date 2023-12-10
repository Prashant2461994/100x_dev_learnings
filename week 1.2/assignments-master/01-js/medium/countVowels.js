/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  const vowels = ["a", "e", "i", "o", "u"];
  const chars = [...str.toLowerCase()];

  let res = 0;
  chars.forEach((ele) => {
    if (vowels.includes(ele)) {
      res += 1;
    }
  });

  return res;
}


module.exports = countVowels;
