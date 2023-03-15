import { AtlasTile } from '../components/Map/Atlas';

export const fetchTiles = async (
  url = 'https://api.decentraland.org/v1/tiles',
) => {
  if (!window.fetch) return {};
  const resp = await window.fetch(url);
  const json = await resp.json();
  return json.data as Record<string, AtlasTile>;
};
