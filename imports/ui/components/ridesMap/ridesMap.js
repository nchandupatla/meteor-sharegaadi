import angular from 'angular';
import angularMeteor from 'angular-meteor';
import 'angular-simple-logger';
import 'angular-google-maps';

import template from './ridesMap.html';

/**
 * ridesMap component
 */
class RidesMap {
  constructor() {
    this.map = {
      center: {
        latitude: 45,
        longitude: -73
      },
      zoom: 11
    };

    this.markersr= [
        {
            id: 101,
            latitude:  42.3349940452867,
            longitude:-71.0363168884369
        },    
        {
            id: 102,
            latitude:  42.3563941755867,
                  longitude:-71.0466168884469
        }, {
            id: 103,
            latitude:   42.3753940755867,
                  longitude:-71.0853168884369
        }, {
            id: 104,
            latitude:  42.3684940856867,
               longitude:-71.1273168884369
        }]
  }
}

const name = 'ridesMap';

// create a module
export default angular.module(name, [
  angularMeteor,
  'nemLogging', // https://github.com/angular-ui/angular-google-maps/issues/1633
  'uiGmapgoogle-maps'
]).component(name, {
  template,
  controllerAs: name,
  bindings: {
    rides: '='
  },
  controller: RidesMap
});
