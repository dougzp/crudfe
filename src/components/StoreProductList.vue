<template>
  <div class="StoreProductList">
    <h3>Products</h3>
    <div class="card">
      <div class="card-header">
        Add a new product
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Name</label>
            <input v-model="storeProduct.storeProductName" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="form-group">
            <label>Description</label>
            <input v-model="storeProduct.storeProductDescription" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Product List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>
                  Product ID
                </th>
                <th>
                  Product Name
                </th>
                <th>
                  Product Description
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in sortedProducts" v-bind:key="product.id">
                <template v-if="editId == product.id">
                  <td><input v-model="editProductData.id" type="text"></td>
                  <td><input v-model="editProductData.storeProductName" type="text"></td>
                  <td><input v-model="editProductData.storeProductDescription" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(product.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{product.id}}
                  </td>
                  <td>
                    {{product.storeProductName}}
                  </td>
                  <td>
                    {{product.storeProductDescription}}
                  </td>
                  <td>
                    <a href="#" class="icon">
                      <i v-on:click="onDelete(product.id)" class="fa fa-trash">delete</i>
                    </a>
                    <router-link :to="{name:'StoreProduct', params:{id: product.id}}" class="icon">
                      <i class="fa fa-eye">edit</i>
                    </router-link>
                  </td>
                </template>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'StoreProductList',
  data () {
    return {
      title: 'My Store Product',
      updating: false,
      editId: '',
      storeProduct: {
        storeProductName: '',
        storeProductDescription: ''
      },
      sortedProducts: []
    }
  },
  created () {
    this.getProducts()
  },
  methods: {
    onEdit (index) {
    },
    onDelete (index) {
      this.deleteStoreProduct(index)
    },
    onSubmit () {
      let storeProductCreate = {
        storeProductName: this.storeProduct.storeProductName,
        storeProductDescription: this.storeProduct.storeProductDescription
      }
      console.log(storeProductCreate)
      fetch('http://localhost:8080/storeProducts/', {
        body: JSON.stringify(storeProductCreate),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true
        }
      }).then(() => {
        this.getProducts()
        this.storeProduct.storeProductName = ''
        this.storeProduct.storeProductDescription = ''
      })
    },
    deleteStoreProduct (id, i) {
      fetch('http://localhost:8080/storeProducts/' + id, {
        method: 'DELETE'
      }).then(() => {
        this.getProducts()
        this.sortedProducts.splice(i, 1)
      })
    },
    getProducts () {
      fetch('http://localhost:8080/storeProducts', {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': true
        }
      }).then(response => response.json())
        .then(data => {
          console.log(data)
          this.sortedProducts = data
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
.icon{
  margin-right: 10px;
}
.icon i{
  cursor: pointer;
}
</style>
