import React, {useState} from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../../assets/images/Local-Marker.svg';

import SideBar from "../../components/SideBar";

import './styles.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
})

export default function CreateOrphanage() {
  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_in_weekends, setOpenInWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [selectPreviewImage, setSelectPreviewImage] = useState<string[]>([])


  function handleMapClick(event:LeafletMouseEvent){
    const {latlng} = event;
    
    setPosition({
      latitude: latlng.lat,
      longitude: latlng.lng
    });
  }

  function handleUploadImages(event:React.ChangeEvent<HTMLInputElement>){
    if(!event.target.files){
      return;
    }

    const uploadImages = Array.from(event.target.files);

    const allImages = [...images, ...uploadImages];

    setImages(allImages);

    const selectedImagesPreview = allImages.map(image => {
      return URL.createObjectURL(image);
    });

    setSelectPreviewImage(selectedImagesPreview);
  }

  function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    console.log({
      position,
      name,
      about,
      instructions,
      opening_hours,
      open_in_weekends
    });
  }

  return (
    <div id="page-create-orphanage">
      <SideBar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-3.5591598,-41.1185378]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

              {position.latitude !== 0 && (
                <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={e => setAbout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-images">

                {selectPreviewImage.map(image => {
                  return <img key={image} src={image} alt={name} className="upload-image"/>
                })}

                <label className="new-image" htmlFor="images[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input type="file" id="images[]" multiple onChange={handleUploadImages}/>
            </div>

          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_in_weekends ? "active" : ""}
                  onClick={() => setOpenInWeekends(true)}
                >
                    Sim
                  </button>
                <button
                  type="button"
                  className={!open_in_weekends ? "active" : ""}
                  onClick={() => setOpenInWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
