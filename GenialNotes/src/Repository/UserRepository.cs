using GenialNotes.src.Interfaces;
using GenialNotes.src.Models;
using GenialNotes.src.Models.Requests;
using GenialNotes.src.Models.Responses;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GenialNotes.src.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<Usuario> RegisterUser(RegisterUserRequest request)
        {
            Usuario user = new()
            {
                Email = request.Email,
                Name = request.Nome,
                Password = request.Senha
            };

            _context.Usuarios.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<List<Usuario>> GetUsers()
        {
            var users = await _context.Usuarios.ToListAsync();
            return users;
        }

        public async Task<LoginResponse> LoginValidate(string senha, string email)
        {
            LoginResponse validation = new LoginResponse();
            var users = await GetUsers();
            var user = users.Where(x => x.Email == email && x.Password == senha).FirstOrDefault();

            if (user is not null)
            {
                validation.Id = user.Id;
                validation.Status = "Found";
            }
            else
                validation.Status = "NotFound";

            return validation;
        }

        public Usuario GetUserById(int id)
        {
            var users = _context.Usuarios.Where(x => x.Id == id).FirstOrDefault();
            return users;
        }
    }
}