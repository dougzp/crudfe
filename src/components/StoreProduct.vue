<template>
  <div class="StoreProduct">
    <div v-if="loaded">
      <h3>Product</h3>
      <div class="card">
          <div class="card-header">
          header
          </div>
        <div class="card-body">
          <div class="row">
             <div class="col-md-3">
            </div>
            <div class="col-md-4 form-inline pull-left">
              <p >ID: {{id}}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
            </div>
            <div class="col-md-4 form-inline">
              <label>Name</label>
              <input v-model="storeProductName" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
            </div>
            <div class="col-md-4 form-inline">
              <label>Description</label>
                <input v-model="storeProductDescription" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
            </div>
          </div>
          <div class="row">
            <div class="col-md-9">
              <button class="btn btn-success" v-on:click="updateStoreProduct()"> Confirm</button>
              <router-link :to="'/'" class="btn btn-primary"> Back </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h3>Loading...</h3>
    </div>
  </div>
</template>

<script>
import router from '../router'
export default {
  name: 'StoreProduct',
  data () {
    return {
      id: '',
      storeProductName: '',
      storeProductDescription: '',
      loaded: false
    }
  },
  beforeCreate () {
    fetch('http://localhost:8080/storeProducts/' + this.$route.params.id, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': true
      }
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        this.id = data.id
        this.storeProductName = data.storeProductName
        this.storeProductDescription = data.storeProductDescription
        this.loaded = true
      })
  },
  methods: {
    updateStoreProduct () {
      let storeProductUpdate = {
        id: this.id,
        storeProductName: this.storeProductName,
        storeProductDescription: this.storeProductDescription
      }
      fetch('http://localhost:8080/storeProducts/' + this.id, {
        body: JSON.stringify(storeProductUpdate),
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true
        }
      }).then(() => {
        this.storeProduct = null
        router.push({ name: 'StoreProductList' })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
</style>
