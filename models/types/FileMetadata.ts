export interface FileMetadata {
  id: string;
  name: string;
  contentType: string;
  extension: string;
  size: number; // in bytes
  viewLink: string;
  downloadLink?: string | null;
  storageProvider: string;
  createdAt: Date;
  updatedAt: Date;
}
