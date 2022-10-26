using GenialNotes.src.Models;
using Microsoft.EntityFrameworkCore;

namespace GenialNotes.src.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Nota> Notas { get; set; }
    }
}
