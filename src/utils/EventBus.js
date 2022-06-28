export class EventBus {
  constructor() {
    this.event = {}
  }

  subscribe(eventName, callback) {
    if (!this.event[eventName]) {
      this.event[eventName] = []
    }

    this.event[eventName].push(callback)
  }

  unsubscribe(eventName, callback) {
    if (!this.event[eventName]) {
      return
    }

    this.event[eventName] = this.event[eventName].filter(
      (cb) => cb !== callback
    )
  }

  dispatch(eventName, payload) {
    if (!this.event[eventName]) {
      return
    }

    this.event[eventName].forEach((cb) => cb(payload))
  }
}

const eventBus = new EventBus()

export default eventBus
