import MapBoxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { useControl } from "react-map-gl";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useDispatch } from "react-redux";
import { updateView } from "../state/userSlice";
import { MAPBOX_ACCESS_TOKEN } from "../utils/env";

const Geocoder = () => {
  const dispatch = useDispatch();
  const ctrl = new MapBoxGeocoder({
    accessToken: MAPBOX_ACCESS_TOKEN,
    marker: false,
    collapsed: true,
    // position: "bottom-right",
  });
  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    dispatch(updateView({ longitude: coords[0], latitude: coords[1] }));
  });
  return null;
};

export default Geocoder;
