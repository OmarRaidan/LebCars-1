/*using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.DriverLiscense
{
    public class ListLiscence
    {
        public class Query : IRequest<Result<List<LiscenceUploadResult>>>
        {
            public string liscenceUrl { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<LiscenceUploadResult>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<List<LiscenceUploadResult>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.DriverLiscences;
            }
        }

    }
}*/