/*Accederemos al identificador del nodo elemento del botón
para que cuando el usuario mueve el ratón por encima se le cambie dicho color

Este evento sera visible en nuestra página HTML como en PHP.
*/

const formulario__boton = document.querySelector("#boton");

function CambiarColor()
{
  //Evento cuando el usuario se ponga encima del botón
  formulario__boton.addEventListener("mouseover", () =>
  {
    formulario__boton.classList.remove("colorInicial");
    //Añadiremos la nueva clase al elemento
    formulario__boton.classList.add("colorCanviado");
  }
  )
  //Evento cuando el usuario salga de dicho botón
  formulario__boton.addEventListener("mouseout", () =>
  {
    //Borraremos la anterior clase, para que solo este la que corresponda
    formulario__boton.classList.remove("colorCanviado");
    //Añadimos la nueva clase al elemento
    formulario__boton.classList.add("colorInicial");
  }
  )
}
//Llamada Funcion
CambiarColor();
