import Api from '@/services/api'

export default {
  changeCarOwner(key, newOwner) {
    return Api().post('changeCarOwner', {       
      key: key,
      newOwner: newOwner
    })
  },
  createCar(electionId, voterId) {
    return Api().post('createCar', {       
      electionId: electionId,
      voterId: voterId
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