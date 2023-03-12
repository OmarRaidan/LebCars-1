using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.CriminalRecord
{
    public class Add
    {
        public class Command : IRequest<Result<Domain.CriminalRecord>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Domain.CriminalRecord>>
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

            public async Task<Result<Domain.CriminalRecord>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(p => p.CriminalRecords)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
            
                if (user == null) return null;

                var recordUploadResult = await _criminalRecord.AddLiscence(request.File);
            
                var record = new Domain.CriminalRecord
                {
                    Url = recordUploadResult.Url,
                    Id = recordUploadResult.PublicId
                };
                
                user.CriminalRecords.Add(record);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<Domain.CriminalRecord>.Success(record);

                return Result<Domain.CriminalRecord>.Failure("Problem adding liscence");
            }
        }
    }
}