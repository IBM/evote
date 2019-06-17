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
  queryAllCars() {
    return Api().get('queryAllCars')
  }
}