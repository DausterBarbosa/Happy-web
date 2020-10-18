import React, {useEffect, useState} from "react";

import {Link} from "react-router-dom";

import leaflet from "leaflet"
import {Map, TileLayer, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {FiPlus, FiArrowRight} from "react-icons/fi";

import MapMarker from "../../assets/images/Local-Marker.svg";

import Api from "../../services/api";

import "./styles.css";

const mapIcon = leaflet.icon({
    iconUrl: MapMarker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
});

interface OrphanagesProps {
    id: number,
    name: string,
    latitude: number,
    longitude: number,
}

function MapLocalization(){
    const [orphanages, setOrphanages] = useState<OrphanagesProps[ ]>([]);

    useEffect(() => {
        async function getOrphanates(){
            const orphanagesData = await Api.get("/orphanages");
            setOrphanages(orphanagesData.data);
        }

        getOrphanates();
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={MapMarker} alt="MapMarker"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando por sua visita :)</p>
                </header>
                <footer>
                    <strong>Ceará</strong>
                    <span>Viçosa do Ceará</span>
                </footer>
            </aside>

            <Map
                center={[-3.5591598,-41.1185378]}
                zoom={14}
                style={{
                    width: "100%",
                    height: " 100%",
                }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

                {orphanages.map(orphanage => (
                    <Marker
                    key={orphanage.id}
                    position={[orphanage.latitude, orphanage.longitude]}
                    icon={mapIcon}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}

                            <Link to={`/orphanage/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF"/>
                            </Link>
                        </Popup>
                    </Marker>
                    ))}
            </Map>

            <Link to="/orphanage/create" className="create-orphanage">
                <FiPlus size={30} color="#FFF"/>
            </Link>
        </div>
    );
}

export default MapLocalization;