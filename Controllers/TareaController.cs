using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using proyectoreact.Models;

namespace proyectoreact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly DbpruebasContext _dbContext;

        public TareaController(DbpruebasContext context)
        {
            _dbContext = context;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            var lista = _dbContext.Tareas.OrderByDescending(x => x.IdTarea).ThenBy(x => x.FechaRegistro).ToList();

            return StatusCode(StatusCodes.Status200OK, lista);
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Tarea request)
        {
            await _dbContext.Tareas.AddAsync(request);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }

        [HttpDelete]
        [Route("Cerrar/{id:int}")]
        public async Task<IActionResult> Cerrar(int id)
        {
            Tarea tarea = _dbContext.Tareas.Find(id);

            _dbContext.Tareas.Remove(tarea);
            await _dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, "ok");
        }
    }
}
