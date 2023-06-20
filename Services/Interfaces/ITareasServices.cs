using proyectoreact.Models;

namespace proyectoreact.Services.Interfaces
{
    public interface ITareasServices
    {
        List<Tarea> GetTareas();
        Task SetTarea(Tarea request);
        Task<Tarea> GetTareasById(int id);
        Task RemoveTarea(Tarea request);
    }
}
