class APIHandler {
    constructor(baseURL) {
      // this.baseURL = baseURL;
      this.service = axios.create({
        baseURL: baseURL,
      });
    }
  
    getAll() {
      // /api/styles
      // return axios.get(this.baseURL);
      console.log("pouet", this.service);
      return axios.get("/myAllTravel");
    }
  
    findAll(data){
        console.log("FindAll");
        return axios.get("/myfilterDepart", { params : data});
    }

    getOne(id) {
      // return axios.get(this.baseURL + "/" + id);
      // //api/styles
      return this.service.get("/" + id);
    }
  
    updateOne(id, data) {
      // return axios.patch(this.baseURL + "/" + id, data);
      return this.service.patch("/" + id, data);
    }
  
    createOne(data) {
      return this.service.post("/create", data);
      // return axios.post(this.baseURL + "/create", data);
    }
  
    deleteOne(id) {
      // return axios.delete(this.baseURL + "/" + id);
      return this.service.delete("/" + id);
    }
  }
  
  export default APIHandler;
  