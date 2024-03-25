<template>
    <layout-div>
          <div class="container">
              <h2 class="text-center mt-5 mb-3">Video Manager</h2>
              <div class="card">
                  <div class="card-header">
                      <router-link to="/video/create"
                          class="btn btn-outline-primary"
                          >Create New Video
                      </router-link>

                      <router-link to="/youtube"
                          class="btn btn-outline-primary"
                          >View Youtube
                      </router-link>

                      <router-link to="/"
                          class="btn btn-outline-primary"
                          >View Projects
                      </router-link>
                  </div>
                  <div class="card-body">
               
                      <table class="table table-bordered">
                          <thead>
                              <tr>
                                  <th>Titulo</th>
                                  <th>Imagen</th>
                                  <th width="240px">Action</th>
                              </tr>
                          </thead>
                          <tbody>
                                <tr v-for="video in videos" :key="video.id">
                                    <td>{{video.datos.snippet.title}}</td>
                                    <td>
                                        <img v-bind:src="video.datos.snippet.thumbnails.standard.url" style="width: 60px;" class="card-img-top" alt="{{video.datos.snippet.title}}">
                                        </td>
                                    <td>
                                        <button 
                                            @click="handleDelete(video.id)"
                                            className="btn btn-outline-danger mx-1">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                   
                          </tbody>
                      </table>
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
    name: 'ProjectList',
    components: {
      LayoutDiv,
    },
    data() {
      return {
        videos:[]
      };
    },
    created() {
      this.fetchProjectList();
    },
    methods: {
        getUrl(name){
            return 'https://ui-avatars.com/api/?name='+name+'&background=0D8ABC&color=fff&size=32';
        },
        fetchProjectList() {
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
        }
    },
  };
  </script>