<template>
    <layout-div>
          <div class="container">
            <div class="row mt-4">
              <div class="col-sm-12">
                <div class="row">
                  <div class="input-group mb-3">
                  <input 
                  v-model="search"
                  type="text"  
                  class="form-control" 
                  placeholder="add" 
                  aria-label="add" 
                  aria-describedby="button-addon2">
                  <button 
                  class="btn btn-outline-secondary" 
                  type="button" 
                  id="button-addon2">Search</button>
                </div>
                </div>
                <div class="row">
                  <div  v-for="video in filterVideos" :key="video.id" class="card col-sm-3 m-0 p-0 mb-4" style="">
                  <img v-bind:src="video.datos.snippet.thumbnails.standard.url"  class="card-img-top" alt="{{video.datos.snippet.title}}">
                  <div class="badge badge-danger" style="position: absolute; color: #fff; right: 0;">
                    {{ tiempoLegible(video.datos.contentDetails.duration) }}
                  </div>
                  <div class="card-body m-0 p-0">
                    <div class="row m-0 p-0">
                      <div class="col-sm-2">
                        <img v-bind:src="getUrl(video.datos.snippet.channelTitle)" class="rounded-circle " alt="{{ video.datos.snippet.channelTitle }}" />
                      </div>
                      <div class="col-sm-10">
                        <p class="card-text p-0 m-0">{{video.datos.snippet.title.substr(0, 50) + '...'}}</p>
                      </div>

                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
              
          </div>
      </layout-div>
  </template>
   
  <script>
  import axios from 'axios';
  import LayoutDiv from '../LayoutDiv.vue';
  import Swal from 'sweetalert2'
   
  export default {
    name: 'VideoList',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        videos:[],
        video: {
          url: '',
        },
        isSaving:false,
        search: '',
      };
    },
    computed:{
      filterVideos(){
        return this.videos.filter(video =>
            video.datos.snippet.title.toLowerCase().includes(this.search)
            );
      }
    },
    created() {
      this.fetchVideoList();
    },
    methods: {
      getUrl(name){
        return 'https://ui-avatars.com/api/?name='+name+'&background=0D8ABC&color=fff&size=32';
      },
      tiempoLegible(time) {
           return time.replace('S', '').replace('M', ':').replace('H', ':').replace('PT', '');
      },
      fetchVideoList() {
         axios.get('/api/v1/videos')
          .then(response => {
            console.log(response.data);
              this.videos = response.data.data;
              return response
          })
          .catch(error => {
            return error
          });
      },
      handleDelete(id){
          Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                  axios.delete(`/api/v1/videos/${id}`)
                  .then( response => {
                      Swal.fire({
                          icon: 'success',
                          title: 'Project deleted successfully!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      this.fetchProjectList();
                      return response
                  })
                  .catch(error => {
                      Swal.fire({
                           icon: 'error',
                          title: 'An Error Occured!',
                          showConfirmButton: false,
                          timer: 1500
                      })
                      return error
                  });
              }
            })
      },
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
              this.fetchVideoList();
           //   this.router.push('/');
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