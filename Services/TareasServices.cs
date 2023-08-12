using proyectoreact.Models;
using proyectoreact.Services.Interfaces;
using System.Threading;

namespace proyectoreact.Services
{
    public class TareasServices : ITareasServices
    {
        private readonly DbpruebasContext _dbContext;
        public TareasServices(DbpruebasContext context)
        {
            _dbContext = context;
        }

        /// <summary>
        /// Tomo todas las tareas de la base de datos
        /// </summary>
        /// <returns></returns>
        public List<Tarea> GetTareas()
        {
            var lista = _dbContext.Tareas.OrderByDescending(x => x.IdTarea).ThenBy(x => x.FechaRegistro).ToList();

            return lista;
        }

        /// <summary>
        /// Tomo una tarea por ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<Tarea> GetTareasById(int id)
        {
            Tarea tarea = await _dbContext.Tareas.FindAsync(id);

            if (tarea == null)
            {
                throw new ArgumentException("Tarea no encontrada!");
            }

            return tarea;
        }

        /// <summary>
        /// Elimino una tarea
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task RemoveTarea(Tarea tarea)
        {
            _dbContext.Tareas.Remove(tarea);
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Agrego una tarea nueva
        /// </summary>
        /// <param name="request"></param>
        public async Task SetTarea(Tarea request)
        {
            await _dbContext.Tareas.AddAsync(request);
            await _dbContext.SaveChangesAsync();
        }

        /// <summary>
        /// Edito una tarea existente
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        public async Task UpdateTarea(Tarea request)
        {
            request.FechaRegistro = DateTime.Now;

            _dbContext.Tareas.Update(request);
            await _dbContext.SaveChangesAsync();
        }
    }
}
