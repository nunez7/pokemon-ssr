import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [],
  templateUrl: './contact-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ContactPageComponent implements OnInit{

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  
  ngOnInit(): void {
     this.title.setTitle('Contact Page');
     this.meta.updateTag({ name: 'description', content: 'Contact Page Description' });
     this.meta.updateTag({ name: 'og:title', content: 'Contact Page Description' });
     this.meta.updateTag({ name: 'keywords', content: 'Contact pokemon, curso angular pro' });
  }

}
