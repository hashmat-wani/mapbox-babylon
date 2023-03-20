import React, { useEffect, useState } from "react";

// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
// import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import MapBox, {
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";

import Geocoder from "../../components/GeoCoder";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Avatar, Button, IconButton, styled, TextField } from "@mui/material";
import { updateView } from "../../state/userSlice";
import { MAPBOX_ACCESS_TOKEN } from "../../utils/env";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import UserSettings from "../../components/UserSettings";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { createPin, deletePin } from "../../state/pinsSlice";
import { green } from "@mui/material/colors";
import { format } from "timeago.js";
import DeleteIcon from "@mui/icons-material/Delete";
import { FlexBox } from "../../components/FlexBox";

const Map = ({ captureSrc, setCaptureSrc, setEmailVerificationAlert }) => {
  const [initView, setInitView] = useState({
    longitude: 77.216721,
    latitude: 28.6448,
    zoom: 10,
    pitch: 20,
  });
  const [newPlace, setNewPlace] = useState(null);
  const [comment, setComment] = useState("");
  const [currPlaceId, setCurrPlaceId] = useState(null);
  const { viewState, user } = useSelector((state) => state.user, shallowEqual);
  const pins = useSelector((state) => state.pins, shallowEqual);

  const dispatch = useDispatch();

  const getCurrLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLoc, onError, {
        enableHighAccuracy: true,
      });
    } else {
      alert("Your browser doesn't support geolocation api");
    }
  };

  function updateLoc(position) {
    const { longitude, latitude } = position.coords;
    dispatch(updateView({ longitude, latitude }));
    setInitView({ ...initView, longitude, latitude });
  }

  function onError(error) {}
  useEffect(() => {
    getCurrLocation();
  }, []);

  function handleCapture() {
    if (captureSrc) {
      setCaptureSrc("");
      return;
    }
    const { longitude, latitude, zoom, pitch } = viewState;
    const src = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${longitude},${latitude},${zoom},0,${pitch}/1280x700?access_token=${MAPBOX_ACCESS_TOKEN}`;

    setCaptureSrc(src);
  }

  const handleAddMarker = (e) => {
    if (user) {
      const { lng, lat } = e.lngLat;
      setNewPlace({ lng, lat });
    }
  };

  const handleMarkerClick = (id) => {
    setCurrPlaceId(id);
  };
  return (
    <MapBox
      {...viewState}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      onMove={(evt) => dispatch(updateView(evt.viewState))}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      style={{ width: "100vw", height: "100vh" }}
      onDblClick={handleAddMarker}
      transitionDuration="200"
    >
      <Marker
        longitude={initView.longitude}
        latitude={initView.latitude}
        anchor="bottom"
        color="red"
      />

      {pins.map((el) => (
        <>
          <Marker
            longitude={el.longitude}
            latitude={el.latitude}
            anchor="right"
            color="red"
            style={{ cursor: "pointer" }}
            onClick={() => handleMarkerClick(el._id)}
          >
            {el.user?.avatar ? (
              <Avatar src={el.user?.avatar?.url} />
            ) : (
              <Avatar
                sx={{
                  bgcolor: green[500],
                  color: "#fff !important",
                }}
              >
                {el.user?.firstName[0].toUpperCase()}
              </Avatar>
            )}
          </Marker>

          {el._id === currPlaceId && (
            <Popup
              longitude={el.longitude}
              latitude={el.latitude}
              closeOnClick={false}
              onClose={() => setCurrPlaceId(null)}
              anchor="left"
            >
              <p>{el.comment}</p>
              <SmallText>
                Created by{" "}
                <strong>
                  {el.user?.firstName} {el.user?.lastName}
                </strong>
              </SmallText>
              <FlexBox justifyContent="space-between">
                <SmallText>{format(el.createdAt)}</SmallText>
                {el.user?._id === user?._id && (
                  <IconButton
                    onClick={() => dispatch(deletePin({ id: el._id }))}
                  >
                    <DeleteIcon sx={{ color: "red" }} />
                  </IconButton>
                )}
              </FlexBox>
            </Popup>
          )}
        </>
      ))}

      {newPlace && (
        <Popup
          longitude={newPlace.lng}
          latitude={newPlace.lat}
          closeOnClick={false}
          onClose={() => setNewPlace(null)}
          anchor="bottom"
        >
          <TextField
            onInput={(e) => setComment(e.target.value)}
            sx={{ my: 2 }}
            fullWidth
            required
            helperText="Something about this place"
            label="Comment"
          />
          <Button
            onClick={() =>
              dispatch(
                createPin({
                  comment,
                  longitude: newPlace.lng,
                  latitude: newPlace.lat,
                  setNewPlace,
                })
              )
            }
            fullWidth
            variant="contained"
          >
            Add
          </Button>
        </Popup>
      )}

      <NavigationControl position="bottom-right" />
      <GeolocateControl
        trackUserLocation
        onGeolocate={updateLoc}
        position="bottom-right"
      />
      <ScaleControl />
      <Geocoder position="top-left" />
      <IconButton
        onClick={handleCapture}
        sx={{
          zIndex: 1000,
          background: "#ffffff",
          borderRadius: 1,
          m: 1,
          ":hover": { background: "#ffffff" },
        }}
        variant="contained"
      >
        {!!captureSrc ? <CancelPresentationIcon /> : <ViewInArIcon />}
      </IconButton>
      <UserSettings setEmailVerificationAlert={setEmailVerificationAlert} />
    </MapBox>
  );
};

export default Map;

const SmallText = styled("p")({
  fontSize: "12px",
  margin: 0,
});
