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

namespace Application.CriminalRecord
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly ICriminalRecordAccessor _criminalRecord;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, ICriminalRecordAccessor criminalRecord, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _criminalRecord = criminalRecord;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.CriminalRecords)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var photo = user.CriminalRecords.FirstOrDefault(x => x.Id == request.Id);

                if (photo == null) return null;

                var result = await _criminalRecord.DeleteLiscence(photo.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary");

                user.CriminalRecords.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Problem deleteing photo from API");
            }
        }
    }
}
