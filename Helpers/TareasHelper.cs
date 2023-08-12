using proyectoreact.Helpers.Interfaces;
using proyectoreact.Models;
using proyectoreact.Services.Interfaces;

namespace proyectoreact.Helpers
{
    public class TareasHelper : ITareasHerlper
    {
        private readonly ITareasServices _tareasServices;
        public TareasHelper(ITareasServices tareasServices)
        {
            _tareasServices = tareasServices;
        }

        /// <summary>
        /// Todo todas las tareas del service
        /// </summary>
        /// <returns></returns>
        public List<Tarea> GetTareas()
        {
            return _tareasServices.GetTareas();
        }

        /// <summary>
        /// Tomo una tarea por ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public Task<Tarea> GetTareasById(int id)
        {
            return _tareasServices.GetTareasById(id);
        }

        /// <summary>
        /// Elimino una tarea
        /// </summary>
        /// <param name="tarea"></param>
        /// <returns></returns>
        public async Task RemoveTarea(Tarea tarea)
        {
            await _tareasServices.RemoveTarea(tarea);
        }

        /// <summary>
        /// Agrego una tarea
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task SetTarea(Tarea request)
        {
            await _tareasServices.SetTarea(request);
        }

        /// <summary>
        /// Edito una tarea existente
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task UpdateTarea(Tarea request)
        {
            await _tareasServices.UpdateTarea(request);
        }
    }
}
