import {
  LngLat,
  YMapDefaultFeaturesLayer,
  YMapLocationRequest,
  YMapMarker,
} from '@yandex/ymaps3-types'
import { YMap, YMapDefaultSchemeLayer } from '@yandex/ymaps3-types'

const LOCATION: YMapLocationRequest = {
  center: [52.0, 52.8],
  zoom: 8,
}

const map = new YMap(document.getElementById('ya-map')!, { location: LOCATION })

type Marker = {
  el: HTMLElement
  coordinates: LngLat
}

const markers: Marker[] = [
  {
    el: document.createElement('div'),
    coordinates: [50.0, 53.1545],
  },
  {
    el: document.createElement('div'),
    coordinates: [53.748856, 53.634386],
  },
  {
    el: document.createElement('div'),
    coordinates: [52.294925, 52.770075],
  },
]

map.addChild(new YMapDefaultFeaturesLayer({ zIndex: 1800 }))

markers.forEach((item) => {
  item.el.className = 'map__marker'

  map.addChild(
    new YMapMarker(
      {
        coordinates: item.coordinates,
      },
      item.el
    )
  )
})

map.addChild(new YMapDefaultSchemeLayer({}))
