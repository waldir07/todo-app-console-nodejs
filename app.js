require("colors");
const { guardarDb, leerDb } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  listadocheckList,
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

//console.clear();

const main = async () => {
  let opt;
  const tareas = new Tareas();

  const tareasDb = leerDb();

  if (tareasDb) {
    //console.log(tareasDb);
    tareas.cargarTareasFromArray(tareasDb);
  }

  do {
    //const tarea = new Tarea('holaa');
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        console.log(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listaPendientesCompletados(true);
        break;

      case "4":
        tareas.listaPendientesCompletados(false);
        break;
      case "5":
        const ids = await listadocheckList(tareas.listadoArray);
        tareas.completarYPendiente(ids);
        console.log(ids);
        break;

      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArray);
        if (id !== 0) {
          const { respuesta } = await confirmar("¿Estás seguro?");
          if (respuesta) {
            tareas.borrarTarea(id);
            console.log("Tarea eliminada correctamente ");
          }
        }

        break;
    }

    guardarDb(tareas.listadoArray);
    //tareas._listado[tarea.id] = tarea;
    //console.log(tareas);
    await pausa();
  } while (opt !== "0");
};

main();
