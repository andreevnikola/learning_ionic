import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { IMovie, MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie: IMovie | undefined;
  isSubtitleFullyVisible = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles',
    });

    await loading.present();

    this.movieService.getMovieDetails(id!.toString()).subscribe((res) => {
      this.movie = res;
      loading.dismiss();
    });
  }
}
