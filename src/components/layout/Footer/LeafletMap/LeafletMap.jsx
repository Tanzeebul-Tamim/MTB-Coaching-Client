import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"; 
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";

// Fix Leaflet's default icon path for static hosting
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "/assets/marker-icon.png",
  iconRetinaUrl: "/assets/marker-icon-2x.png",
  shadowUrl: "/assets/marker-shadow.png",
});

const LeafletMap = () => {
  const center ={ lat: 51.87107730756795, lng:  5.391547183634315};
  const ZOOM_LEVEL = 15.5;
  const mapRef = useRef();

  return (
        <MapContainer scrollWheelZoom={false} center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
            <Marker position={[51.871103804911, 5.3915042682885606]}>
                <Popup>
                  MTB-Coaching-Network
                  <br />
                  Duifkruid 84, 4007 SZ Tiel,
                  <br />
                  Netherlands
                </Popup>
            </Marker>
        </MapContainer>
  );
};

export default LeafletMap;
