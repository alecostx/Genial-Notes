using GenialNotes.src.Models.Requests;
using GenialNotes.src.Models;
using GenialNotes.src.Interfaces;
using GenialNotes.src.Models.Responses;

namespace GenialNotes.src.Repository
{
    public class NotaRepository : INoteRepository
    {
        private readonly DataContext _context;
        public NotaRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<Nota> CreateNote(CreateNoteRequest request)
        {
            Nota nota = new Nota()
            {
                Descricao = request.Descricao,
                IdUsuario = request.IdUsuario,
                Titulo = request.Titulo,
            };
             await _context.Notas.AddAsync(nota);
            await _context.SaveChangesAsync();
            return nota;
        }
        public async Task<List<Nota>> GetAllNotas()
        {
            var notas = await _context.Notas.ToListAsync();
            return notas;
        }

        public async Task<List<Nota>> GetNotaByUser(int idUsuario)
        {
            var notas = await GetAllNotas();
            
            return notas.Where(x => x.IdUsuario == idUsuario)
                .ToList();
        }
        public async Task<Nota> GetNotaById(int idNota)
        {
            var notas = await GetAllNotas();

            return notas.FirstOrDefault(x => x.Id == idNota);
        }

        public async Task<Nota> PatchNotaById(ApiPatchNotaRequest request, int idNota)
        {
            var oldNota = await GetNotaById(idNota);

            oldNota.Titulo = request.Titulo ?? oldNota.Titulo;
            oldNota.Descricao = request.Descricao ?? oldNota.Descricao;

             _context.Notas.Update(oldNota);
            await _context.SaveChangesAsync();
            return oldNota;
        }

        public async Task<Nota> DeleteNotaById(int idNota)
        {
            var nota = await GetNotaById(idNota);
            _context.Notas.Remove(nota);
            await _context.SaveChangesAsync();
            return nota;
        }
    }
}
