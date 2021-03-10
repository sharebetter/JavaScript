/*
 * @Author: 曾海明
 * @Date: 2020-11-12 09:56:08
 * @Description:
 */
/**
  extensions is an Array and each item has such format:
  {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
  lastName, ext can be empty, extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO".
**/

/**
  Question 1: sort extensions by "firstName" + "lastName" + "ext" ASC
**/
function sortExtensionsByName(extensions) {
  const extType = ["DigitalUser", "VirtualUser", "FaxUser", "Dept", "AO"]
  // 拼接
  function getCombinedName(item) {
    return `${item.firstName}${item.lastName}${item.ext}`
  }
  // 检验 extType
  function checkIndexOf() {
    return extensions.some(item => {
      console.log(`extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO"`)
      return (extType.indexOf(item.extType) === -1)
    })
  }
  // 排序
  function extensionsSort() {
    return extensions.sort((a, b) => {
      const preCombinedName = getCombinedName(a)
      const nextCombinedName = getCombinedName(b)
      return preCombinedName.localeCompare(nextCombinedName)
    })
  }
  return checkIndexOf() ? false : extensionsSort()
}


/**
  Question 2: sort extensions by extType follow these orders ASC
  DigitalUser < VitrualUser < FaxUser < AO < Dept.
**/
function sortExtensionsByExtType(extensions) {
  const ExtType = {
    DigitalUser: 1,
    VitrualUserArr: 2,
    FaxUser: 3,
    AO: 4,
    Dept: 5
  }
  return extensions.sort((a, b) => {
    return ExtType[a.extType] - ExtType[b.extType]
  })
}


/**
  saleItems is an Array has each item has such format:
  {
  month: n, //[1-12],
  date: n, //[1-31],
  transationId: "xxx",
  salePrice: number
  }
**/

/**
  Question 3: write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
  [
    {quarter: 1, totalPrices: xxx, transactionNums: n},
    {....}
  ]
**/

function sumByQuarter(saleItems) {
  /*
   * 算出当前季度，0为第一季度，以此类推
   */
  function getQuarter(month) {
    return Math.floor((month - 1) / 3)
  }
  // 初始化默认数据
  const quarterArr = new Array(4).fill({}).map((item, index) => {
    item.quarter = index + 1
    item.totalPrices = 0
    item.transactionNums = 0
    return {
      ...item
    }
  })
  saleItems.forEach(item => {
    const {
      month,
      salePrice
    } = item
    quarterArr[getQuarter(month)].totalPrices += salePrice
    quarterArr[getQuarter(month)].transactionNums += 1
  })
  return quarterArr
}

/**
  Question 4: write a function to calculate and return a list of average sales for each quarter, expected result like:
  [
    {quarter: 1, averagePrices: xxx, transactionNums: n},
    {....}
  ]
**/

function averageByQuarter(saleItems) {
  // 计算每个季度总销售额，返回4个季度销售额数组
  const sumQuarterArr = sumByQuarter(saleItems)
  // 计算每个季度每台机器的价格
  const averageQuarterArr = calculateAverage(sumQuarterArr, 4)
  return averageQuarterArr

  function calculateAverage(sumQuarterArr, fixedNum) {
    return sumQuarterArr.map((item, index) => {
      const {
        quarter,
        totalPrices,
        transactionNums
      } = item
      let averagePrices = totalPrices > 0 ? calculateFixed((totalPrices / transactionNums), fixedNum) : 0
      return {
        quarter: quarter,
        averagePrices: averagePrices,
        transactionNums: transactionNums
      }
    })
    /**
     * @description: 计算平均值，默认四舍五入取2位小数，返回number类型
     * @param {*} total
     * @param {*} calculateNumber
     */
    function calculateFixed(calculateNumber, fixedNum = 2) {
      return Number(calculateNumber.toFixed(fixedNum))
    }
  }
}


/**
  Question 5: please create a tool to generate Sequence
  Expected to be used like:
  var sequence1 = new Sequence();
  sequence1.next() --> return 1;
  sequence1.next() --> return 2;

  in another module:
  var sequence2 = new Sequence();
  sequence2.next() --> 3;
  sequence2.next() --> 4;
**/

const Sequence = new Function()
Sequence.prototype.value = 0
Sequence.prototype.next = function () {
  return ++Sequence.prototype.value
}
const sequence1 = new Sequence();
sequence1.next() // return 1;
sequence1.next() // return 2;

const sequence2 = new Sequence();
sequence2.next() // return 3;
sequence2.next() // return 4;


/**
    Question 6:
    AllKeys: 0-9;
    usedKeys: an array to store all used keys like [2,3,4];
    We want to get an array which contains all the unused keys,in this example it would be: [0,1,5,6,7,8,9]
**/

function getUnUsedKeys(allKeys, usedKeys) {
  //TODO
  return allKeys.filter(item => {
    return usedKeys.indexOf(item) === -1
  })
}