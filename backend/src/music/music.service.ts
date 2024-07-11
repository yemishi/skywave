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

    const playlists = await this.spotifyApi.searchPlaylists(genre, {
      limit: 10,
    });

    const randomPlaylistIndex = Math.floor(
      Math.random() * playlists.body.playlists.items.length,
    );
    const playlistInfo = playlists.body.playlists.items[randomPlaylistIndex];
    const tracks = await this.spotifyApi.getPlaylistTracks(playlistInfo.id, {
      limit: 50,
    });

    const randomTrackIndex = Math.floor(
      Math.random() * tracks.body.items.length,
    );
    const track = tracks.body.items[randomTrackIndex].track;

    return {
      playlist: playlistInfo.external_urls.spotify.split('playlist/')[1],
      track: track.external_urls.spotify.split('track/')[1],
    };
  }
}
