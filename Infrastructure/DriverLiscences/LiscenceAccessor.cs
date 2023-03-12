using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using Application.DriverLiscense;
using CloudinaryDotNet.Actions;

namespace Infrastructure.DriverLiscences
{
    public class LiscenceAccessor : IDriverLiscenceAccessor
    {
        private readonly Cloudinary _cloudinary;

        public LiscenceAccessor(IOptions<Infrastructure.Photos.CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
            _cloudinary.Api.Secure = true;
        }

        public async Task<LiscenceUploadResult> AddLiscence(IFormFile file)
        {
            if(file.Length > 0) 
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(800).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                if (uploadResult.Error != null)
                {
                    throw new System.Exception(uploadResult.Error.Message);
                }

                return new LiscenceUploadResult
                {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };
            }

            return null;
        }
        public async Task<string> DeleteLiscence(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            return result.Result == "ok" ? result.Result : null;
        }
    }
    
}