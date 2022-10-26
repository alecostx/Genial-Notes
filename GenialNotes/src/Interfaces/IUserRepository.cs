using GenialNotes.src.Models.Requests;
using GenialNotes.src.Models;
using GenialNotes.src.Models.Responses;

namespace GenialNotes.src.Interfaces
{
    public interface IUserRepository
    {
        Task<Usuario> RegisterUser(RegisterUserRequest request);
        Task<List<Usuario>> GetUsers();
        Task<LoginResponse> LoginValidate(string senha, string email);
    }
}