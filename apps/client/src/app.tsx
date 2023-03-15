import React, { useEffect, useState } from 'react';
import { Map } from './components/Map';
import { AtlasTile } from './components/Map/Atlas';
import { fetchTiles } from './helpers/fetchTiles';

export const App: React.FC = () => {
  const [tiles, setTiles] = useState<Record<string, AtlasTile>>({});

  useEffect(() => {
    fetchTiles().then(setTiles);
  }, []);

  return (
    <div>
      <p>Hello World</p>
      <Map height={800} width={800} tiles={tiles} />
    </div>
  );
};
