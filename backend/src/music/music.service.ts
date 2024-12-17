import { Injectable } from '@nestjs/common';
import SpotifyWebApi = require('spotify-web-api-node');

@Injectable()
export class MusicService {
  private readonly spotifyApi: SpotifyWebApi;

  constructor() {
    this.spotifyApi = new SpotifyWebApi({
      clientId: process.env.SPOTIFY_CLIENT,
      clientSecret: process.env.SPOTIFY_SECRET,
    });

    this.spotifyApi
      .clientCredentialsGrant()
      .then((data) => {
        this.spotifyApi.setAccessToken(data.body['access_token']);
      })
      .catch((error) => {
        console.error('Failed to retrieve access token', error);
      });
  }

  async getMusicSuggestion(temp: any): Promise<any> {
    const genre = temp > 25 ? 'pop' : temp >= 10 ? 'rock' : 'classical';
    try {

      const playlistsData = await this.spotifyApi.searchPlaylists(genre, { limit: 10 });
      const playlists = playlistsData?.body?.playlists?.items;

      if (!playlists || playlists.length === 0) return { error: true, message: "No playlists found for the given genre." }

      const validPlaylists = playlists.filter(item => item?.id);
      if (validPlaylists.length === 0) return { error: true, message: "No valid playlists found." }

      const randomPlaylistIndex = Math.floor(Math.random() * validPlaylists.length);
      const playlistInfo = validPlaylists[randomPlaylistIndex];

      if (!playlistInfo || !playlistInfo.id) return { error: true, message: "Invalid playlist information.');" }
      const tracks = await this.spotifyApi.getPlaylistTracks(playlistInfo.id, {
        limit: 50,
      });

      const trackItems = tracks?.body?.items;
      if (!trackItems || trackItems.length === 0) return { error: true, message: "No tracks found in the selected playlist." }

      const randomTrackIndex = Math.floor(Math.random() * trackItems.length);
      const track = trackItems[randomTrackIndex]?.track;

      if (!track || !track.external_urls) return { error: true, message: "Invalid track information." }

      return {
        playlist: playlistInfo.external_urls.spotify.split('playlist/')[1],
        track: track.external_urls.spotify.split('track/')[1],
      };
    } catch (error) {
      return { error: true, message: error.message }
    }
  }

}
