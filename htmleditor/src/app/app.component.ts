import { Component } from '@angular/core';
import tinymce, { Editor} from 'tinymce';

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
      plugins: [ 'table', 'preview', 'image'],
      toolbar: 'undo redo',
      statusbar: false,
      promotion: false,
      add_form_submit_trigger : false,     
      file_picker_types: 'image',  
      file_picker_callback: (callback: any, value: any, meta: any) => { this.uploadImage(callback); }  
    }

      
    click() {
      const editor = document.getElementById('htmleditor')
      const t = editor?.innerHTML;    
      let mydata = tinymce.activeEditor?.getContent();
      const myContent = tinymce.get("htmleditor")?.getContent();      
     // this.downloadObjectAsJson('<html><body>'.concat(mydata?mydata:'').concat('</html></body>'));
      this.downloadTextFile('<html><body>'.concat(mydata?mydata:'').concat('</html></body>'));
    }

    uploadImage(callback: any) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.click();
      input.onchange = () => {        
        if (input.files && input.files.length > 0) {
          const file = input.files[0]; 
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {          
            const blobCache =  tinymce.activeEditor?.editorUpload.blobCache;
            //@ts-expect-error
            const base64 = reader.result.split(',')[1];
            if(blobCache) {                       
              const blobInfo = blobCache.create('id' + (new Date()).getTime(), file, base64);           
              blobCache.add(blobInfo);          
              callback(blobInfo.blobUri(), { title: file.name });
            }           
          };
        }       
      };
    }
    
    downloadObjectAsJson(exportObj: any){
      var dataStr = "data:text/html;charset=utf-8," + encodeURIComponent(exportObj);
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href",     dataStr);
      downloadAnchorNode.setAttribute("download", "test.html");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    }

    downloadTextFile(text: BlobPart) {
      const a = document.createElement('a');
      a.href = URL.createObjectURL( new Blob([text], { type:`text/html` }) );
      a.download = 'test.html';
      a.click();
    }
    
    
}
