using System.Threading.Tasks;
using Application.DriverLiscense;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IDriverLiscenceAccessor
    {
        Task<LiscenceUploadResult> AddLiscence(IFormFile file);
        Task<string> DeleteLiscence(string publicId);
    }
}