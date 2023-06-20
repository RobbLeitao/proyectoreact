using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using proyectoreact.Helpers.Interfaces;
using proyectoreact.Models;

namespace proyectoreact.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly ITareasHerlper _tareasHelper;

        public TareaController(ITareasHerlper tareasHelper)
        {
            _tareasHelper = tareasHelper;
        }

        [HttpGet]
        [Route("Lista")]
        public async Task<IActionResult> Lista()
        {
            try
            {
                var lista = _tareasHelper.GetTareas();

                if(lista == null || lista.Count < 1)
                {
                    return NotFound();
                }

                return StatusCode(StatusCodes.Status200OK, lista);
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] Tarea request)
        {
            try
            {
                await _tareasHelper.SetTarea(request);

                return StatusCode(StatusCodes.Status201Created, "Tarea creada");
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }

        [HttpDelete]
        [Route("Cerrar/{id:int}")]
        public async Task<IActionResult> Cerrar(int id)
        {
            try
            {
                var tarea = await _tareasHelper.GetTareasById(id);

                await _tareasHelper.RemoveTarea(tarea);

                return StatusCode(StatusCodes.Status200OK, "Se elimino la tarea");
            }
            catch(Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }
    }
}
