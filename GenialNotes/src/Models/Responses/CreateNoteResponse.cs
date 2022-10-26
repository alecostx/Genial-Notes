namespace GenialNotes.src.Models.Responses
{
    public class CreateNoteResponse
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public int IdUsuario { get; set; }
    }
}
