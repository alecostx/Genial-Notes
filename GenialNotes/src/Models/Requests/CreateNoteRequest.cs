namespace GenialNotes.src.Models.Requests
{
    public class CreateNoteRequest
    {
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public int IdUsuario { get; set; }
    }
}
