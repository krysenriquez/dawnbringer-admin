export const arrayObjectsToHorizontalBarGraph = (array, x, y) => {
  let return_arr = []

  array.map((arr) => {
    return_arr.push({
      x: arr[`${x}`],
      y: arr[`${y}`],
    })
  })

  return return_arr
}
