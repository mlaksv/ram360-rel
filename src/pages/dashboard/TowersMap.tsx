import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import Tooltip from "@mui/material/Tooltip";
import { Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import "./maps.scss";
import { towersData } from "./OrdersTable";
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json";
// "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";
// const geoUrl =
//   "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/south-america.json";

const markers = towersData.map((data) => {
  return {
    antenna_number: data.antenna_number,
    MAP: data.MAP,
    name: data.site_address,
    coordinates: [data.longitude, data.latitude],
  };
});
// const markers = [
//   {
//     MAP: 0,
//     name: "Buenos Aires",
//     coordinates: [-112.1037469, 43.4926827],
//   },
//   {
//     MAP: 10,
//     name: "Newton",
//     coordinates: [-71.217133, 42.341042],
//   },
//   {
//     MAP: 24,
//     name: "Newburyport",
//     coordinates: [-70.893875, 42.810356],
//   },
//   {
//     MAP: 78,
//     name: "Alexandria",
//     coordinates: [-92.471176, 31.284788],
//   },
//   { MAP: 100, name: "Dallas", coordinates: [-96.8716377, 32.8205865] },
//   {
//     MAP: 98,
//     name: "Norton",
//     coordinates: [-99.911016, 39.8383291],
//   },
//   {
//     MAP: 0,
//     name: "Atlantic Station",
//     coordinates: [-84.4041256, 33.7924957],
//   },
//   {
//     MAP: 0,
//     name: "Wilmington",
//     coordinates: [-77.9421102, 34.207116],
//   },
//   {
//     MAP: 2,
//     name: "Chamberlain",
//     coordinates: [-99.3598979, 43.7845057],
//   },
//   {
//     MAP: 0,
//     name: "Harrison",
//     coordinates: [-103.8892718, 42.6891891],
//   },
//   {
//     MAP: 35,
//     name: "Great Falls",
//     coordinates: [-111.3735546, 47.5047686],
//   },
//   {
//     MAP: 0,
//     name: "Denver",
//     coordinates: [-104.9951957, 39.7642548],
//   },
//   {
//     MAP: 0,
//     name: "Spring Valley",
//     coordinates: [-115.3317164, 36.0863414],
//   },
//   {
//     MAP: 0,
//     name: "Oakland",
//     coordinates: [-122.3753924, 37.7586346],
//   },
// ];

type Props = {};
const default_color = "#9e9e9e";
const deformed_color = "#a20000";
const TowersMap = (props: Props) => {
  const navigate = useNavigate();
  const [content, setContent] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const selectedMarker = content !== null ? markers[content] : null;
  return (
    <>
      <Tooltip
        title={
          selectedMarker ? (
            <Box>
              <div>{selectedMarker.name}</div>
              {/* <div>MAP: {selectedMarker.MAP}</div> */}
            </Box>
          ) : (
            ""
          )
        }
        open={selectedMarker ? true : false}
        followCursor
      >
        <ComposableMap
          projection="geoAzimuthalEqualArea"
          projectionConfig={{
            rotate: [65, 20, 0],
            scale: 900,
            center: [-37, 50],
          }}
          height={500}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }: any) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#ffdff7"
                  stroke="#505050"
                  strokeWidth={0.6}
                  // style={{
                  //   default: {
                  //     fill: "#D6D6DA",
                  //     outline: "none"
                  //   },
                  //   hover: {
                  //     fill: "#F53",
                  //     outline: "none"
                  //   },
                  //   pressed: {
                  //     fill: "#E42",
                  //     outline: "none"
                  //   }
                  // }}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", stroke:"#000000" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, MAP, antenna_number }, index) => (
            <Marker
              key={name}
              coordinates={coordinates as any}
              onMouseEnter={() => {
                setContent(index);
              }}
              onMouseLeave={() => {
                setContent(null);
              }}
              onClick={() => {
                navigate("/tower/" + antenna_number);
              }}
              className="custom-marker"
              onMouseOver={() => {
                setHovered(index);
              }}
              onMouseOut={() => {
                setHovered(null);
              }}
              // style={{ default: { background: "black" } }}
            >
              <circle
                r={8}
                fill="#ffffffff"
                stroke="#fff"
                strokeWidth={2}
                opacity={0}
              />
              <g
                style={{
                  stroke: undefined,
                  strokeWidth: 0,
                  strokeDasharray: undefined,
                  strokeLinecap: "butt",
                  strokeLinejoin: "miter",
                  strokeMiterlimit: 10,
                  fill: undefined,
                  fillRule: "nonzero",
                  opacity: 0.7,
                  scale: hovered === index ? "0.3" : "0.16",
                }}
                transform="translate(-45, -45)"
              >
                <path
                  d="M 48 43.274 l 37.318 21.713 C 88.309 58.964 90 52.181 90 45 C 90 21.156 71.453 1.656 48 0.111 V 43.274 z"
                  style={{
                    stroke: undefined,
                    strokeWidth: 1,
                    strokeDasharray: undefined,
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: MAP > 0 ? deformed_color : default_color,
                    fillRule: "nonzero",
                    opacity: 1,
                    // transform: " matrix(1 0 0 1 0 0)",
                  }}
                  strokeLinecap="round"
                />
                <path
                  d="M 42 43.274 V 0.111 C 18.547 1.656 0 21.156 0 45 c 0 7.181 1.691 13.964 4.682 19.987 L 42 43.274 z"
                  style={{
                    stroke: undefined,
                    strokeWidth: 1,
                    strokeDasharray: undefined,
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: MAP > 33.333 ? deformed_color : default_color,
                    fillRule: "nonzero",
                    opacity: 1,
                    // transform: " matrix(1 0 0 1 0 0)",
                  }}
                  // stroke-linecap="round"
                />
                <path
                  d="M 45 48.471 L 7.696 70.175 C 15.784 82.136 29.474 90 45 90 c 15.526 0 29.216 -7.864 37.304 -19.825 L 45 48.471 z"
                  style={{
                    stroke: undefined,
                    strokeWidth: 1,
                    strokeDasharray: undefined,
                    strokeLinecap: "butt",
                    strokeLinejoin: "miter",
                    strokeMiterlimit: 10,
                    fill: MAP > 66.666 ? deformed_color : default_color,
                    fillRule: "nonzero",
                    opacity: 1,
                  }}
                  // transform=" matrix(1 0 0 1 0 0) "
                  // stroke-linecap="round"
                />
              </g>

              {/* <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text> */}
            </Marker>
          ))}
        </ComposableMap>
        {/* <div>sef</div> */}
      </Tooltip>
    </>
  );
};

export default TowersMap;
