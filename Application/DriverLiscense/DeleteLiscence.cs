using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.DriverLiscense
{
    public class DeleteLiscence
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
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

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.DriverLiscences)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.DriverLiscences.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                var result = await _driverLiscence.DeleteLiscence(photo.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary");

                user.DriverLiscences.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleteing photo from API");
            }
        }
    }
}
