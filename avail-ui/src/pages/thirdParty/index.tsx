import React from "react";

const ReactColor = React.lazy(() => import("./reactColor"));
// const GoogleMap = React.lazy(() => import("./googleMap"));
const ReactDropzone = React.lazy(() => import("./reactDropzone"));
const ReactPlayer = React.lazy(() => import("./reactPlayer"));
const Calendar = React.lazy(() => import("./calendar"));
const ReactSlick = React.lazy(() => import("./reactSlick"));

export const thirdPartyConfigs = [
  {
    path: "/third-party/react-color",
    element: <ReactColor />,
  },
  // {
  //   path: "/third-party/google-map",
  //   element: <GoogleMap />,
  // },
  {
    path: "/third-party/react-dropzone",
    element: <ReactDropzone />,
  },
  {
    path: "/third-party/react-player",
    element: <ReactPlayer />,
  },
  {
    path: "/third-party/calendar",
    element: <Calendar />,
  },
  {
    path: "/third-party/slider",
    element: <ReactSlick />,
  },
];
