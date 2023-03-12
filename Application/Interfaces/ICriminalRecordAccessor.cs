using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.CriminalRecord;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface ICriminalRecordAccessor
    {
        Task<RecordUploadResult> AddLiscence(IFormFile file);
        Task<string> DeleteLiscence(string publicId);
    }
}