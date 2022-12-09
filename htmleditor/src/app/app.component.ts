import { Component } from '@angular/core';
import tinymce, { Editor, EditorManager } from 'tinymce';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
    title = 'htmleditor';
    editorConfig = { 
      base_url: '/tinymce', 
      suffix: '.min', 
      plugins: [ 'table', 'preview', 'image', 'save'],
      toolbar: 'undo redo save' ,
      statusbar: false,
      promotion: false,
      save_onsavecallback: () => {
        console.log('Saved');
        
      }        
      }
    click() {
      const editor = document.getElementById('htmleditor')
      const t = editor?.innerHTML;    
  
      //two methods by which we can get the data out.
      let mydata = tinymce.activeEditor?.getContent();
      var myContent = tinymce.get("htmleditor")?.getContent();
      console.log('clicked');
    }
}
