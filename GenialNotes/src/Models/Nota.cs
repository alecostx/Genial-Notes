namespace GenialNotes.src.Models
{
    public class Nota
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public int IdUsuario { get; set; }
    }
}
