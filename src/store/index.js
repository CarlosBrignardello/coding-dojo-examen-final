import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db } from '../firebase'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    userTrivias: [],
    userTrivia: { name: '', id: '' },
    allTrivias: [],
    allValuesTrivias: [],
    allScores: []
  },
  mutations: {
    setUser(state, payload){
      state.user = payload
    },
    setError(state, payload){
      state.error = payload
    },
    setUserTrivias(state, payload){
      state.userTrivias = payload
    },
    setAllTrivias(state, payload){
      state.allTrivias = payload
    },
    setAllValuesTrivias(state, payload){
      state.allValuesTrivias = payload
    },
    setUserTrivia(state, payload){
      state.userTrivia = payload
    },
    setDeleteTrivia(state, payload){
      state.userTrivias = state.userTrivias.filter(item => item.id != payload)
    },
    setAllScores(state, payload){
      state.allScores = payload
    }
  },
  actions: {
    deleteTrivia({commit, state}, id){
      db.collection(state.user.email).doc(id).delete()
      .then(() => {
        commit('setDeleteTrivia', id)
      })
      .catch(err => console.log(err))
    },
    addUserTrivia({commit, state}, triviaData){
      db.collection(state.user.email).add({
        triviaName: triviaData.name,
        trueValue: triviaData.trueValue,
        falseValues: triviaData.falseValues
      })
        .then(doc => {
          router.push('/')
        })
        .catch(err => console.log(err))
    },
    addUserTrivia2({commit, state}, triviaData){
      db.collection('allTrivias').add({
        triviaName: triviaData.name,
        trueValue: triviaData.trueValue,
        falseValues: triviaData.falseValues,
        user: triviaData.user
      })
        .then(doc => {
          router.push('/')
        })
        .catch(err => console.log(err))
    },
    getUserTrivia({commit, state}, id){
      db.collection(state.user.email).doc(id).get()
        .then(doc => {
          let trivia = doc.data()
          trivia.id = doc.id
          commit('setUserTrivia', trivia)
        })
        .catch(err => console.log(err))
    },
    getUserTrivias({commit, state}){
      const trivias = []
      db.collection(state.user.email).get()
        .then( resp => {
          resp.forEach(doc => {
            // console.log(doc.id)
            // console.log(doc.data())
            let trivia = doc.data()
            trivia.id = doc.id
            trivias.push(trivia)
          })
          commit('setUserTrivias', trivias)
        })
    },
    getAllUsersScores({commit}){
      const allScores = []
      db.collection('scores').get()
        .then( resp => {
          resp.forEach(doc => {
            // console.log(doc.id)
            // console.log(doc.data())
            let score = doc.data()
            score.id = doc.id
            allScores.push(score)
            allScores.sort()
          })
          commit('setAllScores', allScores)
      })
    },
    createUser({commit}, user){
      auth.createUserWithEmailAndPassword(user.email, user.password)
        .then( resp => {
          // console.log(resp)
          const newUser = {
            email: resp.user.email,
            uid: resp.user.uid
          }

          db.collection(resp.user.email).add({
            triviaName: 'Pregunta de ejemplo',
            trueValue: 'Valor verdadero',
            falseValues: ['Valor falso 1', 'Valor falso 2', 'Valor falso 3']
          
          }).then( doc => {
            commit('setUser', newUser)
            router.push('/')
          }).catch(err => console.log(err))
        })
        .catch( err => {
          // console.log(err)
          commit('setError', err)
        })
    },
    getAllTrivias({commit, state}){
      let trivias = []
      db.collection('allTrivias').get()
        .then( resp => {
          resp.forEach(doc => {
            // console.log(doc.id)
            // console.log(doc.data())
            let trivia = doc.data()
            trivia.id = doc.id
            trivias.push(trivia)
          })
          trivias = trivias.sort(() => Math.random() - 0.5)
          commit('setAllTrivias', trivias)
        })
    },
    getValuesTrivias({commit, state}){
      let arrayValues = []
      let trueArray = []
      let trivias = []
      db.collection('allTrivias').get()
        .then( resp => {
          resp.forEach(doc => {
            // console.log(doc.id)
            // console.log(doc.data())
            let trivia = doc.data()
            trivia.id = doc.id
            trivias.push(trivia)
          })
          trivias = trivias.sort(() => Math.random() - 0.5)
          trivias = trivias.slice(0 , 3)
          for(let i = 0; i < 3; i++){
            let otherValues = Object.values(trivias[i].falseValues)
            otherValues.push(trivias[i].trueValue)
            trueArray.push(trivias[i].trueValue)
            arrayValues.push(otherValues)
          }

          arrayValues[0] = arrayValues[0].sort(() => Math.random() - 0.5)
          arrayValues[1] = arrayValues[1].sort(() => Math.random() - 0.5)
          arrayValues[2] = arrayValues[2].sort(() => Math.random() - 0.5)

          console.log({allValues: trivias, true: trueArray, array: arrayValues})
          commit('setAllValuesTrivias', {allValues: trivias, true: trueArray, array: arrayValues})
        })
    },
    loginUser({commit}, user){
      auth.signInWithEmailAndPassword(user.email, user.password)
        .then( resp => {
          // console.log(resp)
          const newLoginUser = {
            email: resp.user.email,
            uid: resp.user.uid
          }
          commit('setUser', newLoginUser)
          router.push('/')
        })
        .catch( err => {
          // console.log(err)
          commit('setError', err)
        })
    },
    closeSession({commit}){
      auth.signOut()
        .then(() => {
          router.push('/login')
        })
    },
    loggedUser({commit}, user){
      commit('setUser', user)
    },
    addScore({commit}, data){
      db.collection('scores').add({
        percent: data.percent,
        score: data.score,
        user: data.user
      })
      .then(() => {
        router.push('/')
      })
    }
  },
  getters:{
    userIsLogged(state){
      if(state.user === null){
        return false
      }else{
        return true
      }
    }
  },
  modules: {
  }
})
