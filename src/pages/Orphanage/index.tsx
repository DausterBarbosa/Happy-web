import React, {useEffect, useState} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import L from 'leaflet';

import {useParams} from "react-router-dom";

import Api from "../../services/api";

import mapMarkerImg from '../../assets/images/Local-Marker.svg';

import SideBar from "../../components/SideBar";

import './styles.css';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60]
});

interface Params {
  id: string;
}

interface Orphanage {
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_in_weekends: string;
  images: Array<{
    id: number;
    url: string;
  }>;
}

export default function Orphanage() {
  const params = useParams<Params>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    async function getOrphanage(){
      const orphanageData = await Api.get(`/orphanages/${params.id}`);
      setOrphanage(orphanageData.data);
    }

    getOrphanage();
  }, [params.id]);

  if(!orphanage){
    return <h1>Carregando...</h1>;
  }

  return (
    <div id="page-orphanage">
      <SideBar/>

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[imageIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button
                key={image.id}
                className={imageIndex === index ? "active" : ""}
                type="button"
                onClick={() => setImageIndex(index)}
              >
                <img src={image.url} alt={orphanage.name} />
              </button>
            ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_in_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF6690" />
                   Não tendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}