import { Client, Databases, ID, Query } from "appwrite";
import config from "../config/config";

export class PlaylistService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.apiendpoints)
      .setProject(config.projectid);
    this.databases = new Databases(this.client);
  }


  async addSongToPlaylist(songId, userId) {
    try {
      const response = await this.databases.createDocument(
        config.databasesid,
        config.tableid,
        ID.unique(),
        {
          song: String(songId),
          userId: String(userId)
        }
      );

      return response;
    } catch (error) {
      console.error("error in addSongToPlaylist ::", error);
      return null;
    }
  }


  async getPlaylist(userId) {
    try {
      const response = await this.databases.listDocuments(
        config.databasesid,
        config.tableid,
        [Query.equal("userId", userId)]
      );


       return response.documents.map((doc)=>doc.song)
    } catch (error) {
      console.error("error in getPlaylist ::", error);
      return [];
    }
  }


  async removeSongFromPlaylist(songId, userId) {
    try {
      const response = await this.databases.listDocuments(
        config.databasesid,
        config.tableid,
        [
          Query.equal("song", String(songId)),
          Query.equal("userId", String(userId))
        ]
      );

      if (response.documents.length > 0) {
        const docId = response.documents[0].$id;
        await this.databases.deleteDocument(
          config.databasesid,
          config.tableid,
          docId
        );
        return true;
      }

      return false;
    } catch (error) {
      console.error("error in removeSongFromPlaylist ::", error);
      return false;
    }
  }
}

export const playlistService = new PlaylistService();
