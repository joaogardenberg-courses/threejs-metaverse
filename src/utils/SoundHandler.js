class SoundHandler {
  constructor(soundList) {
    this.nodeList = {}
    this.audioList = []

    if (soundList) {
      this.setSoundList(soundList)
    }
  }

  setSoundList(soundList) {
    this.audioList = soundList

    Object.keys(this.audioList).forEach((name) => {
      let audio = new Audio(this.audioList[name])
      audio.volume = 1
      audio._volume = 1
      this.nodeList[name] = audio
    })
  }

  play(name) {
    this.nodeList[name].pause()
    this.nodeList[name].currentTime = 0
    this.nodeList[name].play()
  }

  setVolume(sound, value) {
    this.nodeList[sound].volume = value
  }

  updateGeneralVolume(generalVolume) {
    Object.keys(this.audioList).forEach((name) => {
      let audio = this.nodeList[name]
      audio.volume = audio._volume * generalVolume
    })
  }

  setAsLoop(name) {
    this.nodeList[name].loop = true
  }

  stop(name) {
    this.nodeList[name].pause()
    this.nodeList[name].currentTime = 0
  }

  stopAll() {
    Object.keys(this.audioList).forEach((name) => {
      this.nodeList[name].pause()
      this.nodeList[name].currentTime = 0
    })
  }
}

export default SoundHandler
