const Tarea = require("./tarea");


class Tareas {
  _listado = {};


  //metodo del objeto de obtención 'get'
  get listadoArray() {

    //convertir un objeto a un array usando objects.keys -> averiguar +
    const listado = [];

    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });
    return listado;
  }

  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []) {
    tareas.forEach((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    //console.log(this.listadoArray);
    console.log(`\n`);
    this.listadoArray.forEach((tarea, index) => {
      const idx = `${index + 1}`.green;
      const { desc, completadoEn } = tarea;

      console.log(
        `${idx} ${desc} :: ${
          completadoEn ? "compleado".green : "pendiente".red
        }`
      );
    });
  }

  listaPendientesCompletados(value) {
    console.log(`\n`);
    let count = 0;
    this.listadoArray.map(({ desc, completadoEn }, index) => {
      if (value) {
        if (completadoEn) {
          count += 1;

          console.log(`${count.toString().green}. ${desc} :: ${completadoEn.green}`);
        }
        /*}else{
        const idx = `${index+1}`.green
        console.log(`${idx} ${desc} :: ${"completado".red}`);
      }*/
      } else {
        if (!completadoEn) {
          count += 1;

          console.log(
            `${count.toString().green}. ${desc} :: ${"pendiente".red}`
          );
        }
      }
    });
  }

  borrarTarea(id = "") {
    console.log('\n');
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  completarYPendiente(ids =[]){  
    
    ids.forEach(id => {
      const tarea = this._listado[id];
      if(!id.completadoEn){
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArray.forEach(tarea => {
      if( !ids.includes(tarea.id)){
        this._listado[tarea.id].completadoEn = null; 
      }
    });
  }
}
module.exports = Tareas;
