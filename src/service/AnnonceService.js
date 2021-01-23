import http from "./http-common";
import { getUniqueId, getManufacturer } from 'react-native-device-info';
 export const types_bien= [
        {
            "id": 1,
            "type": "Appartement"
        },
        {
            "id": 2,
            "type": "Maison"
        },
        {
            "id": 3,
            "type": "Garage"
        },
        {
            "id": 4,
            "type": "terrain constructible"
        },
        {
            "id": 5,
            "type": "résidence service"
        },
        {
            "id": 6,
            "type": "villa"
        }
    ]
    export const types_operation=[
        {
            "id": 1,
            "type": "Vente"
        },
        {
            "id": 2,
            "type": "location"
        },
        {
            "id": 3,
            "type": "Autre"
        }
    ]


class AnnonceService{
    GetAllTypeOperation(){
        return http.get('/Annonce/GetTypeOps')
    } 
    GetAllTypeBien(){
        return http.get('/Annonce/GetTypeBiens')
    } 
    UploadFile(selectedFile,id) {
         console.log(selectedFile)
        // console.log(id_annonce)
        const fd = new FormData();
        fd.append('imageFile',{
            uri:  selectedFile.uri,
            name: selectedFile.fileName,
            type: selectedFile.type // or your mime type what you want
        });
         fd.append('id_annonce',Number.parseInt(id));
         return   http.post("/Upload/uploadImageBien/",fd
           
        );
      }
    SendData(stateObject){
        const data={
            "type_bien":stateObject.type_bien,
            "type_operation":stateObject.type_operation,
            "surface":stateObject.surface,
            "prix":stateObject.prix,
            "description":stateObject.description,
            "nom_complet_proprietaire":stateObject.nom,
            "telephone":stateObject.tel,
            "email":stateObject.email,
            "lon":stateObject.lon,
            "lat":stateObject.lat,
            "ref": getUniqueId()
        }
        http.post("Annonce/PostData",JSON.stringify(data)).then(result=>{
         if(result.data!=null){
             console.log(result.data)
            stateObject.pictures.map((item)=>{
                this.UploadFile(item.response,result.data)
            })
         }
        })
      }
      GetAnnonces(id_intermmediaire){
          return http.get("Annonce/GetAnnonces",{
              params:{
                idintermmediaire:id_intermmediaire
              }
          })
      }
      GetImagesAnnonce(id_annonce){
        return http.get("Upload/getImageBien",{
            params:{
                idannonce:id_annonce
            }
        }) 
      }
    
      GetAnnonceDetail(id_annonce){
        return http.get("Annonce/GetAnnonce",{
            params:{
                idannonce:id_annonce
            }
        }) 
      }
      
      GetAnnoncesIntermmadiaire(id_intermmediaire){
        return http.get("Annonce/GetAnnoncesIntermmediaire",{
            params:{
              idintermmediaire:id_intermmediaire
            }
        })
    }
    GetAllAnnonces(){
        return http.get("Annonce/GetAllAnnonces")
    }
    GetAcceptsAnnonces(){
        return http.get("Annonce/GetAcceptsAnnonces")
    }
    
    DemandeAnnonce(nom,tel,email,id_annonce){
        // let nom,tel,email
        // Swal.fire({
        //     title: 'Envoyer une demande',
        //         focusConfirm: false,
        //         html: `
        //             <input class="swal2-input" id="nom" type="text" placeholder="Votre nom et prénom" /><br />
        //             <input class="swal2-input" id="tel" type="text" placeholder="Votre numéro de téléphone" /><br />
        //             <input class="swal2-input" id="email" type="text" placeholder="Votre email" />
        //         `,
        //         type: 'warning',
        //         showCancelButton: true,
        //         cancelButtonText:'Annuler',
        //         cancelButtonColor: 'grey',
        //         confirmButtonText: 'Envoyer',
        //         allowOutsideClick: false,
        //         preConfirm: () => {
        //             nom= document.getElementById('nom').value
        //             tel=document.getElementById('tel').value
        //             email= document.getElementById('email').value
        //             const data={
        //                 "nom_demandeur":nom,
        //                 "tel":tel,
        //                 "email":email,
        //                 "id_annonce":id_annonce
        //             }
        //             http.post("Annonce/SendDemande",JSON.stringify(data)).then(
        //                 (result)=>{
        //                     if(result.data==true){
        //                         Swal.fire(
        //                             'Action detectée!',
        //                             "opération est bien passée",
        //                             'success'
        //                         )
        //                     }
        //                 }
        //             )
                    
        //         }
        //   })
        const data={
                     "nom_demandeur":nom,
                    "tel":tel,
                     "email":email,
                      "id_annonce":id_annonce
                    }
                    console.log(data)
            return http.post("Annonce/SendDemande",JSON.stringify(data))
    }
    GetDemandes(id){
        return http.get("Annonce/getDemandes",{
            params:{
                idannonce:id
            }
        })
    }
    GetAllPictures(){
        return http.get("Upload/GetPhotoBien");
    }
    gettitle(){
        return http.get("Annonce/hello");
    }
     GetTypeName(categorie,id){
        let typeElement;
        if(categorie=="typebien"){
            typeElement=dataTypes.typebien.filter(e=>e.id==id)
        }
        else{
            typeElement=dataTypes.type_operation.filter(e=>e.id==id)
        }
        console.log(typeElement)
        return typeElement.type;
      }
      GetAnnonceIME(){
        return http.get("Annonce/GetAnnonceIME",{
            params:{
                ime:getUniqueId()
            }
        })
      }
      SendEmail(email,message){
        const request={
            "nom":"Mobile",
            "email":email,
            "tel":getUniqueId(),
            "message":message
        }
        return http.post("/Discussion/Send",JSON.stringify(request))
    } 
   
}
export default new AnnonceService();