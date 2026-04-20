import * as mongodb from "mongodb";

export interface UserInterface {
    _id?: mongodb.ObjectId;
    name: string;
    img: string;
    desc?: string;
    content?: string;
    pgLoc: "Landing" | "Home" | "Work" | "Restaurant" | "CurbSide"

}


export interface ServiceScreenInterface {
  _id?: mongodb.ObjectId;
  name?: string;
  title?: string;
  subtitle?: string;
  desc?: string;    
  content?: Blob;
  img?: string;
  rte?: string;
  num?: number;

}

export interface ProtectSrvcsInterface {
  _id?: mongodb.ObjectId;
  name?: string;
  title?: string;
  subtitle?: string;
  desc?: string;    
  content?: Blob;
  img?: string;
  imgAlt?: string;
  rte?: string;
  num?: number;
  backgroundColor?: string;
  borderColor?: string;
  compSize?: string;
  compType?: string;

}

export interface SurveilSrvcsInterface {
  _id?: mongodb.ObjectId;
  name?: string;
  title?: string;
  subtitle?: string;
  desc?: string;    
  content?: Blob;
  img?: string;
  imgAlt?: string;
  rte?: string;
  num?: number;
  backgroundColor?: string;
  borderColor?: string;
  compSize?: string;
  compType?: string;

}

