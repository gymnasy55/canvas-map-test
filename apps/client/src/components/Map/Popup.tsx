import React from 'react';
import { Tile } from './index';
import './Popup.css';

export type PopupProps = {
  x: number;
  y: number;
  visible: boolean;
  tile: Tile;
  position: 'left' | 'right';
};

const shortenAddress = (address: string, n = 4, k = n) =>
  address.substring(0, 4) + '...' + address.substring(address.length - k);

export const Popup: React.FC<PopupProps> = (props) => {
  const { x, y, visible, tile, position } = props;

  return (
    <div
      className={`AtlasPopup ${position} ${
        tile.owner ? 'has-owner' : 'no-owner'
      }`}
      style={{
        top: y,
        left: x,
        opacity: visible ? 1 : 0,
      }}
    >
      <div>
        x: {tile.x}; y: {tile.y}
      </div>
      {tile.owner && <div>Owner: {shortenAddress(tile.owner)}</div>}
    </div>
  );
};
