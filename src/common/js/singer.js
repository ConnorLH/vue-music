export default class Singer {
  constructor({id, mid, name, avatar}) {
    this.id = id
    this.mid = mid
    this.name = name
    this.avatar = avatar.replace('.webp', '.jpg')
  }
}
