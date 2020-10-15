import React from "react";

import {Link} from "react-router-dom";

import {Map, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import {FiPlus} from "react-icons/fi";

import MapMarker from "../../assets/images/Local-Marker.svg";

import "./styles.css";

function MapLocalization(){
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
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={30} color="#FFF"/>
            </Link>
        </div>
    );
}

export default MapLocalization;