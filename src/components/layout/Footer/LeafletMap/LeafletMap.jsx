import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import osm from "./osm-providers";
import "leaflet/dist/leaflet.css";
import { useRef } from "react";
import "../../../../styles/leaflet.css";

// Fix Leaflet's default icon path for static hosting
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "/assets/images/marker-icon.png",
    iconRetinaUrl: "/assets/images/marker-icon-2x.png",
    shadowUrl: "/assets/images/marker-shadow.png",
});

const LeafletMap = ({ smallDevice }) => {
    const center = { lat: 51.97305763844625, lng: 5.556715414769293 };
    const ZOOM_LEVEL = 15.5;
    const mapRef = useRef();

    return (
        <div
            className={`relative group w-full h-full ${smallDevice && "mt-4"}`}
        >
            <div className="absolute z-[1000] transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 right-0 lg:top-2 -top-2 lg:hover:scale-105 lg:hover:right-1 lg:hover:top-2 ease-in-out">
                <a
                    href="https://www.google.com/maps/place/MTB+route,+rhenen/@51.972747,5.5471453,16z/data=!4m10!1m2!2m1!1smountain+bike+trail!3m6!1s0x47c654097f4e5ef1:0x2691c597450a599b!8m2!3d51.972747!4d5.5566725!15sChNtb3VudGFpbiBiaWtlIHRyYWlsWhUiE21vdW50YWluIGJpa2UgdHJhaWySAQ5zcG9ydHNfY29tcGxleJoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VNMWR6UlRhRFpCUlJBQqoBaAoIL20vMDE5OWcKCC9tLzBfbWpwEAEqFyITbW91bnRhaW4gYmlrZSB0cmFpbCgAMh4QASIaVSV2fnus8nDHm1tfIzap4DhCiohlFPsxWzwyFxACIhNtb3VudGFpbiBiaWtlIHRyYWls4AEA-gEECAAQGg!16s%2Fg%2F11dybfjq3d?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-secondary dark:text-yellow-900 text-orange-900 px-3 ${
                        smallDevice
                            ? "rounded-md"
                            : "lg:rounded-bl-lg lg:rounded-tr-lg"
                    } py-1 rounded-s- shadow-md hover:bg-primary lg:text-sm text-xs font-bold`}
                >
                    View on Google Maps
                </a>
            </div>

            <MapContainer
                scrollWheelZoom={false}
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
            >
                <TileLayer
                    url={osm.maptiler.url}
                    attribution={osm.maptiler.attribution}
                />
                <Marker position={[center.lat, center.lng]}>
                    <Popup>
                        Autoweg,
                        <br />
                        3911 TL Rhenen,
                        <br />
                        Netherlands
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default LeafletMap;
