import { useLoaderData } from "@remix-run/react";

export async function loader() {
  var GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

  if (!GOOGLE_MAPS_API_KEY) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return { googleMapsApiKey: GOOGLE_MAPS_API_KEY };
}

type Props = {
  lat: string;
  lng: string;
};

export const GoogleMapsComponent = ({ lat, lng }: Props) => {
  const { googleMapsApiKey } = useLoaderData<typeof loader>() as {
    googleMapsApiKey: string;
  };

  const src = `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}
  &q=${lat} + ${lng}`;
  return <iframe width="600" height="450" loading="lazy" src={src}></iframe>;
};
