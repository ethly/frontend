
class ConsoleLogger {
  info() {
    console.log(...arguments)
  }

  warn() {
    console.warn(...arguments)
  }

  error() {
    console.error(...arguments)
  }
}

class ProductionLogger {
  info() {
    // NoOp
  }

  warn() {
    // NoOp
  }

  error() {
    // NoOp
  }
}

function chooseLogger() {
  if (process.env.NODE_ENV === 'development') {
    return new ConsoleLogger()
  } else {
    return new ProductionLogger()
  }
}

export default chooseLogger()
