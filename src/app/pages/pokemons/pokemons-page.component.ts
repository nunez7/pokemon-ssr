import { ApplicationRef, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { PokemonListSkeletonComponent } from "./ui/pokemon-list-skeleton/pokemon-list-skeleton.component";

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  styleUrl: './pokemons-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PokemonsPageComponent implements OnInit{

  public isLoading = signal(true);
  private pokemonsService = inject(PokemonsService);
  //private appRef = inject(ApplicationRef);

  /*private $appState = this.appRef.isStable.subscribe((isStable) => {
    console.log({ isStable });
  });*/

  ngOnInit(): void {
    this.loadPokemons();
    /*setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);*/
  }

  public loadPokemons(page = 0) {
    this.pokemonsService.loadPage(page).subscribe((pokemons) => {
      console.log({ pokemons });
    });
  }

  // ngOnDestroy(): void {
  //   this.$appState.unsubscribe();
  // }

}
