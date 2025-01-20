import { ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  standalone: true,
  imports: [],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AboutPageComponent implements OnInit{
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  
  ngOnInit(): void {
     this.title.setTitle('About Page');
     this.meta.updateTag({ name: 'description', content: 'About Page Description' });
     this.meta.updateTag({ name: 'og:title', content: 'About Page Description' });
     this.meta.updateTag({ name: 'keywords', content: 'About pokemon, curso angular pro' });
  }

}
