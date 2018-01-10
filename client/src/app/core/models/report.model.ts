export class Report {
  text: string;
  authorId: string;
  earthquakeId: string;
  authorName: string;
  strength: number;
  constructor(text:string, authorId:string,earthquakeId:string, authorName: string, strength: number){
    this.text = text;
    this.authorId = authorId;
    this.authorName = authorName;
    this.strength = strength;
    this.earthquakeId = earthquakeId;
  }
}