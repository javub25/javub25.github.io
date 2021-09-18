<html>
  <head>
      <title>Vehiculos comerciales</title>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Urbanist:wght@600&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="normalize.css"/>
      <link rel="stylesheet" href="estilos.css"/>
  </head>
  <body>
      <header>
          <div>
            <img class="header__logo" src="logo-vw-comerciales.jpg" alt="Logo VW"/>
          </div>

          <div>
            <img class="header__banner" src="header_multivan.jpg" alt="Coche Volkswagen"/>
          </div>
      </header>

      <section>
        <!--Contenedor que tendrá toda la información de la página del servidor-->
        <div class="resultadosBD">
          <?php
            //Función que tendrá la misión de conectarse a la BD
            function conexionDB()
            {
              //Donde se encuentra la BD
              $dbHost = "localhost";
              //El nombre del usuario y su contraseña
              $dbUser = "root";
              $dbPassw = "@mART418";
              //La BD donde se encuentra la tabla Clientes
              $db = "Volkswagen";

              /*La función mysqli_connect nos devolverá un booleano
              true en caso de que la conexión se establezca
              false en caso de que no se haya podido conectar*/
              $Conexion = mysqli_connect($dbHost, $dbUser, $dbPassw, $db);

              return $Conexion;
            }

            //Función que añadirá los datos del formulario en la tabla Clientes

            function anadirDatos($Conexion, $Modelo, $Trato, $Nombre, $primerApellido, $segundoApellido, $Email, $Movil, $Provincia, $Concesion)
            {
              //Vamos a crear la instrucción para insertar los datos en nuestra tabla
              $Insercion = "INSERT INTO Clientes (Modelo, Trato, Nombre, 1erApellido, 2nApellido,Email, Movil, Provincia, Concesion)
              VALUES('$Modelo', '$Trato', '$Nombre', '$primerApellido', '$segundoApellido', '$Email', '$Movil', '$Provincia', '$Concesion')";

              //Verificamos sí los datos se insertaron o no
              $Consulta = mysqli_query($Conexion, $Insercion);

              //Sí el booleano anterior nos devuelve true querrá decir que se insertaron
              if($Consulta == true)
              {
                echo "<h3 class=section__formulario__titulo>Los datos han sido enviados a la base de datos!</h3>";
              }
              //En caso contrario, nos devolverá false
              else
              {
                echo "<h3 class=section__formulario__titulo>Los datos no se han podido enviar a la base de datos</h3>";
              }
            }
            //Llamada funcion
            $Conexion = conexionDB();

            //Se hará cuando se haya conectado a la base de datos
            if($Conexion == true)
            {
              //Cojeremos todos los valores a partir de la clave de html del array $_POST
              $Modelo = $_POST["modeloPrincipal"];
              $Trato= $_POST["Trato"];
              $Nombre = $_POST["Nombre"];
              $primerApellido = $_POST["1erApellido"];
              $segundoApellido = $_POST["2nApellido"];
              $Email = $_POST["Email"];
              $Movil = $_POST["Movil"];
              $Provincia = $_POST["Provincia"];
              $Concesion = $_POST["Concesion"];

              //Añadimos los datos en la tabla Clientes
              anadirDatos($Conexion, $Modelo, $Trato, $Nombre, $primerApellido, $segundoApellido, $Email, $Movil, $Provincia, $Concesion);
            }
            //Se hará cuando no haya podido encontrar la base de datos
            else
            {
              echo "<h3 class=section__formulario__titulo>No se ha podido conectarse a la base de datos!</h3>";
            }
            //Cerramos la conexion
            mysqli_close($Conexion);
          ?>
          <!--Boton que regresará a la página inicial de index.html-->
        <a href="index.html"><button id="boton" class="formulario__boton colorInicial">Regresar</button></a>
      </div>
    </section>
    <!--Llamada de script cambiarBoton.js-->
    <script type="text/javascript" src="cambiarBoton.js"></script>
  </body>
</html>
