import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {
  IMovie,
  MovieService,
  Video,
  Videos,
} from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: IMovie | undefined;
  trailer: Video | undefined;
  relatedVideos: Video[] = [];
  videoHeight: number = 0;
  isSubtitleFullyVisible = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private loadingCtrl: LoadingController,
    private platform: Platform
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.videoHeight = (this.platform.width() / 16) * 9;

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.movieService.getVideo(id!.toString()).subscribe((res: Videos) => {
      this.trailer = res.trailer;
      res.results.map((video: Video) => {
        this.relatedVideos.push(video);
      });
    });

    this.movieService.getMovieDetails(id!.toString()).subscribe((res) => {
      this.movie = res;
      loading.dismiss();
    });
  }
}
