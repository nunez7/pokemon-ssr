import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class PricingPageComponent implements OnInit{

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  
  ngOnInit(): void {
     this.title.setTitle('Pricing Page');
     this.meta.updateTag({ name: 'description', content: 'Pricing Page Description' });
     this.meta.updateTag({ name: 'og:title', content: 'Pricing Page Description' });
     this.meta.updateTag({ name: 'keywords', content: 'Pricing pokemon, curso angular pro' });
  }

  

}
