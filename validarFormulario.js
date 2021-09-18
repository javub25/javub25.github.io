//Tendrá el objetivo de cambiar el menú desplegable Concesión según la provincia elegida

function CambiarConcesion()
{
  //Accedemos a la provincia
  const provinciaElegida = document.querySelector("#provincia");

  //Evento que se disparará cuando el usuario clique sobre el menú (Provincia)
  provinciaElegida.addEventListener("click", () =>
  {
    /*Vamos a crear un objeto de provincias que contendran las concesiones
    correspondientes para ser añadidas de forma dinámica a nuestro select "Concesión"

    En rojo encontraríamos las claves de nuestro objeto y en verde los arrays de string.

    El objeto será de tipo const para que sus valores no se vean modificados
    */
      const provincias = {
        /*Aunque Alava solo tenga un valor, lo he puesto también en un array
        para que si en un futuro tenemos más concesiones de esta provincia,
        las fueramos añadiendo*/
        Alava: ["CIARSA (Alto de Armentia, 4 - Vitoria"],
        Lleida: ["AUTODALSER DALMAU, S.L. (P.I. El Segre c/. Josep Baró i Travé, 117 bis - Lleida)",
                "SERVISIMÓ, S.L. (Avda. Barcelona, 19 - Tárrega)", "SERVISIMÓ, S.L. (Avda. Europa, Polígono Industrial Goltparc - Golmes Mollerusa)"],
        Madrid: ["ARDASA 2.000, S.A. (Avda. Carlos Sainz, 39-41 - Leganés)",
        "ARDASA 2.000, S.A. (C/ Almendro, nº 8 - Fuenlabrada)",
        "COMATRA VEHIC. COMERCIALES, S.L. (C. Eratostenes, 4, Polígono Industrial El Lomo -Getafe)",
        "SF. TOME, S.A.. (C. Tauro, 27 - Madrid)", "MOTOR GÓMEZ VILLALBA, S.A. (Av. Juan Carlos I, 24 - Collado Villalba)",
        "SEALCO MOTOR, S.A.. (Ctra. S. M.Valdeiglesias, n.32 - Alcorcón)",
        "VOLKSWAGEN MADRID, S.A. (C/ De Sofía, 18 - Madrid)"],
        Valencia: ["LEVANTE WAGEN, S.A. (Avda. Cid, 152 - Valencia)", "TALLERS XÀTIVA, S.A. (C. Llosa de Ranes, 5 Polig. C, s/n - Xàtiva)"
      ]
      }

      //Accedemos al menú de Concesiones
      const selectorConcesiones = document.querySelector("#selectorConcesiones");

      /*A continuación vamos a eliminar las etiquetas hijas del selector excepto el hijo llamado
      Selecciona, de esa forma el usuario tendrá aún acceso a él cuando vaya cambiando de provincia.

      Dichas etiquetas hijas o option estarian guardadas en una lista de elementos
      */

      //Primero obtenemos cuantos option tiene el selector
      let cantidadHijos = selectorConcesiones.length;

      /*Después haremos un bucle con la idea de eliminar todos los option que su valor
      no sea "Selecciona".*/
      let i=0;

      while(i<cantidadHijos)
      {
        if(selectorConcesiones[i].value!="Selecciona")
        {
          //Con removeChild elimnaremos cada hijo que no coincida
          selectorConcesiones.removeChild(selectorConcesiones[i]);
          /*Cada vez que vayamos eliminando, sera necesario indicarle a nuestro bucle
          que se ha eliminado un hijo del selector, para que asi ahorremos tiempo de ejecución*/
          cantidadHijos = cantidadHijos-1;
        }
        else
        {
          //Cada option eliminado se verá reemplazado por el siguiente
          i++;
        }
      }

      /*A continuación, vamos a añadir las concesiones que coincidan con la província.

      Utilizaremos un for in porque vamos a recorrer un objeto y quiero acceder a los indices
      */
      for(let provincia in provincias)
      {
        /*Cuando sea una determinada provinca se añadirá los valores relacionados y
        cuando sea el valor Selecciona se añadirán todos los valores*/
        if(provincia === provinciaElegida.value || provinciaElegida.value === "Selecciona")
        {
          //El iterador i será de tipo let porqué irá incrementando
          let i = 0;
          //Guardamos cuantos indices hay en cada provincia de nuestro objeto
          const longitudProvincia = provincias[provincia].length;
          do
          {
            //Creamos un nodo elemento de tipo option para cada concesión
            const ubicacionConcesion = document.createElement("option");

            //Añadimos cada valor en el elemento
            ubicacionConcesion.textContent = provincias[provincia][i];

            //Añadimos el elemento option en el Select "Concesión"
            selectorConcesiones.appendChild(ubicacionConcesion);

            i++;

            }while(i<longitudProvincia);
          }
        }
      }
    )
}

//Función que corregirá los errores del Formulario

function ValidarErrores()
{
  /*Evento que se disparará cuando el usuario haga clic al boton
  El parametro "e" nos servirá para acceder a las propiedades del padre del evento*/
  formulario__boton.addEventListener("click", (e) =>
  {
    //Accederemos al nodo elemento del formulario
    const Formulario = document.querySelector("#Formulario");

    //Obtenemos los datos del formulario con el objeto FormData
    const datosFormulario = new FormData(Formulario);

    //Booleano que determinará que no haya ningun error para enviar los datos al servidor
    let error = false;

    /*Revisamos que haya aceptado la política de privacidad.
    Si es "null" el input no habrá sido inicializado, en cambio con "on" si*/
    if(datosFormulario.get("Confirmacion") === null)
    {
      alert("Por favor, acepta nuestra politica de privacidad");
      error = true;
    }

    else
    {
      /*Booleano que se encargará de verificar que el usuario haya interactuado con todos los campos
      y no deje ninguno vacio*/
      let obligatorio = false;

      /*Bucle que comprobará que ningun menú tenga el valor Selecciona
      y que ningun input se encuentre vacio*/

      for(let [clave, valor] of datosFormulario)
      {
        if(valor === "Selecciona" || valor === " ")
        {
          obligatorio = true;
          error = true;
        }
      }

      if(obligatorio === true)
      {
        //Escribimos el mensaje personalizado
        alert("Todos los campos son obligatorios");
        error = true;
      }
      else
      {
          //VERIFICACIÓN NOMBRE COMPLETO

          /*Ponemos el nombre y los dos apellidos en una variable con un pequeño espacio
          entre ellos, para que de esa manera podamos verificar cada valor de forma separada*/
          const nombreCompleto = datosFormulario.get("Nombre") + " " + datosFormulario.get("1erApellido") + " " + datosFormulario.get("2nApellido");

          /*La siguiente expresión regular validará:
          - Empieze el nombre solo por letras y que tengan el limite mínimo de 3 y máximo de 20.
          - A continuación con \s permitimos solo 1 espacio en blanco.
          - A partir de los dos apellidos solo serán letras y tendrán un limite minimo de 3 y máximo de 30.
          - Con el simbolo $ especificaremos que acabe con letras.
          - Con la letra i indicamos que trate igual mayusculas como minusculas.
          */

          const expresionNombre = /^[a-z]{3,20}\s{1}[a-z]{3,30}\s{1}[a-z]{3,30}$/i;

          /*Verificaremos con el metodo test si coincide el patrón con el nombre
          En caso que nos devuelve false querrá decir que no se cumple*/

          if(expresionNombre.test(nombreCompleto) === false)
          {
            alert("El nombre completo es inválido");
            error = true;
          }

          //VERIFICACIÓN EMAIL

          //^[a-zA-Z0-9]+ -> Empezará por letras de a-z minuscula o mayúscula o por numeros.
          //\@[a-z]+ -> A continuación tendrá un simbolo de @ y mas de una letra
          //\.[a-z]+ -> Finalmente se buscará un punto y letras
          //$ -> Acabará con un dominio (ejemplo -> hotmail.com)
          const expresionEmail = /^[a-zA-Z0-9]+\@[a-z]+\.[a-z]+$/;

          //Cuando no cumpla con el patrón o su longitud es mayor o igual a 40 carácteres será un email inválido
          if(expresionEmail.test(datosFormulario.get("Email")) === false || datosFormulario.get("Email").length >=40)
          {
            alert("Email inválido");
            error = true;
          }

          //VERIFICACIÓN MOVIL

          /*^+34 -> Empezará por el simbolo + y después el número 34 (formato internacional)
          (6|7) -> A continuación tendrá el número 6 o 7 que és de España
          [0-9]{8}$ -> Finalmente acabará con 8 números entre 0 y 9
          */
          const expresionMovil = /^\+34(6|7)[0-9]{8}$/;

          if(expresionMovil.test(datosFormulario.get("Movil")) === false)
          {
            alert("Móvil inválido");
            error = true;
          }
        }
      }

      //En caso de que exista alguno de los errores anteriores, no se va a enviar al servidor
      if(error === true)
      {
        e.preventDefault();
      }
      /*Por otro lado, si no existen errores, vamos a redirigir la petición al servidor con PHP
      para que los datos sean almacenados correctamente*/
      else
      {
        Formulario.action="index.php";
      }
    }
  )
}

//Llamadas de funciones
CambiarConcesion();
ValidarErrores();
