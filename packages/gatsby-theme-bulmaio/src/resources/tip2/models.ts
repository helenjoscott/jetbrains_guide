import { Resource } from '../models';
import { Video } from '../../components/video';
import { SeeAlsos } from '../../components2/seealso';
import { InPlaylists } from '../../components2/playlists';

export interface Tip2Resource extends Resource {
  cardThumbnail: {
    publicURL: string
  }
  date: string;
  hasBody?: boolean;
  animatedGif?: {
    file: {
      publicURL: string
    }
    width: number
    height: number
  };
  shortVideo?: Video;
  longVideo?: Video;
  leadin: string;
  seealso?: SeeAlsos;
  inPlaylists: InPlaylists
}
