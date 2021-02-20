/***
 * EPOCH
 *
 */

/**
 *
 * WAIT : waits and resolves promise at given duration
 * takes: microseconds
 * returns: promise boolean
 */
export const wait = (duration: number): Promise<boolean> => {
  const time: number = performance.now() + duration
  return new Promise((resolve, reject) => {
    try {
      const timeKeeper = () => {
        if (performance.now() < time) {
          window.requestAnimationFrame(timeKeeper)
        } else {
          resolve(true)
        }
      }
      window.requestAnimationFrame(timeKeeper)
    } catch (err) {
      reject(false)
    }
  })
}

/**
 *
 * AT: waits until the given time and then resolves promise at given local time
 * takes: date
 * returns: promise boolean
 */
export const at = (date: Date): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    try {
      const now = Date.now()
      const duration = date.getTime()
      const remainingTime = duration - now
      await wait(remainingTime)
      if (duration <= now) {
        return resolve(true)
      }
    } catch (err) {
      reject(false)
    }
  })
}
/**
 *
 * IsTIME: checks if time has past or equal to local time and returns boolean
 * takes: date
 * returns: boolean
 */
export const isTime = (date: Date): boolean => {
  const now = Date.now()
  const duration = date.getTime()
  if (duration <= now) {
    return true
  }
  return false
}

/**
 *
 * TIMER: runs given callback for duration of time in given interval
 * takes: duration, interval and callback function
 * major difference: it takes call back
 */

export const timer = async (
  duration: number,
  interval: number,
  callback: Function
) => {
  try {
    const now = Date.now()
    if (duration <= now) return callback()
    await wait(interval)
    timer(duration, interval, callback)
  } catch (err) {
    console.log(err)
  }
}

export default {
  wait,
  at,
  isTime,
  timer
}
