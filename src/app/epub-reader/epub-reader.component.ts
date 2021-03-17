import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import * as jszip from '../../../node_modules/jszip';
import * as ePub from '../../../node_modules/epubjs/dist/epub.min.js';
import { DataService } from '../core/data.service';

@Component({
  selector: 'app-epub-reader',
  templateUrl: './epub-reader.component.html',
  styleUrls: ['./epub-reader.component.css'],
})
export class EpubReaderComponent implements OnInit {
  book = null;

  //
  width = 600;
  height = 600;

  //
  Rendition;

  //
  subscription: Subscription = new Subscription();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // this.load();
  }

  load(): void {
    // document.getElementById('bookChooser').addEventListener('change', (e) => {
    //
    // var firstFile = (<HTMLInputElement>e.target).files[0];

    // const url: string = 'https://zhoricc3398.github.io/ugt-csp/assets/test.epub';
    const url: string = '../../assets/test.epub';
    // const url: string = '../../assets/icons/icon-72x72.png';

    this.subscription.add(
      this.dataService.getData(url).subscribe((x) => {
        console.log(x, '--------------------------');

        let firstFile = x;

        if (window.FileReader) {
          let reader: FileReader = new FileReader();

          reader.onload = (e) => {
            // console.log(e);
            this.book = ePub(firstFile);
            this.Rendition = this.book.renderTo('area');
            //getting cover
            // this.book.coverUrl().then((result) => {
            // document.getElementById('cover').setAttribute('src', result);
            // });
            this.Rendition.display();
            /* Replace area with the id for your div to put the book in */
          };

          reader.readAsArrayBuffer(firstFile);

          reader.onloadend = (e) => {
            // console.log(book);
          };
        } else {
          alert(
            'Your browser does not support the required features. Please use a modern browser such as Google Chrome, or Mozilla Firefox'
          );
        }
        // });
      }, error => {
        console.log(error, '-------------------------*');
        
        // var test = new Blob(error.error.text);
        // console.log(test);
      })
    );

    // next page
    document.getElementById('nextPage').addEventListener('click', () => {
      // next page
      this.Rendition.next();
    });

    // prev page
    document.getElementById('prevPage').addEventListener('click', () => {
      // next page
      this.Rendition.prev();
    });
  }
}
