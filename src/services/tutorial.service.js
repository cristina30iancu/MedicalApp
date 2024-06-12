import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/calatorie")
    ;
  }
  getAllClienti(){
    return http.get("/programari/utilizatori")
  }
  getAllMedici(){
    return http.get("/medic")
  }

  get(id) {
    return http.get(`/calatorie/${id}`);
  }

  getMedic(id) {
    return http.get(`/medic/${id}`);
  }

  getClinica(id) {
    return http.get(`/clinica/${id}`);
  }

  create(data) {
    return http.post("/calatorie", data);
  }
  createclient(data) {
    const url = "/programari/user/" + data.utilizatorId + "/serviciu/" + data.detaliiId
    console.log(url)
    return http.post(url);
  }
  getGraficProgramariPeMedic() {
    return http.get("programari/medici");
  }
  getProgramari(id){
    return http.get(`/programari/user/${id}`)
  }
  createClinica(data){
    return http.post("/clinica",data);
  }
  createServiciu(data){
    return http.post("/detalii/add/" +data.medicId,data);
  }
  updateServiciu(id,data){
    return http.put("/detalii/update/" + id ,data);
  }
  createMedic(data){
    return http.post("/medic/" + data.clinicaId,data)
  }
  update(id, data) {
    return http.put(`/calatorie/${id}`, data);
  }

  updateMedic(id, data) {
    return http.put(`/medic/${id}/clinica/${data.clinicaId}`, data);
  }

  updateClinica(id, data) {
    return http.put(`/clinica/${id}`, data);
  }

  delete(id) {
    return http.delete(`/calatorie/${id}`);
  }

  
  deleteMedic(id) {
    return http.delete(`/medic/${id}`);
  }
  deleteDetaliiServiciu(id) {
    return http.delete(`/detalii/delete/${id}`);
  }
  deleteClinica(id) {
    return http.delete(`/clinica/${id}`);
  }

  deleteCli(id){
    return http.delete(`/clienti/${id}`)
  }

  deleteAll() {
    return http.delete(`/calatorie`);
  }
  deleteClienti(){
    return http.delete(`/clienti`);
  }

  

  findByTitle(destinatie) {
    return http.get(`/calatorie/calatoriedestinatie?destinatie=${destinatie}`);
  }

  findByNumeClinica(numeclinica){
    return http.get(`/clinica/clinicanume?numeclinica=${numeclinica}`);
  }
  
  
  findByLocatie(locatie){
    return http.get(`/clinica/clinicalocatie?locatie=${locatie}`);
  }

  
  findByLocatieMedic(locatie){
    return http.get(`/medic/locatie?locatie=${locatie}`);
  }
  
findByNumeMedic(numemed){
  return http.get(`/medic/numemed?numemed=${numemed}`);
}

findByNumeConsult(numeconsult){
  return http.get(`medic/numecons?numeconsult=${numeconsult}`)
}

findByCostServiciu(costServiciu){
  return http.get(`medic/costserv?costServiciu=${costServiciu}`)
}

findByDurata(durata){
  return http.get(`medic/durata?durataProg=${durata}`)
}

findByDataDisponibila(dataDisponibila){
  return http.get(`/medic/dataDisponibila?dataDisponibila=${dataDisponibila}`)
}

findByOraDisponibila(oraDisponibila){
  return http.get(`medic/oraDisponibila?ora=${oraDisponibila}`)
}

  findByJudet(judet) {
    return http.get(`/programare/programarejudet?judet=${judet}`);
  }
  findByNumeClinet(numeclient){
    return http.get(`/clienti/clientinume?numeclient=${numeclient}`);

  }

  // findBySpecialitate(specialitate){
  //   return http.get(`/programare/programarespecialitate?specialitate=${specialitate}`);
  // }

    findBySpecialitate(specialitate){
    return http.get(`/programare/specialitate?specialitate=${specialitate}`);
  }
  

  

  findByData(data){
    return http.get(`/programare/programaredata?data=${data}`);
  }


  findByProprietate(proprietate){
    return http.get(`/calatorie/calatoriproprietate?proprietate=${proprietate}`);

  }

  findByDate(dataPlecare){
    return http.get(`/calatorie/calatoriedatap?dataplecare=${dataPlecare}`)
  }

  findByDateSosire(datasosire){
    return http.get(`/calatorie/calatoriedatas?datasosire=${datasosire}`)
  }


  findByCompanie(numeCompanie){
    return http.get(`calatorie/cala/${numeCompanie}`)
  }
  findByNumarPersoane(numarpersoane){
    return http.get(`/calatorie/calatorienrpersoane?numarpersoane=${numarpersoane}`)

  }
  findByNumarCamere(numarcamere){
    return http.get(`/calatorie/calatorienrcamere?numarcamere=${numarcamere}`)

  }

  findByTot(destinatie,dataplecare,datasosire,numarpersoane,nrcamere){
   
    return http.get(`/calatorie/cala/${destinatie}/${dataplecare}/${datasosire}/${numarpersoane}/${nrcamere}`)
    

  }

  findByProgramare(specialitate,judet,data){
   
    return http.get(`/programare/pro/${specialitate}/${judet}/${data}`)
    

  }

  findByMedicCautare(numeConsult,locatie,dataDisponibila){
   
    return http.get(`/medic/med/${numeConsult}/${locatie}/${dataDisponibila}`)
    

  }

  findByDatsDatap(dataplecare,datasosire){
    return http.get(`/calatorie/cala/${dataplecare}/${datasosire}`)

  }

  findByDestinatieDat(destinatia,dataplecare,datasosire){
    return http.get(`/calatorie/cala/${destinatia}/${dataplecare}/${datasosire}`)
  }
  findByNumere(nrpesoane,nrcamere){
    return http.get(`/calatorie/cala/${nrpesoane}/${nrcamere}`)
  }

  
  findByEmail(emailclient){
    return http.get(`/clienti/clientiemail?emailclient=${emailclient}`);

  }

  findByTelefon(telefon){
    return http.get(`/clienti/tele?telefon=${telefon}`);

  }
  findByRezervari(rezervari){
    return http.get(`/clienti/rez?rezervari=${rezervari}`)
  }
  getGrafic() {
    return http.get("/grafic")
  }

  getGraficClient(){
    return http.get("/graficClient")

  }

  getAllPersonal() {
    return http.get("/medic")
    ;
  }
  getAllDetaliiServicii() {
    return http.get("/detalii/all")
    ;
  }
  getMedicDetaliiServicii(idMedic) {
    return http.get("/detalii/medic/" + idMedic)
    ;
  }
  getServiciuById(id) {
    return http.get("/detalii/" + id)
    ;
  }
  getAllClinici(){
    return http.get("/clinica");
  
  }
}



export default new TutorialDataService();