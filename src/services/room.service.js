import http from "../http-common";

class RoomDataService {
  getAll() {
    return http.get("/rooms");
  }

  get(id) {
    return http.get(`/rooms/${id}`);
  }

  create(data) {
    return http.post("/rooms", data);
  }

  update(id, data) {
    return http.put(`/rooms/${id}`, data);
  }


  delete(id) {
    return http.delete(`/rooms/${id}`);
  }

  GetCheck() {
    return http.get("/rooms/check-availability");
  }

 
}

export default new RoomDataService();