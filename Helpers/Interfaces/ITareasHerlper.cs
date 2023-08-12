using proyectoreact.Models;

namespace proyectoreact.Helpers.Interfaces
{
    public interface ITareasHerlper
    {
        List<Tarea> GetTareas();
        Task SetTarea(Tarea tarea);
        Task<Tarea> GetTareasById(int id);
        Task RemoveTarea(Tarea tarea);
        Task UpdateTarea(Tarea request);
    }
}
