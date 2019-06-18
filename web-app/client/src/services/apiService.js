import Api from '@/services/api'

export default {
  changeCarOwner(key, newOwner) {
    return Api().post('changeCarOwner', {       
      key: key,
      newOwner: newOwner
    })
  },
  createCar(make, model, color, owner) {
    return Api().post('createCar', {       
      make: make,
      model: model,
      color: color,
      owner: owner
    })
  },
  queryAll() {
    return Api().get('queryAll')
  },
  queryByObjectType() {
    return Api().get('queryByObjectType')
  },
  queryWithQueryString(selected) {
    return Api().post('queryWithQueryString', {
      selected: selected
    }) 
  }
}