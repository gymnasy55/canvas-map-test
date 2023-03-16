import React, { useEffect, useMemo, useState } from 'react';
import { Map } from './components/Map';
import { AtlasTile } from './components/Map/Atlas';
import { fetchTiles } from './helpers/fetchTiles';

export const App: React.FC = () => {
  const [tiles, setTiles] = useState<Record<string, AtlasTile>>({});

  useEffect(() => {
    fetchTiles().then(setTiles);
  }, []);

  const [selection, setSelection] = useState<string[]>([]);

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <Map
          height={800}
          width={800}
          tiles={tiles}
          selection={selection}
          setSelection={setSelection}
        />
        <div style={{ display: 'flex', gap: '20px', flexDirection: 'column' }}>
          {selection.length > 0 && (
            <button onClick={() => setSelection([])}>Reset</button>
          )}
          {selection.map((v) => {
            const tile = tiles[v];
            console.log(tile);
            return tile ? (
              <div key={v}>
                <h2>
                  selected tile (x: {tile.x}; y: {tile.y})
                </h2>
                <div>
                  <pre>{JSON.stringify(tile, null, 2)}</pre>
                </div>
              </div>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
};
