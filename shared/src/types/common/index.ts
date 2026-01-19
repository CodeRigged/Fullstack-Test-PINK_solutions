import { FhirResourceType } from "../enums/index.js";

export interface FhirBundle {
  resourceType: FhirResourceType.BUNDLE;
  id: string;
  meta: FhirMeta;
  type: string;
  link: FhirLink[];
  entry: FhirEntry[];
}

export interface FhirMeta {
  lastUpdated: string;
}

export interface FhirLink {
  relation: string;
  url: string;
}

export interface FhirEntry {
  fullUrl: string;
  resource: FhirPatient;
  search: {
    mode: string;
  };
}

export interface FhirPatient {
  resourceType: FhirResourceType.PATIENT;
  id: string;
  meta: FhirPatientMeta;
  text?: FhirText;
  identifier?: FhirIdentifier[];
  active?: boolean;
  name?: FhirName[];
  telecom?: FhirTelecom[];
  gender?: string;
  birthDate?: string;
  contact?: FhirContact[];
  multipleBirthInteger?: number;
}

export interface FhirPatientMeta {
  versionId: string;
  lastUpdated: string;
  source?: string;
}

export interface FhirText {
  status: string;
  div: string;
}

export interface FhirIdentifier {
  [key: string]: any;
}

export interface FhirName {
  [key: string]: any;
}

export interface FhirTelecom {
  [key: string]: any;
}

export interface FhirContact {
  [key: string]: any;
}
