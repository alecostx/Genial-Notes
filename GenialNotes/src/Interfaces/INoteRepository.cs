using GenialNotes.Migrations;
using GenialNotes.src.Models;
using GenialNotes.src.Models.Requests;
using GenialNotes.src.Models.Responses;
using Nota = GenialNotes.src.Models.Nota;

namespace GenialNotes.src.Interfaces
{
    public interface INoteRepository
    {
        Task<Nota> CreateNote(CreateNoteRequest request);
        Task<List<Nota>> GetNotaByUser(int idUsuario);
        Task<List<Nota>> GetAllNotas();
        Task<Nota> PatchNotaById(ApiPatchNotaRequest request, int idNota);
        Task<Nota> DeleteNotaById(int idNota);
    }
}
