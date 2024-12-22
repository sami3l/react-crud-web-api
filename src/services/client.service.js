import http from "../http-common";

class ClientDataService {
  getAll() {
    return http.get("/clients");
  }

  get(id) {
    return http.get(`/clients/${id}`);
  }

  create(data) {
    return http.post("/clients/register", data);
  }

  update(id, data) {
    return http.put(`/clients/${id}/profile`, data);
  }


  delete(id) {
    return http.delete(`/clients/${id}`);
  }

  deleteAll() {
    return http.delete("/clients/deleteall");
  }

 
}

export default new ClientDataService();