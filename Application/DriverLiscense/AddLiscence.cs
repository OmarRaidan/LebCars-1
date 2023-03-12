using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DriverLiscense
{
    public class AddLiscence
    {
        public class Command : IRequest<Result<DriverLiscence>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<DriverLiscence>>
        {
            private readonly DataContext _context;
            private readonly IDriverLiscenceAccessor _driverLiscence;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IDriverLiscenceAccessor driverLiscence, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _driverLiscence = driverLiscence;
                _context = context;
            }

            public async Task<Result<DriverLiscence>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.DriverLiscences)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            
                if (user == null) return null;

                var liscenceUploadResult = await _driverLiscence.AddLiscence(request.File);
            
                var liscence = new DriverLiscence
                {
                    Url = liscenceUploadResult.Url,
                    Id = liscenceUploadResult.PublicId
                };
                
                user.DriverLiscences.Add(liscence);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<DriverLiscence>.Success(liscence);

                return Result<DriverLiscence>.Failure("Problem adding liscence");
            }
        }
    }
}