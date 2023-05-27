
   let todoo=document.getElementById("todo")
   todoo.classList.add("active")
   //remover clase active 
      function filtro(botonutilizado){
      
      let botones=document.querySelectorAll('.boton');
      console.log(botones);
      for(let i=0;i<botones.length;i++){
         botones[i].classList.remove("active");
      }
   //agregar clase active al botonutilizado
      botonutilizado.classList.add("active")

   //conseguir el id
      let idbotonutilizado=botonutilizado.id;
      console.log(idbotonutilizado)
   //comparar el nombre del id con la funcion 
      switch (idbotonutilizado) {
            case "seriesp":
               todo();
               seriesp();
               break;
            case "seriesn":
               todo();
               seriesn();
               break;
            case "pelisp":
               todo();
               pelisp();
               break;
            case "pelisn":
               todo();
               pelisn();
               break;
            case "todo":
               todo();
               break;
            default:
               break;
         }
   }
   




   function sp(){
            let d =document.querySelectorAll(".seriesp")
            for(var i=0;i<d.length;i++){
               document.querySelectorAll(".seriesp")[i].classList.add("hidden");
            }
   
         }
   function sn(){ 
                  let x =document.querySelectorAll(".seriesn");
                  for(var i=0;i<x.length;i++){
                        x[i].classList.add("hidden");
                  
                  
               }
            
               }
    function pn(){
               var c =document.querySelectorAll(".pelisn")
                    
               for(var i=0;i<c.length;i++){
                  c[i].classList.add("hidden");
               }
            }
    function pp(){
               let y =document.querySelectorAll(".pelisp")
               for(var i=0;i<y.length;i++){
                  y[i].classList.add("hidden");
               }
   }
            

   function seriesp(){
         
         sn();pn();pp();
         }
   
   function seriesn(){
            sp();pn();pp();
         }
   function pelisn(){
            pp();sp();sn();
        }
   function pelisp(){
            pn();sn();sp();
        }
   function todo(){
      let elementos=document.querySelectorAll(".elementos")
      for(let i=0;i<elementos.length;i++)
      elementos[i].classList.remove("hidden")
   }
      
      

      
      
               




      





