export class Earthquake {
  id: number;
  latitude: number;
  longitude: number;
  date: Date;
  depth: number;
  magnType: string;
  magnitude: number;
  radius: number;
  region: string;
  constructor(
    id: number,
    latitude: number,
    longitude: number,
    date: Date,
    depth: number,
    magnType: string,
    magnitude: number,
    radius: number,
    region: string
  ) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.date = date;
    this.depth = depth;
    this.magnType = magnType;
    this.magnitude = magnitude;
    this.radius = radius;
    this.region = region;
  }
}