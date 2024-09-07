import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import $ from 'jquery';

const Datatables = (aplicarDT) => {
 
  if ($.fn.DataTable.isDataTable(aplicarDT.current)) {
    $(aplicarDT.current).DataTable().destroy();
  }

  $(aplicarDT.current).DataTable({
    language: {
      processing: "Procesando...",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ registros",
      info: "Mostrando de _START_ a _END_ de _TOTAL_ registros",
      infoEmpty: "Mostrando de 0 a 0 de 0 registros",
      infoFiltered: "(filtrado de _MAX_ registros totales)",
      loadingRecords: "Cargando...",
      zeroRecords: "No se encontraron registros coincidentes",
      emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último"
      },
      aria: {
        sortAscending: ": activar para ordenar la columna de manera ascendente",
        sortDescending: ": activar para ordenar la columna de manera descendente"
      }
    }
  });
};

export default Datatables;
