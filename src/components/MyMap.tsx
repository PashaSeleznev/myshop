import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { FC } from 'react';

type MyMapProps = {
  center: number[],
  zoom: number
}

const MyMap: FC<MyMapProps> = ({center, zoom}) => {
  return (
    <YMaps>
      <div>
        <Map style = {{width: '800px', height: '500px'}} defaultState={{ center: center, zoom: zoom }}>
        <Placemark geometry={center} />
        </Map>
      </div>
    </YMaps>
  );
}

export default MyMap;
