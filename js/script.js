/* -------------------------------------------------------------------------------------------------------*/
/* CODERHOUSE CURSO JAVASCRIPT                                                                            */
/* 2DA PRE ENTREGA                                                                                    */
/* GUILLERMO GUARDIA
/*-------------------------------------------------------------------------------------------------------*/

/* En esta pre entrega se intenta simular una lista de notas de alumnos para calcular promedios y hacer algunas busquedas
y demostrar la utilizacion de arrays y objetos. */

//CLASE ALUMNO ----------------------------------------------------------------------------------------------------/////
class alumno {
  //Nuestro objeto alumno tiene 4 atributos (dni, nombre, apellido  y un set de notas representado en un array).
  constructor(dniAlumno, nombreAlumno, apellidoAlumno) {
    this.dni = dniAlumno;
    this.nombre = nombreAlumno;
    this.apellido = apellidoAlumno;
    this.notas = [];
  }

  //Devuelve el promedio de notas de un alumno.
  getPromedio() {
    let promedio = (this.notas[0] + this.notas[1] + this.notas[2]) / 3;
    return promedio.toFixed(1);
  }

  //Devuelve la mejor nota de un alumno.
  getMejorNota() {
    mejorNota = this.notas[0];
    for (let i = 0; i < this.notas.length; i++) {
      if (this.notas[i + 1] > this.notas[i]) mejorNota = this.notas[i + 1];
    }

    return mejorNota;
  }

  //Devuelve un string con los datos del alumno de manera ordenada para que otra funcion  lo muestre por pantalla de manera prolija.
  getDatos() {
    let stringDatosAlumno =
      "DNI: " +
      this.dni +
      " " +
      this.apellido +
      " " +
      this.nombre +
      ".\n" +
      " " +
      "Notas: " +
      this.notas[0] +
      " / " +
      this.notas[1] +
      " / " +
      this.notas[2] +
      "  ===>  Promedio: " +
      this.getPromedio() +
      "\n";
    return stringDatosAlumno;
  }

  ingresarNotas(nota1, nota2, nota3) {
    this.notas[0] = nota1;
    this.notas[1] = nota2;
    this.notas[2] = nota3;
  }
}

//FUNCIONES Y METODOS QUE UTILIZAREMOS. ------------------------------------------------------------------------//

//Esta funcion carga un listado inicial de alumnos al iniciar nuestro programa.
function cargaInicial() {
  //hago una lista inicial de alumnos
  let listaAlumnos = [
    new alumno("31823844", "Guillermo", "Guardia"),
    new alumno("32212456", "Pedro", "Gomez"),
    new alumno("23456789", "Lucas", "Garcia"),
    new alumno("2012365", "Juan", "Perez"),
    new alumno("32654198", "Alejandro", "Gomez"),
  ];

  listaAlumnos.forEach((alumno) =>
    alumno.ingresarNotas(
      numeroAleatorioDistintoCero(),
      numeroAleatorioDistintoCero(),
      numeroAleatorioDistintoCero()
    )
  );
  return listaAlumnos;
}

//Esta funcion se encarga de dibujar en nuestro HTML los datos solicitados.
const mostrarDatos = (listaAlumnos) => {
  //Primero formo la cadena entera para mostrar en la ventana del alert.
  let contenedorDatos = document.getElementById("cont_listado");
  let resultado = "";
  listaAlumnos.map(
    (alumno) => (resultado = resultado + alumno.getDatos() + "<br>")
  );
  contenedorDatos.innerHTML = "<p>" + resultado + "</p>";
};

//Devuelve un numero aleatorio entre 1 y 10.
const numeroAleatorioDistintoCero = () => {
  resultado = Math.round(Math.random() * 10);
  if (resultado == 0) resultado = 1; // SI nos da cero le sumamos uno para no tener problemas de division por cero
  return resultado;
};

//Crea un alumno con los valores pasados por parametros y los agrega al listado pasado por parametro.
//Luego de crear y agregar al alumno llama a la funcion que muestra el listado actualizado en pantalla.
function crearAgregarAlumnoListado(
  dni,
  nombre,
  apellido,
  nota1,
  nota2,
  nota3,
  listaDeAlumnos
) {
  let nuevoAlumno = new alumno(dni, nombre, apellido);
  nuevoAlumno.ingresarNotas(nota1, nota2, nota3);
  console.log("Nuevo: " + nuevoAlumno);
  listaDeAlumnos.push(nuevoAlumno);
  //console.log(listaDeAlumnos)
  alert(
    "Alumno: " + dni + "  " + nombre + "  " + apellido + " agregado con exito."
  );
  mostrarDatos(listaDeAlumnos);
}

//Determina si existe el alumno con el dniAlumno.
function existeAlumno(listaDeAlumno, dniAlumno) {
  let buscado = listaDeAlumno.find((alumno) => alumno.dni == dniAlumno);
  if (buscado != undefined) return true;
  else return false;
}

//Busca y muestra el mejor promedio del listado.
function mejorPromedio(listaAlumnos) {
  //Supongo el mejor promedio es el del primer alumno y de ahi en mas comparo.
  let mayorPromedio = listaAlumnos[0].getPromedio();
  let dniMayorPromedio = listaAlumnos[0].dni;
  let listaMejorespromedios = []; // Son los que tienen el promedio mayor.

  listaAlumnos.map((alumno) => {
    if (alumno.getPromedio() > mayorPromedio)
      mayorPromedio = alumno.getPromedio();
  });

  //Ya tengo el mayor promedio. Ahora recorro el array y muestro los alumnos que tienen ese promedio.

  listaAlumnos.map((alumno) => {
    if (alumno.getPromedio() == mayorPromedio)
      listaMejorespromedios.push(alumno);
  });

  //ya tengo la lista de los mejores promedios. Ahora puedo mostrarlos por pantalla.
  mostrarDatos(listaMejorespromedios);
}

//Se encarga de tomar el ingreso de datos para cargar un nuevo alumno.
function agregarAlumno(listaDeAlumnos) {
  let dniNuevoAlumno,
    nombreNuevoAlumno,
    apellidoNuevoAlumno,
    nota1,
    nota2,
    nota3;
  //Pido datos al usuario y mediante otras funciones compruebo que sean correctos, si lo son continuo el proceso.

  do {
    dniNuevoAlumno = prompt("Ingresar DNI: ");
    console.log(existeAlumno(listaDeAlumnos, dniNuevoAlumno));
    if (
      !dniValido(dniNuevoAlumno) ||
      existeAlumno(listaDeAlumnos, dniNuevoAlumno)
    ) {
      if (!confirm("DNI no valido o alumno ya cargado!! ¿Desea reintentar?")) {
        alert("Proceso de carga finalizado por el usuario !!"); // Si no son validos los datos pido reingresar y de no querer reingresar vuelvo al programa principal.
        return 0; // Este return lo uso para cuando al terminar la ejecucion de programa principal no vuelva a este procedimiento.
      }
    }
  } while (!dniValido(dniNuevoAlumno));

  do {
    nombreNuevoAlumno = prompt("Ingresar nombre: ");
    if (!esPalabra(nombreNuevoAlumno)) {
      if (!confirm("Ingrese un nombre valido!! ¿Desea continuar?")) {
        alert("Proceso de carga finalizado por el usuario !!"); // Si no son validos los datos pido reingresar y de no querer reingresar vuelvo al programa principal.
        return 0; // Este return lo uso para cuando al terminar la ejecucion de programa principal no vuelva a este procedimiento.
      }
    }
  } while (!esPalabra(nombreNuevoAlumno));

  do {
    apellidoNuevoAlumno = prompt("Ingresar apellido: ");
    if (!esPalabra(apellidoNuevoAlumno)) {
      if (!confirm("Ingrese un apellido valido !! ¿Desea continuar?")) {
        alert("Proceso de carga finalizado por el usuario !!"); // Si no son validos los datos pido reingresar y de no querer reingresar vuelvo al programa principal.
        return 0; // Este return lo uso para cuando al terminar la ejecucion de programa principal no vuelva a este procedimiento.
      }
    }
  } while (!esPalabra(apellidoNuevoAlumno));

  do {
    nota1 = prompt("Ingresar nota: ");
    if (!notaValida(nota1)) {
      if (!confirm("Ingrese una nota entre 1 y 10 !! ¿Desea continuar?")) {
        alert("Proceso de carga finalizado por el usuario !!"); // Si no son validos los datos pido reingresar y de no querer reingresar vuelvo al programa principal.
        return 0; // Este return lo uso para cuando al terminar la ejecucion de programa principal no vuelva a este procedimiento.
      }
    }
  } while (!notaValida(nota1));

  do {
    nota2 = prompt("Ingresar nota: ");
    if (!notaValida(nota2)) {
      if (!confirm("Ingrese una nota entre 1 y 10 !! ¿Desea continuar?")) {
        alert("Proceso de carga finalizado por el usuario !!"); // Si no son validos los datos pido reingresar y de no querer reingresar vuelvo al programa principal.
        return 0; // Este return lo uso para cuando al terminar la ejecucion de programa principal no vuelva a este procedimiento.
      }
    }
  } while (!notaValida(nota2));

  do {
    nota3 = prompt("Ingresar nota: ");
    if (!notaValida(nota3)) {
      if (!confirm("Ingrese una nota entre 1 y 10 !! ¿Desea continuar?")) {
        alert("Proceso de carga finalizado por el usuario !!"); // Si no son validos los datos pido reingresar y de no querer reingresar vuelvo al programa principal.
        return 0; // Este return lo uso para cuando al terminar la ejecucion de programa principal no vuelva a este procedimiento.
      }
    }
  } while (!notaValida(nota3));

  //Si el proceso de carga fue exitoso creamos una instancia de alumno y la agregamos al listado de alumnos llamando a la funcion crearAgregarAlumnos.
  console.log(
    "Acaa: " + nombreNuevoAlumno + apellidoNuevoAlumno + nota1 + nota2 + nota3
  );
  console.log("listado: " + listaDeAlumnos);
  crearAgregarAlumnoListado(
    dniNuevoAlumno,
    nombreNuevoAlumno,
    apellidoNuevoAlumno,
    Number(nota1),
    Number(nota2),
    Number(nota3),
    listaDeAlumnos
  );
}

//Determina si se trata de una cadena alfabetica
function esPalabra(string_ingresado) {
  const regex = /^[A-Za-z]*$/;
  const esCadenaAlfabetica = regex.test(string_ingresado);
  return esCadenaAlfabetica;
}

//Determina si una nota es valida, o sea si es un numero entre 1 y 10.
function notaValida(unaNota) {
  if (esNumero(unaNota) && esEntero(unaNota) && unaNota >= 1 && unaNota <= 10)
    return true;
  else return false;
}

//Determina si un dni ingresado es un dni valido.
function dniValido(unDni) {
  if (
    esNumero(unDni) &&
    esEntero(unDni) &&
    Number(unDni) >= 1000000 &&
    Number(unDni) <= 99999999
  )
    return true;
  else return false;
}
//Determina si un numero es entero.
function esEntero(numero) {
  if (numero % 1 === 0) return true;
  else return false;
}

//Determina si una cadena es numerica.
function esNumero(string_ingresado) {
  const regex = /^[0-9,]*$/;
  const esCadenaNumerica = regex.test(string_ingresado);
  return esCadenaNumerica;
}

//Esta funcion devuelve el valor de la opcion del ratio button elegido por el usuario.
let opcion_elegida_usuario = (botones) => {
  seleccionada = "0";
  for (let i = 0; i < botones.length; i++) {
    if (botones[i].checked) seleccionada = botones[i].value;
  }
  return seleccionada;
};
/*Es el programa principal que se ejecuta al elegir una opcion del formulario en pantalla.
Utilice esta funcion como programa principal y solamente llamado desde el form por medio del atributo action
para que la pagina no se vuelva a cargar por cada submit ytener la posibilidad de hacer una carga inicial de un listado sin recurrir a archivos.*/

const programaPrincipal = () => {
  const radio_buttons = document.getElementsByName("opciones");
  opcion = opcion_elegida_usuario(radio_buttons);

  switch (opcion) {
    case "1":
      mostrarDatos(misAlumnos);
      break;

    case "2":
      agregarAlumno(misAlumnos);
      break;

    case "3":
      let buscado = prompt("Ingrese DNI del alumno buscado: ");
      if (dniValido(buscado) && existeAlumno(misAlumnos, buscado)) {
        let alumnoBuscado = misAlumnos.find((alumno) => alumno.dni == buscado);
        alert(alumnoBuscado.getDatos());
      } else alert("Alumno inexistente o formato DNI incorrecto !!");

      break;

    case "4":
      let buscadoParaEliminar = prompt("Ingrese DNI del alumno buscado: ");
      if (
        dniValido(buscadoParaEliminar) &&
        existeAlumno(misAlumnos, buscadoParaEliminar)
      ) {
        let indexParaEliminar = misAlumnos.findIndex(
          (alumno) => alumno.dni == buscadoParaEliminar
        );
        misAlumnos.splice(indexParaEliminar, 1);
        alert(
          "Alumno DNI: " + buscadoParaEliminar + " eliminado exitosamente !"
        );
        mostrarDatos(misAlumnos);
      } else alert("Alumno inexistente o formato DNI incorrecto !!");

      break;

    case "5":
      mejorPromedio(misAlumnos);
      break;

    default:
      alert("OPCION INVALIDA ! Vuelva a intentarlo...");
  }
};

//Cargo los datos iniciales.
var misAlumnos = cargaInicial();
alert("BIENVENIDO AL SISTEMA DE NOTAS DE ALUMNOS");
