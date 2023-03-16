import { Injectable } from '@nestjs/common';
import RandExp from 'randexp';

type Item = {
  type: `${number}`;
  x: number;
  y: number;
  owner: `0x${string}`;
  estate_id: `${number}`;
};

type Data = Record<`${number},${number}`, Item>;

const addressExp = new RandExp(/^0x[0-9a-fA-F]{42}/);
const rand = (max = 1000, min = 1) => Math.random() * max + min;

/*
  0: '#ff9990', // my parcels
  1: '#ff4053', // my parcels on sale
  2: '#ff9990', // my estates
  3: '#ff4053', // my estates on sale
  4: '#ffbd33', // parcels/estates where I have permissions
  5: '#5054D4', // districts
  6: '#563db8', // contributions
  7: '#716C7A', // roads
  8: '#70AC76', // plazas
  9: '#3D3A46', // owned parcel/estate
  10: '#3D3A46', // parcels on sale (we show them as owned parcels)
  11: '#09080A', // unowned pacel/estate
  12: '#18141a', // background
  13: '#110e13', // loading odd
  14: '#0d0b0e', // loading even
 */

@Injectable()
export class AppService {
  generateJsonData(size: number): Data {
    const data: Data = {};
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        data[`${j},${i}`] = {
          x: j,
          y: i,
          owner: addressExp.gen() as `0x${string}`,
          type: (i === 0 || j === 0 || i === size - 1 || j === size - 1
            ? '7'
            : (i + 1) % 2 === 0 && (j + 1) % 2 === 0
            ? '8'
            : '9') as `${number}`,
          estate_id: rand(10000).toFixed() as `${number}`,
        };
      }
    }
    return data;
  }
}

/*

{
  "ok": true,
  "data": {
    "-150,150": {
       "type":5,"x":-150,"y":150,"top":1,"owner":"0xa65be351527ebcf8c1707d1e444dac38b41a5faf","estate_id":"1186"
     },
    "-150,149": {
       "type":5,"x":-150,"y":149,"top":1,"owner":"0xa65be351527ebcf8c1707d1e444dac38b41a5faf","estate_id":"1186"
     }
  }
}

 */
