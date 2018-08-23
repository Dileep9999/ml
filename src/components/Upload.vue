<template>

<div  >
  <nav class="navbar navbar-expand-lg navbar-dark bg-danger " >
  <a class="navbar-brand" href="#">Prediction</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>

    </ul>

  </div>
</nav>
<br>
<br>
<div class="container" v-if="!display_test && !result">
  <br>
  <h1 class="text-muted" style="text-align:center"><b>Choose File To Train....</b></h1>
  <br>
  <br>
  <div class="row" style="margin-left:2cm;">
    <div class="col-3"></div>
    <div class="col-5"><input   v-if="!display_test" ref="fileInput" type="file" id="train" v-on:change="upload($event)"/></div>

    <div class="col-3">

    <!-- <button class="btn btn-success"><b>Train</b></button> -->
    </div>
  </div>

</div>

<br>
<br>

<div class="container" v-if="display_test && !result">
  <br>
  <h1 class="text-muted" style="text-align:center"><b>Training Done Test File....</b></h1>
  <br>
  <br>
  <div class="row" style="margin-left:2cm;">
    <div class="col-3"></div>
    <div class="col-5"><input v-if="display_test" ref="fileInput" type="file" id="test" v-on:change="uploadtest($event)"/></div>

    <div class="col-3">
    <!-- <button class="btn btn-danger"><b>Test</b></button> -->
    </div>
  </div>

</div>
<div v-if="result">

<h4 class="text-muted">Accuracy:- <b class="text-dark"> <u> {{resultdata.accuracy}}</u></b></h4><br>
<h4 class="text-muted">F1 Score:- <b class="text-dark"> <u> {{resultdata.f1_score}}</u></b></h4>
<br>
<h4 class="text-muted">Confusion Matrix:- <b class="text-dark"> <u> {{resultdata.confusion_matrix}}</u></b></h4>

<br>
<div v-if="result" class="table1" v-html="resultdata.predicted" ></div>
</div>




</div>
</template>
<script>
export default {
  name: "upload",
  data() {
    return {
      file: "",
      display_test: false,
      upload_load: false,
      result: false,
      resultdata: {}
    };
  },
  mounted() {},
  methods: {
    upload(event) {
      let data = new FormData();
      let file = event.target.files[0];

      // data.append("name", "my-file");
      data.append("file", file);

      let config = {
        headers: {
          model: "dileepp",
          "Content-Type": "multipart/form-data"
        }
      };
      this.$axios.post("/train", data, config).then(response => {
        console.log(response);
        this.reset();
        this.display_test = true;
      });
    },
    uploadtest(event1) {
      console.log(event1.target);

      let data = new FormData();
      let file = event1.target.files[0];
      data.append("name", "my-file");
      data.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      this.$axios
        .post("/predict", data, config)
        .then(response => {
          console.log(response.data);
          this.result = true;
          this.resultdata = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    reset() {
      const input = this.$refs.fileInput;
      input.type = "text";
      input.type = "file";
    }
  }
};
</script>
<style scoped>
.table1 {
  text-align: center;
  color: rgb(17, 18, 19);
}
</style>
