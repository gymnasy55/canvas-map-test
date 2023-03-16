import { AtlasTile } from '../components/Map/Atlas';
import { environment } from '../environments/environment';

export const fetchTiles = async (
  size = 100,
  url = `${environment.serverUrl}/data/random?size=${size}`,
) => {
  if (!window.fetch) return {};
  const resp = await window.fetch(url);
  const json = await resp.json();
  return json.data as Record<string, AtlasTile>;
};
