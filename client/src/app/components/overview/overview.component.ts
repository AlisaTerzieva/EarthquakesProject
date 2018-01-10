import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { Earthquake } from "../../core/models/earthquake.model";
import { EarthquakeService } from '../../core/services/earthquakes/earthquake.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from "rxjs/Observable";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";

// This is necessary to access ol3!
declare var ol: any;

@Component({
  selector: 'earthquakes-map',
  styleUrls: ['./overview.component.css'],
  templateUrl: './overview.component.html',
  // The "#" (template reference variable) matters to access the map element with the ViewChild decorator!
})

export class OverviewComponent implements AfterViewInit, OnInit {
  // This is necessary to access the html element to set the map target (after view init)!
  @ViewChild("mapElement") mapElement: ElementRef;
  public earthquakesData: Earthquake[];
  ol: any;
  map: any;

  constructor(private earthquakeService: EarthquakeService, private toastr: ToastsManager) {
  }

  ngOnInit() {
    this.earthquakeService.getLast50()
      .subscribe(data => {
        this.toastr.success('Loading data success!', 'Success', { dismiss: 'controlled', showCloseButton: true })
        this.earthquakesData = data.map(event =>
          new Earthquake(
            event['id'],
            Number(event['latitude_deg']),
            Number(event['longitude_deg']),
            new Date(event['dateTime']),
            Number(event['depth']),
            event['magn_type'],
            Number(event['magnitude']),
            3,
            event['region']
          )
        );
        createPoints();
      }, err => {
        this.toastr.error('Loading data failed!', 'Error', { dismiss: 'controlled', showCloseButton: true })
      })
    // note that the target cannot be set here!
    this.map = new ol.Map({
      controls: ol.control.defaults().extend([
        new ol.control.ScaleLine({
          units: 'metric',
          geodesic: true
        })
      ]),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.Stamen({
            layer: 'toner'
          })
        })
      ],
      renderer: "canvas",
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true,
      view: new ol.View({
        center: ol.proj.transform([0, 10], 'EPSG:4326', 'EPSG:3857'),
        zoom: 2.5
      })
    });

    var createPoints = () => {
      var earthquakes = [];
      for (let earthquake of this.earthquakesData) {
        var iconFeature = new ol.Feature({
          geometry: new ol.geom.Point(ol.proj.transform([earthquake.longitude, earthquake.latitude], 'EPSG:4326', 'EPSG:3857')),
          name: 'earthquake',
          id: earthquake.id,
          longitude_deg: earthquake.longitude,
          latitude_deg: earthquake.latitude,
          date: earthquake.date,
          depth: earthquake.depth,
          magnType: earthquake.magnType,
          magnitude: earthquake.magnitude,
          region: earthquake.region,
        });
        var iconStyleHeavy = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5 + 20 / (Number(earthquake.depth) + 2),
            fill: new ol.style.Fill({
              color: [255, 0, 0, 1]
            }),
            stroke: new ol.style.Stroke({
              color: [255, 0, 0, 1],
              width: 1
            })
          }),
          zIndex: 1
        });

        var iconStyleMed = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5 + 20 / (Number(earthquake.depth) + 2),
            fill: new ol.style.Fill({
              color: [255, 153, 0, 1]
            }),
            stroke: new ol.style.Stroke({
              color: [255, 0, 0, 1],
              width: 1
            })
          }),
          zIndex: 1
        });
        var iconStyleLow = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 5 + 20 / (Number(earthquake.depth) + 2),
            fill: new ol.style.Fill({
              color: [255, 255, 0, 1]
            }),
            stroke: new ol.style.Stroke({
              color: [255, 0, 0, 1],
              width: 1
            })
          }),
          zIndex: 1
        });

        if (earthquake.magnitude < 3) {
          iconFeature.setStyle(iconStyleLow);
        }
        else if (earthquake.magnitude < 5) {
          iconFeature.setStyle(iconStyleMed);
        }
        else {
          iconFeature.setStyle(iconStyleHeavy);
        }
        iconFeature.setId(earthquake.id);

        earthquakes.push(iconFeature)
      }
      var pointLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          features: earthquakes
        }),
        renderBuffer: 50
      });
      pointLayer.setExtent(ol.proj.transformExtent([-180, -90, 180, 90], 'EPSG:4326', 'EPSG:3857'));

      this.map.addLayer(pointLayer)
    }

  }
  // After view init the map target can be set!
  ngAfterViewInit() {
    this.map.setTarget(this.mapElement.nativeElement.id);
  }

}


// var view = new ol.View({
//   center: ol.proj.transform([0, 10], 'EPSG:4326', 'EPSG:3857'),
//   zoom: 2.5
// })


// var element = document.getElementById('popup');

// var popup = new ol.Overlay({
//   element: element,
//   positioning: 'bottom-center'
// });
// map.addOverlay(popup);

// function popoverToggle(feature) {
//       var content =
//           '<b>Регион:</b> ' + feature.get('region') + '<br>' +
//           '<b>Магнитуд:</b> ' + feature.get('magnitude') + ' ' + feature.get('magnType') + '<br>' +
//           '<b>Дълбочина:</b> ' + feature.get('depth') + 'км<br>' +
//           '<b>Географски координати:</b> дължина:' + feature.get('longitude_deg') + '° ширина:' + feature.get('latitude_deg') + '°<br>'
//       popup.setPosition(feature.getGeometry().getCoordinates());
//       $(element).popover({
//           'placement': 'top',
//           'html': true,
//           'content': content
//       });
//       $(element).popover('show');

//   }


// map.on('click', function (evt) {
//   var feature = map.forEachFeatureAtPixel(evt.pixel,
//       function (feature, layer) {
//           return feature;
//       });
//   if (feature) {
//       popoverToggle(feature)
//   }
//   else {
//       $(element).popover('destroy');
//   }
// });
// map.on('pointermove', function (e) {
//   if (e.dragging) {
//       $(element).popover('destroy');
//       return;
//   }
//   var pixel = map.getEventPixel(e.originalEvent);
//   var hit = map.hasFeatureAtPixel(pixel);
//   map.getTarget().cursor = hit ? 'pointer' : '';
// });

// $("div#event").click(function (e) {
//   e.stopPropagation();
//   closeSidebar();
//   var featureId = $(this).children().first().attr("id");
//   var feature = pointLayer.getSource().getFeatureById(featureId)
//   var coords = feature.getGeometry().getExtent();
//   var lon = coords[0];
//   var lat = coords[1];
//   var pan = ol.animation.pan({
//       source: map.getView().getCenter(),
//       zoom: 6
//   });
//   var zoom = ol.animation.zoom({
//       resolution: map.getView().getResolution()
//   });
//   map.beforeRender(pan);
//   map.beforeRender(zoom);

//   map.getView().setResolution(7000);
//   map.getView().setCenter([lon,lat]);
//   setTimeout(function () {
//       popoverToggle(feature)
//   }, 1200)
// })
// });