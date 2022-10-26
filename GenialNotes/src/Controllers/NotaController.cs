using GenialNotes.src.Interfaces;
using GenialNotes.src.Models.Requests;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GenialNotes.src.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotaController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;
        public NotaController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        /// <summary>
        /// Cria uma nota
        /// </summary>
        [HttpPost()]
        public async Task<IActionResult> CreateNote(CreateNoteRequest request)
        {
            var result = await _noteRepository.CreateNote(request);
            return Ok(result);
        }
        /// <summary>
        /// Retorna todas as notas do usuário
        /// </summary>
        /// <paramref name="idUsuario"/>
        [HttpGet("{idUsuario}")]
        public async Task<IActionResult> GetNotaByUser(int idUsuario)
        {
            var result = await _noteRepository.GetNotaByUser(idUsuario);
            return Ok(result);
        }
        /// <summary>
        /// Atualiza a nota pelo id
        /// </summary>
        /// <paramref name="idNota"/>
        /// <paramref name="request"/>
        [HttpPatch("{idNota}")]
        public async Task<IActionResult> PatchNotaById(ApiPatchNotaRequest request, int idNota)
        {
            var result = await _noteRepository.PatchNotaById(request, idNota);
            return Ok(result);
        }
        /// <summary>
        /// Remove a nota pelo id
        /// </summary>
        /// <paramref name="idNota"/>
        [HttpDelete("{idNota}")]
        public async Task<IActionResult> DeleteNotaById(int idNota)
        {
            var result = await _noteRepository.DeleteNotaById(idNota);
            return Ok(result);
        }
    }
}
