import { Component } from '@angular/core';
import tinymce, { Editor } from 'tinymce';
import studentsData from './patient.json';  

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {  
    title = 'htmleditor';
    patient:any = studentsData;
    editorConfig = { 
      base_url: '/tinymce', 
      suffix: '.min', 
      plugins: [ 'table', 'preview', 'image'],
      toolbar: 'undo redo customInsertButton mybutton ',
      statusbar: false,
      promotion: false,
      add_form_submit_trigger : false,     
      file_picker_types: 'image',  
      file_picker_callback: (callback: any, value: any, meta: any) => { this.uploadImage(callback); },
      setup: ((editor: Editor) => this.buttonSetUp(editor))       
    }
  keys: string[]=[];
    
    buttonSetUp(editor: Editor) {
      editor.ui.registry.addButton('customInsertButton', {
        text: 'My Button',
        onAction: function (_: any) {
          editor.insertContent('&nbsp;<strong>It\'s my button!</strong>&nbsp;');
        }
      }); 
      
        /* Menu items are recreated when the menu is closed and opened, so we need
           a variable to store the toggle menu item state. */
        var toggleState = false;
        const t = this.getKeys();
        /* example, adding a toolbar menu button */
        editor.ui.registry.addMenuButton('mybutton', {
          text: 'Patient Variables',
          fetch: function (callback:any) {
            //const keys = ['patient.name', 'patient[0].name']
            const keys = t;
            const items = keys.map((v:string )=>{
                  return {
                    type: 'menuitem',
                    text: v,
                    onAction: function () {
                      editor.insertContent(v);
                    }
                  }                  
            })           
            
            callback(items);
          }
        });
    
      
    }

    temp() {

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
    
    addContent() {
      let mydata = tinymce.activeEditor?.getContent();
      mydata = mydata + " " + "${patient.firstName}";   
      tinymce.activeEditor?.setContent(mydata); 

    }
    getKeys() { 
      const value:string[] = [];     
      this.parseJSON('patient', this.patient, value);
      this.keys=value;
      return value;
    }

parseJSON(parent: string, node: any, value:string[]) { 
  const isArray: boolean = Array.isArray(node); 
  for(const item in node) {
    const path: string = isArray ? parent + "[" + item +  "]" : parent + "." + item;   
    value.push(path);
    if(node[item] instanceof Object){
      this.parseJSON(path, node[item], value);
    }    
  }
}

}
