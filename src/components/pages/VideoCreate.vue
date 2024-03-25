<template>
    <layout-div>
      <h2 class="text-center mt-5 mb-3">Create New Video</h2>
      <div class="card">
          <div class="card-header">
              <router-link 
                  class="btn btn-outline-info float-right"
                  to="/video/list">View All Videos
              </router-link>
          </div>
          <div class="card-body">
              <form>
                  <div class="form-group">
                      <label htmlFor="url">Url</label>
                      <input 
                          v-model="video.url"
                          type="text"
                          class="form-control"
                          id="url"
                          name="url"/>
                  </div>
                
                  <button 
                      @click="handleSave()"
                      :disabled="isSaving"
                      type="button"
                      class="btn btn-outline-primary mt-3">
                      Save Video
                  </button>
              </form>
          </div>
      </div>
    </layout-div>
  </template>
   
  <script>
  import axios from 'axios';
  import LayoutDiv from '../LayoutDiv.vue';
  import Swal from 'sweetalert2'
  import { useRouter } from 'vue-router';
   
  export default {
    name: 'VideoCreate',
    setup(){
      const router = useRouter();
      return{
        router
      }
    },
    components: {
      LayoutDiv,
    },
    data() {
      return {
        video: {
          url: '',
        },
        isSaving:false,
      };
    },
    methods: {
      handleSave() {
          this.isSaving = true
          axios.post('/api/v1/videos', this.video)
            .then(response => {
              Swal.fire({
                  icon: 'success',
                  title: 'Video saved successfully!',
                  showConfirmButton: false,
                  timer: 1500
              })
              this.isSaving = false
              this.video.url = ""
              this.router.push('/video/list');
              return response
            })
            .catch(error => {
              this.isSaving = false
              Swal.fire({
                  icon: 'error',
                  title: 'An Error Occured!',
                  showConfirmButton: false,
                  timer: 1500
              })
              return error
            });
      },
    },
  };
  </script>