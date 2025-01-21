import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { SimplePokemon } from '../../pokemons/interfaces';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit{

  public isLoading = signal(true);
  private readonly pokemonsService = inject(PokemonsService);
  public pokemons = signal<SimplePokemon[]>([]);

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);
  
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );
  //private appRef = inject(ApplicationRef);

  /*private $appState = this.appRef.isStable.subscribe((isStable) => {
    console.log({ isStable });
  });*/

  ngOnInit(): void {
    this.loadPokemons();
    this.route.queryParams.subscribe((params) => {
      console.log({ params });
    });
    /*setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);*/
  }

  public loadPokemons(page = 0) {
    const pageToLoad = this.currentPage()! + page;

    this.pokemonsService
    .loadPage(pageToLoad)
    .pipe(
      tap(() =>
        this.router.navigate([], { queryParams: { page: pageToLoad } })
      ),
      tap(() => this.title.setTitle(`Pokémons SSR - Page ${pageToLoad}`))
    )
    .subscribe((pokemons) => {
      this.pokemons.set(pokemons);
    });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

}
