export default class Singer {
  constructor({id, mid, name, avatar}) {
    this.id = id
    this.mid = mid
    this.name = name
    if (avatar) {
      this.avatar = avatar.replace('.webp', '.jpg')
    } else {
      this.avatar = `http://y.gtimg.cn/music/photo_new/T001R150x150M000${mid}.jpg`
    }
  }
}
